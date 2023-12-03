package dropecho.noise;

// @:build(dropecho.macros.Constructor.fromParams())
class Displace implements IModule2D {
	public var power:Float = 100;

	var _input:IModule2D;
	var _xModule:IModule2D;
	var _yModule:IModule2D;

	var same_module:Bool = false;

	/**
	 * @param input The IModule2D to get a value from. 
	 */
	public function new(input:IModule2D, xModule:IModule2D, ?yModule:IModule2D) {
		_input = input;
		_xModule = xModule;
		if (yModule == null) {
			same_module = true;
			_yModule = xModule;
		} else {
			_yModule = yModule;
		}
	};

	public inline function value(x:Float, y:Float):Float {
		var xval = _xModule.value(x, y);
		var yval = same_module ? xval : _yModule.value(x, y);

		var displacedX = (xval * power) + x;
		var displacedY = (yval * power) + y;

		return _input.value(displacedX, displacedY);
	}
}
