package dropecho.noise;

import dropecho.utils.FastMath;

/** Outputs the product of two source modules' values. Useful for masking one noise pattern with another. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Multiply implements IModule2D {
	public function new(input:IModule2D, input2:IModule2D);

	public function value(x:F32, y:F32):F32 {
		return (input.value(x, y) * input2.value(x, y));
	}
}
