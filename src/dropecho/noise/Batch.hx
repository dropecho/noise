package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/** Samples many points of any module at once, using `IBatchModule2D.values` when the module has it. */
class Batch {
	// Rows per band in Batch.grid. Measured on a 512-wide grid: 8-128 all beat whole-grid
	// calls for combiners (whose scratch then fits in cache); 32 was best overall on JS.
	static inline final BAND_ROWS = 32;

	/**
	 * Samples `count` points of a module.
	 * @param module The module to sample.
	 * @param out Receives `module.value(xs[i], ys[i])` at index i.
	 * @param xs The x coordinate of each point.
	 * @param ys The y coordinate of each point.
	 * @param count How many points to sample, from index 0.
	 */
	public static function values(module:IModule2D, out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		var batch = Std.downcast(module, IBatchModule2D);
		if (batch != null) {
			batch.values(out, xs, ys, count);
			return;
		}
		for (i in 0...count) {
			out[i] = module.value(xs[i], ys[i]);
		}
	}

	/**
	 * Samples an evenly spaced width x height grid.
	 * @param module The module to sample.
	 * @param out Receives the value at column i, row j at index `j * width + i`.
	 * @param x The x coordinate of the first column.
	 * @param y The y coordinate of the first row.
	 * @param step The distance between neighbouring points.
	 * @param width The number of columns.
	 * @param height The number of rows.
	 */
	public static function grid(module:IModule2D, out:Vector<F32>, x:F32, y:F32, step:F32, width:Int, height:Int):Void {
		var xs = new Vector<F32>(width);
		var ys = new Vector<F32>(height);
		for (i in 0...width) {
			xs[i] = x + i * step;
		}
		for (j in 0...height) {
			ys[j] = y + j * step;
		}
		gridInBands(module, out, xs, width, ys, height);
	}

	/**
	 * gridValues in bands of BAND_ROWS rows, so each module's scratch buffers stay
	 * small enough to sit in cache while column work is still shared across the band.
	 */
	public static function gridInBands(module:IModule2D, out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		if (height <= BAND_ROWS) {
			gridValues(module, out, xs, width, ys, height);
			return;
		}
		var bandYs = new Vector<F32>(BAND_ROWS);
		var bandOut = new Vector<F32>(width * BAND_ROWS);
		var j = 0;
		while (j < height) {
			var rows = height - j < BAND_ROWS ? height - j : BAND_ROWS;
			for (r in 0...rows) {
				bandYs[r] = ys[j + r];
			}
			gridValues(module, bandOut, xs, width, bandYs, rows);
			Vector.blit(bandOut, 0, out, j * width, width * rows);
			j += rows;
		}
	}


	/**
	 * Samples every combination of the given columns and rows, using
	 * `IGridModule2D.grid` when the module has it and one batch per row otherwise.
	 * @param out Receives `value(xs[i], ys[j])` at index `j * width + i`.
	 * @param xs The x coordinate of each column.
	 * @param width The number of columns.
	 * @param ys The y coordinate of each row.
	 * @param height The number of rows.
	 */
	public static function gridValues(module:IModule2D, out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		var gridModule = Std.downcast(module, IGridModule2D);
		if (gridModule != null) {
			gridModule.grid(out, xs, width, ys, height);
		} else {
			gridByRows(module, out, xs, width, ys, height);
		}
	}

	/**
	 * gridValues one row at a time through `values`. Needs only one row of scratch.
	 */
	public static function gridByRows(module:IModule2D, out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		var rowYs = new Vector<F32>(width);
		var row = new Vector<F32>(width);
		for (j in 0...height) {
			for (i in 0...width) {
				rowYs[i] = ys[j];
			}
			values(module, row, xs, rowYs, width);
			Vector.blit(row, 0, out, j * width, width);
		}
	}

	/**
	 * gridValues for a combiner's two inputs.
	 * @return input2's values, in a new vector so threads never share it.
	 */
	@:allow(dropecho.noise)
	static function bothGrid(input:IModule2D, input2:IModule2D, out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Vector<F32> {
		var other = new Vector<F32>(width * height);
		gridValues(input, out, xs, width, ys, height);
		gridValues(input2, other, xs, width, ys, height);
		return other;
	}

	/**
	 * Samples a combiner's two inputs at the same points.
	 * @param input Its first input; fills `out`.
	 * @param input2 Its second input.
	 * @return input2's values, in a new vector so threads never share it.
	 */
	@:allow(dropecho.noise)
	static function both(input:IModule2D, input2:IModule2D, out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Vector<F32> {
		var other = new Vector<F32>(count);
		values(input, out, xs, ys, count);
		values(input2, other, xs, ys, count);
		return other;
	}

	/**
	 * Samples a module at only some of the points: out[i] = module.value(xs[i], ys[i])
	 * for each i in `indices`. Other entries of `out` are left alone.
	 * @param indices The points to sample, by index.
	 * @param n How many entries of `indices` to use.
	 */
	@:allow(dropecho.noise)
	static function subset(module:IModule2D, out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, indices:Vector<Int>, n:Int):Void {
		if (n == 0) return;
		var subXs = new Vector<F32>(n);
		var subYs = new Vector<F32>(n);
		var subOut = new Vector<F32>(n);
		for (k in 0...n) {
			subXs[k] = xs[indices[k]];
			subYs[k] = ys[indices[k]];
		}
		values(module, subOut, subXs, subYs, n);
		for (k in 0...n) {
			out[indices[k]] = subOut[k];
		}
	}

	/**
	 * Mixes two modules by a weight per point, as Blend and Select do one point at a time:
	 * `from` where weight <= 0, `to` where weight >= 1, and lerp(from, to, weight) between.
	 * Each module is only sampled at the points that use it.
	 * @param weights The weight of `to` at each point.
	 */
	@:allow(dropecho.noise)
	static function lerpByWeight(from:IModule2D, to:IModule2D, weights:Vector<F32>, out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>,
			count:Int):Void {
		var uses = pointsUsing(weights, count);
		var fromValues = new Vector<F32>(count);
		var toValues = new Vector<F32>(count);
		subset(from, fromValues, xs, ys, uses.from, uses.nFrom);
		subset(to, toValues, xs, ys, uses.to, uses.nTo);
		mixByWeight(out, weights, fromValues, toValues, count);
	}

	/**
	 * lerpByWeight over a grid. An input every point uses is sampled as a grid;
	 * one only some points use is sampled at just those points.
	 * @param weights The weight of `to` at each grid point, row by row.
	 */
	@:allow(dropecho.noise)
	static function lerpByWeightGrid(from:IModule2D, to:IModule2D, weights:Vector<F32>, out:Vector<F32>, xs:Vector<F32>, width:Int,
			ys:Vector<F32>, height:Int):Void {
		var count = width * height;
		var uses = pointsUsing(weights, count);
		var fromValues = new Vector<F32>(count);
		var toValues = new Vector<F32>(count);
		gridSubset(from, fromValues, xs, width, ys, height, uses.from, uses.nFrom);
		gridSubset(to, toValues, xs, width, ys, height, uses.to, uses.nTo);
		mixByWeight(out, weights, fromValues, toValues, count);
	}

	// Which points use each side of a weighted mix, matching value()'s branches.
	static function pointsUsing(weights:Vector<F32>, count:Int):{from:Vector<Int>, nFrom:Int, to:Vector<Int>, nTo:Int} {
		var from = new Vector<Int>(count);
		var to = new Vector<Int>(count);
		var nFrom = 0;
		var nTo = 0;
		for (i in 0...count) {
			// Written as negations so a NaN weight uses both, like the lerp branch in value().
			if (!(weights[i] >= 1)) from[nFrom++] = i;
			if (!(weights[i] <= 0)) to[nTo++] = i;
		}
		return {from: from, nFrom: nFrom, to: to, nTo: nTo};
	}

	static function mixByWeight(out:Vector<F32>, weights:Vector<F32>, fromValues:Vector<F32>, toValues:Vector<F32>, count:Int):Void {
		for (i in 0...count) {
			var w = weights[i];
			out[i] = w <= 0 ? fromValues[i] : (w >= 1 ? toValues[i] : MathUtils.lerp(fromValues[i], toValues[i], w));
		}
	}

	/**
	 * subset for grid points, where index k is column k % width of row k / width.
	 * Samples the whole grid when every point is listed.
	 */
	static function gridSubset(module:IModule2D, out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int,
			indices:Vector<Int>, n:Int):Void {
		if (n == 0) return;
		if (n == width * height) {
			gridValues(module, out, xs, width, ys, height);
			return;
		}
		var subXs = new Vector<F32>(n);
		var subYs = new Vector<F32>(n);
		var subOut = new Vector<F32>(n);
		for (k in 0...n) {
			var index = indices[k];
			subXs[k] = xs[index % width];
			subYs[k] = ys[Std.int(index / width)];
		}
		values(module, subOut, subXs, subYs, n);
		for (k in 0...n) {
			out[indices[k]] = subOut[k];
		}
	}

	/**
	 * Whether every point lies on one horizontal row, so per-row work can be shared.
	 * @param ys The y coordinate of each point.
	 * @param count How many points to check.
	 * @return True when all `count` y coordinates are equal.
	 */
	public static function isRow(ys:Vector<F32>, count:Int):Bool {
		for (i in 1...count) {
			if (ys[i] != ys[0]) return false;
		}
		return true;
	}
}
