package dropecho.noise;

import dropecho.utils.FastMath;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Exponent implements IModule2D {
	public function new(input:IModule2D, exp:Float = 1);

	public function value(x:Float, y:Float):Float {
		var v = input.value(x, y);
		return FastMath.pow((v + 1.0) / 2.0, exp) * 2.0 - 1.0;
	}
}
