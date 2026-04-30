package dropecho.noise;

import dropecho.utils.FastMath;

/** Checkerboard pattern generator. Returns 1 and -1 in alternating grid squares. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class CheckerBoard implements IModule2D {
	public function new(frequency:Float = 1);

	public function value(x:Float, y:Float):Float {
		var intX = FastMath.floor(x * frequency);
		var intY = FastMath.floor(y * frequency);

		return ((intX + intY) % 2 == 0) ? 1 : -1;
	}
}
