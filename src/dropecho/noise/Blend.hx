package dropecho.noise;

import dropecho.utils.MathUtils;

/** Linearly interpolates between two source modules using a third module as the blend factor. The blender output is used directly as the lerp alpha. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Blend implements IModule2D {
	public function new(from:IModule2D, to:IModule2D, blender:IModule2D);

	public function value(x:Float, y:Float):Float {
		var fromValue = from.value(x, y);
		var toValue = to.value(x, y);
		var blendValue = blender.value(x, y);

		return MathUtils.lerp(fromValue, toValue, blendValue);
	}
}
