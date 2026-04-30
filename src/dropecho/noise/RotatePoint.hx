package dropecho.noise;

/** Rotates input coordinates by a fixed angle (in radians) around the origin before sampling the source module. Cos/sin are pre-computed at construction time. */
class RotatePoint implements IModule2D {
	var input:IModule2D;
	var cosAngle:Float;
	var sinAngle:Float;

	public function new(input:IModule2D, angle:Float = 0) {
		this.input = input;
		this.cosAngle = Math.cos(angle);
		this.sinAngle = Math.sin(angle);
	}

	public function value(x:Float, y:Float):Float {
		return input.value(x * cosAngle - y * sinAngle, x * sinAngle + y * cosAngle);
	}
}
