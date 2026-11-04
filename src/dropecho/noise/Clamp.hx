package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Clamps the source module's output to a [min, max] range. Values outside the range are pinned to the nearest bound. */
@:build(dropecho.macros.Constructor.fromArgs())
class Clamp implements IBatchModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 * @param min The minimum value to clamp to. 
	 * @param max The maximum value to clamp to. 
	 */
	public function new(input:IModule2D, min:F32 = -1, max:F32 = 1);

	public function value(x:F32, y:F32):F32 {
		return apply(input.value(x, y));
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		Batch.values(input, out, xs, ys, count);
		for (i in 0...count) {
			out[i] = apply(out[i]);
		}
	}

	private inline function apply(v:F32):F32 {
		return FastMath.min(FastMath.max(v, min), max);
	}
}
