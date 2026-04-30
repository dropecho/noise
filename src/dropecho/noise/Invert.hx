package dropecho.noise;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Invert implements IModule2D {
	public function new(input:IModule2D);

	public function value(x:Float, y:Float):Float {
		return -input.value(x, y);
	}
}
