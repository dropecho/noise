package dropecho.noise;

import dropecho.utils.FastMath;

/** Raises the first module's output to the power of the second module's output. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Pow implements IModule2D {
	public function new(input:IModule2D, input2:IModule2D);

	public function value(x:F32, y:F32):F32 {
		return Math.pow(input.value(x, y), input2.value(x, y));
	}
}
