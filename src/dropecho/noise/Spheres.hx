package dropecho.noise;

import dropecho.utils.FastMath;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Spheres implements IModule2D {
	public function new(frequency:Float = 1);

	public function value(x:Float, y:Float):Float {
		var dist = FastMath.sqrt(x * x + y * y) * frequency;
		var fractional = dist - FastMath.floor(dist);
		// 1 at ring surfaces (fractional = 0), -1 between rings (fractional = 0.5)
		return 1.0 - (4.0 * FastMath.abs(fractional - 0.5));
	}
}
