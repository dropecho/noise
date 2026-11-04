package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/** Remaps the source module's output from [inputMin, inputMax] to [outputMin, outputMax] via linear interpolation. Useful for converting noise ranges (e.g. [-1,1] to [0,1]). */
@:build(dropecho.macros.Constructor.fromArgs())
class Normalize implements IGridModule2D {
	public function new(input:IModule2D, inputMin:F32 = -1, inputMax:F32 = 1, outputMin:F32 = -1, outputMax:F32 = 1);

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
		var t = MathUtils.inverseLerp(v, inputMin, inputMax);
		return MathUtils.lerp(outputMin, outputMax, t);
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		Batch.gridValues(input, out, xs, width, ys, height);
		for (k in 0...width * height) {
			out[k] = apply(out[k]);
		}
	}
}
