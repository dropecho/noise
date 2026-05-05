package dropecho.noise;

import dropecho.utils.FastMath;

/** Scales input coordinates by a scalar before sampling the source module. Equivalent to multiplying the source module's frequency. */
class Scale implements IModule2D {
	var _input:IModule2D;
	var _scalar:F32;

	public function new(input:IModule2D, s:F32) {
		_input = input;
		_scalar = s;
	}

	public function value(x:F32, y:F32):F32 {
		return _input.value(x * _scalar, y * _scalar);
	}
}
