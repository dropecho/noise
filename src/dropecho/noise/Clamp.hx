package dropecho.noise;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Clamp implements IModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 * @param min The minimum value to clamp to. 
	 * @param max The maximum value to clamp to. 
	 */
	public function new(input:IModule2D, min:Float = -1, max:Float = 1);

	public function value(x:Float, y:Float):Float {
		return Math.min(Math.max(input.value(x, y), min), max);
	}
}
