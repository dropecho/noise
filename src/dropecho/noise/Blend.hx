package dropecho.noise;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Blend implements IModule2D {
	/**
	 */
	public function new(from:IModule2D, to:IModule2D, blender:IModule2D);

	public function value(x:Float, y:Float):Float {
		var fromValue = from.value(x, y);
		var toValue = to.value(x, y);
		var blendValue = (blender.value(x, y) + 1.0) / 2.0;

		return lerp(fromValue, toValue, blendValue);
	}

	private function lerp(v0:Float, v1:Float, t:Float):Float {
		return v0 + t * (v1 - v0);
	}
}
