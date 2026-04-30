package dropecho.noise;

/** Returns 1.0 if the source module's output meets or exceeds the cutoff, else -1.0. Useful for generating binary land/sea or solid/empty masks. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Threshold implements IModule2D {
	public function new(input:IModule2D, cutoff:Float = 0);

	public function value(x:Float, y:Float):Float {
		return input.value(x, y) >= cutoff ? 1.0 : -1.0;
	}
}
