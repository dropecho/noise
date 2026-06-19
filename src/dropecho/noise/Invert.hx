package dropecho.noise;

import dropecho.utils.FastMath;

/** Negates the source module's output (multiplies by -1). Peaks become valleys and vice versa. */
@:build(dropecho.macros.Constructor.fromArgs())
class Invert implements IModule2D {
	public function new(input:IModule2D);

	public function value(x:F32, y:F32):F32 {
		return -input.value(x, y);
	}
}
