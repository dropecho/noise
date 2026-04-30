package dropecho.noise;

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
