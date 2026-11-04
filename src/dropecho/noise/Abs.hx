package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Outputs the absolute value of the source module's output. Maps [-1, 0] to [0, 1], so all output is non-negative. */
@:build(dropecho.macros.Constructor.fromArgs())
class Abs implements IGridModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 */
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
		return FastMath.abs(v);
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		Batch.gridValues(input, out, xs, width, ys, height);
		for (k in 0...width * height) {
			out[k] = apply(out[k]);
		}
	}
}
