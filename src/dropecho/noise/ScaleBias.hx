package dropecho.noise;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class ScaleBias implements IModule2D {
	public function new(input:IModule2D, scale:Float = 1, bias:Float = 0);

	public function value(x:Float, y:Float):Float {
		return input.value(x, y) * scale + bias;
	}
}
