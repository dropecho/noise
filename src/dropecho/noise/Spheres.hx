package dropecho.noise;

import dropecho.utils.FastMath;

/** Outputs concentric ring patterns based on radial distance from the origin. Output peaks (+1) at half-integer distances and troughs (-1) at integer distances. */
@:build(dropecho.macros.Constructor.fromArgs())
class Spheres implements IModule2D {
	public function new(frequency:F32 = 1);

	public function value(x:F32, y:F32):F32 {
		var dist = FastMath.sqrt(x * x + y * y) * frequency;
		var fractional = dist - FastMath.floor(dist);
		return 1.0 - (4.0 * FastMath.abs(fractional - 0.5));
	}
}
