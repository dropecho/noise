package dropecho.noise;

import dropecho.utils.FastMath;

/** Outputs the absolute value of the source module's output. Maps [-1, 0] to [0, 1], so all output is non-negative. */
@:build(dropecho.macros.Constructor.fromArgs())
class Abs implements IModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 */
	public function new(input:IModule2D);

	public function value(x:F32, y:F32):F32 {
		return FastMath.abs(input.value(x, y));
	}
}
