package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

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
