package dropecho.noise;

/** Raises the first module's output to the power of the second module's output. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Pow implements IModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 */
	public function new(input:IModule2D, input2:IModule2D);

	public function value(x:Float, y:Float):Float {
		return Math.pow(input.value(x, y), input2.value(x, y));
	}
}
