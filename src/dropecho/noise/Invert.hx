package dropecho.noise;

/** Negates the source module's output (multiplies by -1). Peaks become valleys and vice versa. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Invert implements IModule2D {
	public function new(input:IModule2D);

	public function value(x:Float, y:Float):Float {
		return -input.value(x, y);
	}
}
