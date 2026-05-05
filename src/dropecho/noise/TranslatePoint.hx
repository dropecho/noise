package dropecho.noise;

import dropecho.utils.FastMath;

/** Offsets input coordinates by (dx, dy) before sampling the source module. Useful for shifting the origin of any noise pattern. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class TranslatePoint implements IModule2D {
	public function new(input:IModule2D, dx:F32 = 0, dy:F32 = 0);

	public function value(x:F32, y:F32):F32 {
		return input.value(x + dx, y + dy);
	}
}
