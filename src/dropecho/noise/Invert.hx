package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Negates the source module's output (multiplies by -1). Peaks become valleys and vice versa. */
@:build(dropecho.macros.Constructor.fromArgs())
class Invert implements IBatchModule2D {
	public function new(input:IModule2D);

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
		return -v;
	}
}
