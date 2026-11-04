package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Checkerboard pattern generator. Returns 1 and -1 in alternating grid squares. */
@:build(dropecho.macros.Constructor.fromArgs())
class CheckerBoard implements IGridModule2D {
	public function new(frequency:F32 = 1);

	public function value(x:F32, y:F32):F32 {
		var intX = FastMath.floor(x * frequency);
		var intY = FastMath.floor(y * frequency);

		return ((intX + intY) & 1) == 0 ? 1 : -1;
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		// A direct call per point, so the JIT can inline it; no shared per-row work here.
		for (i in 0...count) {
			out[i] = value(xs[i], ys[i]);
		}
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		for (j in 0...height) {
			var y = ys[j];
			var base = j * width;
			for (i in 0...width) {
				out[base + i] = value(xs[i], y);
			}
		}
	}
}
