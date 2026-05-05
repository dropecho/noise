package dropecho.noise;

import dropecho.utils.FastMath;

/** Rotates input coordinates by a fixed angle (in radians) around the origin before sampling the source module. Cos/sin are pre-computed at construction time. */
class RotatePoint implements IModule2D {
	var input:IModule2D;
	var cosAngle:F32;
	var sinAngle:F32;

	public function new(input:IModule2D, angle:F32 = 0) {
		this.input = input;
		this.cosAngle = Math.cos(angle);
		this.sinAngle = Math.sin(angle);
	}

	public function value(x:F32, y:F32):F32 {
		return input.value(x * cosAngle - y * sinAngle, x * sinAngle + y * cosAngle);
	}
}
