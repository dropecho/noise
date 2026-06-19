package dropecho.noise;

import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/** Remaps the source module's output from [inputMin, inputMax] to [outputMin, outputMax] via linear interpolation. Useful for converting noise ranges (e.g. [-1,1] to [0,1]). */
@:build(dropecho.macros.Constructor.fromArgs())
class Normalize implements IModule2D {
	public function new(input:IModule2D, inputMin:F32 = -1, inputMax:F32 = 1, outputMin:F32 = -1, outputMax:F32 = 1);

	public function value(x:F32, y:F32):F32 {
		var t = MathUtils.inverseLerp(input.value(x, y), inputMin, inputMax);
		return MathUtils.lerp(outputMin, outputMax, t);
	}
}
