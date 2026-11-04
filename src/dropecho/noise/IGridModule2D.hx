package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/**
 * A module that can sample a whole grid in one call, sharing work across
 * columns and rows. Use `Batch.grid` or `Batch.gridValues` rather than calling
 * `grid` directly, so modules without it still work.
 */
interface IGridModule2D extends IBatchModule2D {
	/**
	 * Samples every combination of columns and rows. Must give exactly what
	 * `value` would for each point.
	 * @param out Receives `value(xs[i], ys[j])` at index `j * width + i`.
	 * @param xs The x coordinate of each column.
	 * @param width The number of columns.
	 * @param ys The y coordinate of each row.
	 * @param height The number of rows.
	 */
	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void;
}
