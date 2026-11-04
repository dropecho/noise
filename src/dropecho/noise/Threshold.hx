package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Returns 1.0 if the source module's output meets or exceeds the cutoff, else -1.0. Useful for generating binary land/sea or solid/empty masks. */
@:build(dropecho.macros.Constructor.fromArgs())
class Threshold implements IGridModule2D {
	public function new(input:IModule2D, cutoff:F32 = 0);

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
		return v >= cutoff ? 1.0 : -1.0;
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		Batch.gridValues(input, out, xs, width, ys, height);
		for (k in 0...width * height) {
			out[k] = apply(out[k]);
		}
	}
}
