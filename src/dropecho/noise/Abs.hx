package dropecho.noise;

import dropecho.utils.FastMath;

/** Outputs the absolute value of the source module's output. Maps [-1, 0] to [0, 1], so all output is non-negative. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Abs implements IModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 */
	public function new(input:IModule2D);

	public function value(x:Float, y:Float):Float {
		return FastMath.abs(input.value(x, y));
	}
}
