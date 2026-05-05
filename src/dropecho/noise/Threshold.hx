package dropecho.noise;

import dropecho.utils.FastMath;

/** Returns 1.0 if the source module's output meets or exceeds the cutoff, else -1.0. Useful for generating binary land/sea or solid/empty masks. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Threshold implements IModule2D {
	public function new(input:IModule2D, cutoff:F32 = 0);

	public function value(x:F32, y:F32):F32 {
		return input.value(x, y) >= cutoff ? 1.0 : -1.0;
	}
}
