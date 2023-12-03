package dropecho.noise;

// @:build(dropecho.macros.Constructor.fromParams())
class Scale implements IModule2D {
	var _input:IModule2D;
	var _scalar:Float;

	public function new(input:IModule2D, s:Float) {
		_input = input;
		_scalar = s;
	};

	public function value(x:Float, y:Float):Float {
		return _input.value(x * _scalar, y * _scalar);
	}
}
