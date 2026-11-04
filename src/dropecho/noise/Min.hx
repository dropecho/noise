package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Outputs the smaller of two source modules' values at each point. */
@:build(dropecho.macros.Constructor.fromArgs())
class Min implements IGridModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 */
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
		return FastMath.min(a, b);
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		var other = Batch.bothGrid(input, input2, out, xs, width, ys, height);
		for (k in 0...width * height) {
			out[k] = combine(out[k], other[k]);
		}
	}
}
