package dropecho.noise;

import dropecho.utils.FastMath;

/** Always outputs the same constant value regardless of coordinates. Useful as a fixed input to combiners and selectors. */
@:build(dropecho.macros.Constructor.fromArgs())
class Constant implements IModule2D {
	/**
	 * @param constant The constant value to return.
	 */
	public function new(constant:F32);

	public function value(x:F32, y:F32):F32 {
		return constant;
	}
}
