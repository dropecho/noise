package dropecho.noise;

/** Outputs the product of two source modules' values. Useful for masking one noise pattern with another. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Multiply implements IModule2D {
	/**
	 * @param input The IModule2D to get a value from. 
	 */
	public function new(input:IModule2D, input2:IModule2D);

	public function value(x:Float, y:Float):Float {
		return (input.value(x, y) * input2.value(x, y));
	}
}
