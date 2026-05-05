package dropecho.noise;

/** Offsets input coordinates by (dx, dy) before sampling the source module. Useful for shifting the origin of any noise pattern. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class TranslatePoint implements IModule2D {
	public function new(input:IModule2D, dx:Float = 0, dy:Float = 0);

	public function value(x:Float, y:Float):Float {
		return input.value(x + dx, y + dy);
	}
}
