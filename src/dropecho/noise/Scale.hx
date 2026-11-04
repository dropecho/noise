package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Scales input coordinates by a scalar before sampling the source module. Equivalent to multiplying the source module's frequency. */
class Scale implements IGridModule2D {
	var _input:IModule2D;
	var _scalar:F32;

	public function new(input:IModule2D, s:F32) {
		_input = input;
		_scalar = s;
	}

	public function value(x:F32, y:F32):F32 {
		return _input.value(x * _scalar, y * _scalar);
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		var scaledX = new Vector<F32>(count);
		var scaledY = new Vector<F32>(count);
		for (i in 0...count) {
			scaledX[i] = xs[i] * _scalar;
			scaledY[i] = ys[i] * _scalar;
		}
		Batch.values(_input, out, scaledX, scaledY, count);
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		// A scaled grid is still a grid: each column and row scales on its own.
		var scaledX = new Vector<F32>(width);
		var scaledY = new Vector<F32>(height);
		for (i in 0...width) {
			scaledX[i] = xs[i] * _scalar;
		}
		for (j in 0...height) {
			scaledY[j] = ys[j] * _scalar;
		}
		Batch.gridValues(_input, out, scaledX, width, scaledY, height);
	}
}
