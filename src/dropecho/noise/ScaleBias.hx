package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Applies a linear transform (output * scale + bias) to the source module's output. Use to remap value ranges or adjust contrast. */
@:build(dropecho.macros.Constructor.fromArgs())
class ScaleBias implements IBatchModule2D {
	public function new(input:IModule2D, scale:F32 = 1, bias:F32 = 0);

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
		return v * scale + bias;
	}
}
