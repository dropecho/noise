package dropecho.noise;

import dropecho.utils.FastMath;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Cones implements IModule2D {
	public function new(frequency:Float = 1);

	public function value(x:Float, y:Float):Float {
		var intX = Std.int(x * frequency);
		var intY = Std.int(y * frequency);

		var x = (x * frequency) - (intX + 0.5);
		var y = (y * frequency) - (intY + 0.5);

		var dist = FastMath.sqrt(x * x + y * y);
		return 1 - (dist * 4);
	}
}
