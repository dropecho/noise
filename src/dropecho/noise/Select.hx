package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/**
 * Outputs one of two source modules based on a control module's value relative to a threshold.
 * When falloff > 0, a smooth fade is applied in the region [threshold - falloff, threshold + falloff]
 * using a 5th-order fade curve. Outside that region the selection is hard.
 */
@:build(dropecho.macros.Constructor.fromArgs())
class Select implements IGridModule2D {
	public function new(a:IModule2D, b:IModule2D, control:IModule2D, threshold:F32 = 0, falloff:F32 = 0);

	public function value(x:F32, y:F32):F32 {
		var t = weight(control.value(x, y));
		if (t <= 0) return a.value(x, y);
		if (t >= 1) return b.value(x, y);
		return MathUtils.lerp(a.value(x, y), b.value(x, y), t);
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		var weights = new Vector<F32>(count);
		Batch.values(control, weights, xs, ys, count);
		for (i in 0...count) {
			weights[i] = weight(weights[i]);
		}
		Batch.lerpByWeight(a, b, weights, out, xs, ys, count);
	}

	// How much of b to use for a control value: 0 or less is all a, 1 or more is all b.
	private function weight(cv:F32):F32 {
		if (falloff <= 0) return cv < threshold ? 0 : 1;

		var lo:F32 = threshold - falloff;
		var hi:F32 = threshold + falloff;
		if (cv < lo) return 0;
		if (cv > hi) return 1;
		return MathUtils.fade((cv - lo) / (falloff * 2));
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		var weights = new Vector<F32>(width * height);
		Batch.gridValues(control, weights, xs, width, ys, height);
		for (k in 0...width * height) {
			weights[k] = weight(weights[k]);
		}
		Batch.lerpByWeightGrid(a, b, weights, out, xs, width, ys, height);
	}
}
