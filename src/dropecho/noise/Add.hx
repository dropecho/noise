package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Outputs the sum of two source modules' values. */
@:build(dropecho.macros.Constructor.fromArgs())
class Add implements IBatchModule2D {
	public function new(input:IModule2D, input2:IModule2D);

	public function value(x:F32, y:F32):F32 {
		return combine(input.value(x, y), input2.value(x, y));
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		var other = Batch.both(input, input2, out, xs, ys, count);
		for (i in 0...count) {
			out[i] = combine(out[i], other[i]);
		}
	}

	private inline function combine(a:F32, b:F32):F32 {
		return a + b;
	}
}
