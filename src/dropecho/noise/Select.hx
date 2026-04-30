package dropecho.noise;

import dropecho.utils.MathUtils;

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
		return MathUtils.lerp(a.value(x, y), b.value(x, y), t);
	}
}
