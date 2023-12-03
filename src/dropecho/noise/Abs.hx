package dropecho.noise;

import dropecho.utils.FastMath;

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
