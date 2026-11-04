package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/** Samples many points of any module at once, using `IBatchModule2D.values` when the module has it. */
class Batch {
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
	 * Samples a width x height grid of points, one row per batch.
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
		var ys = new Vector<F32>(width);
		var row = new Vector<F32>(width);
		for (i in 0...width) {
			xs[i] = x + i * step;
		}
		for (j in 0...height) {
			var rowY:F32 = y + j * step;
			for (i in 0...width) {
				ys[i] = rowY;
			}
			values(module, row, xs, ys, width);
			Vector.blit(row, 0, out, j * width, width);
		}
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
		var usesFrom = new Vector<Int>(count);
		var usesTo = new Vector<Int>(count);
		var nFrom = 0;
		var nTo = 0;
		for (i in 0...count) {
			// Written as negations so a NaN weight uses both, like the lerp branch in value().
			if (!(weights[i] >= 1)) usesFrom[nFrom++] = i;
			if (!(weights[i] <= 0)) usesTo[nTo++] = i;
		}
		var fromValues = new Vector<F32>(count);
		var toValues = new Vector<F32>(count);
		subset(from, fromValues, xs, ys, usesFrom, nFrom);
		subset(to, toValues, xs, ys, usesTo, nTo);
		for (i in 0...count) {
			var w = weights[i];
			out[i] = w <= 0 ? fromValues[i] : (w >= 1 ? toValues[i] : MathUtils.lerp(fromValues[i], toValues[i], w));
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
