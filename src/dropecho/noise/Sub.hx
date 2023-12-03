package dropecho.noise;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Sub implements IModule2D {
	public function new(input:IModule2D, input2:IModule2D);

	public function value(x:Float, y:Float):Float {
		return (input.value(x, y) - input2.value(x, y));
	}
}
