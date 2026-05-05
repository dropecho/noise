package dropecho.noise;

import dropecho.utils.FastMath;

/**
 * Displaces input coordinates using separate x and y noise modules before sampling the source.
 * If only one displacement module is provided, it is used for both axes.
 */
class Displace implements IModule2D {
	var _input:IModule2D;
	var _xModule:IModule2D;
	var _yModule:IModule2D;
	var _sameModule:Bool = false;
	var _power:F32;

	public function new(input:IModule2D, xModule:IModule2D, ?yModule:IModule2D, power:F32 = 1) {
		_input = input;
		_xModule = xModule;
		_power = power;
		if (yModule == null) {
			_sameModule = true;
			_yModule = xModule;
		} else {
			_yModule = yModule;
		}
	}

	public inline function value(x:F32, y:F32):F32 {
		var xval = _xModule.value(x, y);
		var yval = _sameModule ? xval : _yModule.value(x, y);
		return _input.value((xval * _power) + x, (yval * _power) + y);
	}
}
