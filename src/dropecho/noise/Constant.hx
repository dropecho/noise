package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Always outputs the same constant value regardless of coordinates. Useful as a fixed input to combiners and selectors. */
@:build(dropecho.macros.Constructor.fromArgs())
class Constant implements IGridModule2D {
	/**
	 * @param constant The constant value to return.
	 */
	public function new(constant:F32);

	public function value(x:F32, y:F32):F32 {
		return constant;
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		for (i in 0...count) {
			out[i] = constant;
		}
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		for (k in 0...width * height) {
			out[k] = constant;
		}
	}
}
