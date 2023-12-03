package dropecho.noise;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Constant implements IModule2D {
	/**
	 * @param value The constant value to return.
	 */
	public function new(constant:Float);

	public function value(x:Float, y:Float):Float {
		return constant;
	}
}
