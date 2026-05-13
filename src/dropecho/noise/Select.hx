package dropecho.noise;

import dropecho.utils.MathUtils;

/**
 * Outputs one of two source modules based on a control module's value relative to a threshold.
 * When falloff > 0, a smooth fade is applied in the region [threshold - falloff, threshold + falloff]
 * using a 5th-order fade curve. Outside that region the selection is hard.
 */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Select implements IModule2D {
	public function new(a:IModule2D, b:IModule2D, control:IModule2D, threshold:Float = 0, falloff:Float = 0);

	public function value(x:Float, y:Float):Float {
		var cv = control.value(x, y);

		if (falloff <= 0) {
			return cv < threshold ? a.value(x, y) : b.value(x, y);
		}

		var lo = threshold - falloff;
		var hi = threshold + falloff;

		if (cv < lo) return a.value(x, y);
		if (cv > hi) return b.value(x, y);

		var t = MathUtils.fade((cv - lo) / (falloff * 2));
		if (t <= 0) return a.value(x, y);
		if (t >= 1) return b.value(x, y);
		return MathUtils.lerp(a.value(x, y), b.value(x, y), t);
	}
}
