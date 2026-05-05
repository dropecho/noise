package dropecho.noise;

import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/**
 * Outputs one of two source modules based on a control module's value relative to a threshold.
 * When falloff > 0, a smooth fade is applied in the region [threshold - falloff, threshold + falloff]
 * using a 5th-order fade curve. Outside that region the selection is hard.
 */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Select implements IModule2D {
	public function new(a:IModule2D, b:IModule2D, control:IModule2D, threshold:F32 = 0, falloff:F32 = 0);

	public function value(x:F32, y:F32):F32 {
		var cv = control.value(x, y);

		if (falloff <= 0) {
			return cv < threshold ? a.value(x, y) : b.value(x, y);
		}

		var lo:F32 = threshold - falloff;
		var hi:F32 = threshold + falloff;

		if (cv < lo) return a.value(x, y);
		if (cv > hi) return b.value(x, y);

		var t = MathUtils.fade((cv - lo) / (falloff * 2));
		return MathUtils.lerp(a.value(x, y), b.value(x, y), t);
	}
}
