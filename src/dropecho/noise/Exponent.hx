package dropecho.noise;

import dropecho.utils.FastMath;

/**
 * Applies an exponential curve to the source module's output via pow((v+1)/2, exp)*2-1.
 * exp > 1 sharpens peaks and pushes midtones toward -1; exp < 1 flattens and pushes toward +1.
 */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Exponent implements IModule2D {
	public function new(input:IModule2D, exp:F32 = 1);

	public function value(x:F32, y:F32):F32 {
		var v:F32 = input.value(x, y);
		return FastMath.pow((v + 1.0) / 2.0, exp) * 2.0 - 1.0;
	}
}
