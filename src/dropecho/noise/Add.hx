package dropecho.noise;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Add implements IModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 * @param min The minimum value to clamp to. 
	 * @param max The maximum value to clamp to. 
	 */
	public function new(input:IModule2D, input2:IModule2D);

	public function value(x:Float, y:Float):Float {
		return (input.value(x, y) + input2.value(x, y));
	}
}
