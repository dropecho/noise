package dropecho.noise;

import dropecho.utils.FastMath;

/** Outputs the larger of two source modules' values at each point. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Max implements IModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 * @param input2 The IModule2D to get a value from. 
	 */
	public function new(input:IModule2D, input2:IModule2D);

	public function value(x:Float, y:Float):Float {
		return FastMath.max(input.value(x, y), input2.value(x, y));
	}
}
