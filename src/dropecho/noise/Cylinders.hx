package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Outputs concentric cylinder cross-section rings aligned along the x-axis. Produces parallel band patterns. */
@:build(dropecho.macros.Constructor.fromArgs())
class Cylinders implements IGridModule2D {
	public function new(frequency:F32 = 1);

	public function value(x:F32, y:F32):F32 {
		var intX = FastMath.floor(x * frequency);
		var cx = (x * frequency) - (intX + 0.5);
		return FastMath.abs(Math.cos(cx * Math.PI * 2));
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
