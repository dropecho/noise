package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/**
 * Applies an exponential curve to the source module's output via pow((v+1)/2, exp)*2-1.
 * exp > 1 sharpens peaks and pushes midtones toward -1; exp < 1 flattens and pushes toward +1.
 */
@:build(dropecho.macros.Constructor.fromArgs())
class Exponent implements IBatchModule2D {
	public function new(input:IModule2D, exp:F32 = 1);

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
		return FastMath.pow((v + 1.0) / 2.0, exp) * 2.0 - 1.0;
	}
}
