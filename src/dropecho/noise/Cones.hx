package dropecho.noise;

import dropecho.utils.FastMath;

/** Outputs a concentric cone cross-section pattern — radial distance from each cell center mapped to a tent-shaped peak. */
@:build(dropecho.macros.Constructor.fromArgs())
class Cones implements IModule2D {
	public function new(frequency:F32 = 1);

	public function value(x:F32, y:F32):F32 {
		var intX = FastMath.floor(x * frequency);
		var intY = FastMath.floor(y * frequency);

		var x = (x * frequency) - (intX + 0.5);
		var y = (y * frequency) - (intY + 0.5);

		var dist = FastMath.sqrt(x * x + y * y);
		return 1 - (dist * 4);
	}
}
