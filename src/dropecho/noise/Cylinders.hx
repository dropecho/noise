package dropecho.noise;

import dropecho.utils.FastMath;

/** Outputs concentric cylinder cross-section rings aligned along the x-axis. Produces parallel band patterns. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Cylinders implements IModule2D {
	public function new(frequency:F32 = 1);

	public function value(x:F32, y:F32):F32 {
		var intX = FastMath.floor(x * frequency);
		var cx = (x * frequency) - (intX + 0.5);
		return FastMath.abs(Math.cos(cx * Math.PI * 2));
	}
}
