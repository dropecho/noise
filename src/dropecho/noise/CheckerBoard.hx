package dropecho.noise;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class CheckerBoard implements IModule2D {
	public function new(frequency:Float = 1);

	public function value(x:Float, y:Float):Float {
		var intX = Std.int(x * frequency);
		var intY = Std.int(y * frequency);

		return ((intX + intY) % 2 == 0) ? 1 : -1;
	}
}
