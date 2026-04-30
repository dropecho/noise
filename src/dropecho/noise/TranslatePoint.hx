package dropecho.noise;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class TranslatePoint implements IModule2D {
	public function new(input:IModule2D, dx:Float = 0, dy:Float = 0);

	public function value(x:Float, y:Float):Float {
		return input.value(x + dx, y + dy);
	}
}
