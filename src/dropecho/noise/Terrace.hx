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

		if (points == null) return v;

		var lo = 0;
		var hi = points.length - 1;
		while (lo <= hi) {
			var mid = (lo + hi) >> 1;
			var p = points[mid];
			if (v < p.min) hi = mid - 1;
			else if (v >= p.max) lo = mid + 1;
			else return p.val;
		}

		return v;
	}
}
