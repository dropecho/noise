package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Offsets input coordinates by (dx, dy) before sampling the source module. Useful for shifting the origin of any noise pattern. */
@:build(dropecho.macros.Constructor.fromArgs())
class TranslatePoint implements IBatchModule2D {
	public function new(input:IModule2D, dx:F32 = 0, dy:F32 = 0);

	public function value(x:F32, y:F32):F32 {
		return input.value(x + dx, y + dy);
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		// The same x + dx per point as value(), so results match exactly.
		var movedX = new Vector<F32>(count);
		var movedY = new Vector<F32>(count);
		for (i in 0...count) {
			movedX[i] = xs[i] + dx;
			movedY[i] = ys[i] + dy;
		}
		Batch.values(input, out, movedX, movedY, count);
	}
}
