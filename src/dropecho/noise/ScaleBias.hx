package dropecho.noise;

import dropecho.utils.FastMath;

/** Applies a linear transform (output * scale + bias) to the source module's output. Use to remap value ranges or adjust contrast. */
@:build(dropecho.macros.Constructor.fromArgs())
class ScaleBias implements IModule2D {
	public function new(input:IModule2D, scale:F32 = 1, bias:F32 = 0);

	public function value(x:F32, y:F32):F32 {
		return input.value(x, y) * scale + bias;
	}
}
