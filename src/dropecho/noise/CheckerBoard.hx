package dropecho.noise;

import dropecho.utils.FastMath;

/** Checkerboard pattern generator. Returns 1 and -1 in alternating grid squares. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class CheckerBoard implements IModule2D {
	public function new(frequency:F32 = 1);

	public function value(x:F32, y:F32):F32 {
		var intX = FastMath.floor(x * frequency);
		var intY = FastMath.floor(y * frequency);

		return ((intX + intY) & 1) == 0 ? 1 : -1;
	}
}
