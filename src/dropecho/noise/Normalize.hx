package dropecho.noise;

import dropecho.utils.MathUtils;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Normalize implements IModule2D {
	public function new(input:IModule2D, inputMin:Float = -1, inputMax:Float = 1, outputMin:Float = -1, outputMax:Float = 1);

	public function value(x:Float, y:Float):Float {
		var t = MathUtils.inverseLerp(input.value(x, y), inputMin, inputMax);
		return MathUtils.lerp(outputMin, outputMax, t);
	}
}
