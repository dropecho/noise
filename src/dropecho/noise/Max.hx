package dropecho.noise;

import dropecho.utils.FastMath;

/** Outputs the larger of two source modules' values at each point. */
@:build(dropecho.macros.Constructor.fromArgs())
class Max implements IModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 * @param input2 The IModule2D to get a value from. 
	 */
	public function new(input:IModule2D, input2:IModule2D);

	public function value(x:F32, y:F32):F32 {
		return FastMath.max(input.value(x, y), input2.value(x, y));
	}
}
