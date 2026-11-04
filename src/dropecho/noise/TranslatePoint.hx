package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Offsets input coordinates by (dx, dy) before sampling the source module. Useful for shifting the origin of any noise pattern. */
@:build(dropecho.macros.Constructor.fromArgs())
class TranslatePoint implements IGridModule2D {
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

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		// A translated grid is still a grid: each column and row moves by the same amount.
		var movedX = new Vector<F32>(width);
		var movedY = new Vector<F32>(height);
		for (i in 0...width) {
			movedX[i] = xs[i] + dx;
		}
		for (j in 0...height) {
			movedY[j] = ys[j] + dy;
		}
		Batch.gridValues(input, out, movedX, width, movedY, height);
	}
}
