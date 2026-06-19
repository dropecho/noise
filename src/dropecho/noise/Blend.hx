package dropecho.noise;

import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/** Linearly interpolates between two source modules using a third module as the blend factor. The blender output is used directly as the lerp alpha. */
@:build(dropecho.macros.Constructor.fromArgs())
class Blend implements IModule2D {
	public function new(from:IModule2D, to:IModule2D, blender:IModule2D);

	public function value(x:F32, y:F32):F32 {
		var blendValue = blender.value(x, y);
		if (blendValue <= 0) return from.value(x, y);
		if (blendValue >= 1) return to.value(x, y);
		return MathUtils.lerp(from.value(x, y), to.value(x, y), blendValue);
	}
}
