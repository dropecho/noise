package dropecho.noise;

import dropecho.utils.FastMath;

typedef ControlPoint = {
	var min:F32;
	var max:F32;
	var val:F32;
}

/** Maps source module output to discrete stepped values using [min, max, val] control points. Values that fall in a control point's range are snapped to its val; others pass through unchanged. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Terrace implements IModule2D {
	/**
	 * @param input The source module.
	 * @param points Control points: value in [min, max) snaps to val.
	 */
	public function new(input:IModule2D, points:Array<ControlPoint>);

	public function value(x:F32, y:F32):F32 {
		var v = input.value(x, y);

		if (points != null) {
			for (point in points) {
				if (v >= point.min && v < point.max) {
					return point.val;
				}
			}
		}

		return v;
	}
}
