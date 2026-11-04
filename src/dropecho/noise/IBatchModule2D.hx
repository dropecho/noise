package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/**
 * A module that can sample many points in one call. Use `Batch.values` rather
 * than calling `values` directly, so modules without it still work.
 */
interface IBatchModule2D extends IModule2D {
	/**
	 * Samples `count` points. Must give exactly what `value` would for each point.
	 * @param out Receives `value(xs[i], ys[i])` at index i.
	 * @param xs The x coordinate of each point.
	 * @param ys The y coordinate of each point.
	 * @param count How many points to sample, from index 0.
	 */
	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void;
}
