package dropecho.noise;

/** Scales input coordinates by a scalar before sampling the source module. Equivalent to multiplying the source module's frequency. */
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
