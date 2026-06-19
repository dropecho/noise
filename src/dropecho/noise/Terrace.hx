package dropecho.noise;

import dropecho.utils.FastMath;
import haxe.ds.Vector;

typedef ControlPoint = {
	var min:F32;
	var max:F32;
	var val:F32;
}

/** Maps source module output to discrete stepped values using [min, max, val] control points. Values that fall in a control point's range are snapped to its val; others pass through unchanged. */
class Terrace implements IModule2D {
	var input:IModule2D;

	// Control points unpacked into parallel vectors: anonymous-structure field access
	// is a dynamic by-name lookup on C#/Python and a pointer chase on JS.
	var mins:Vector<F32>;
	var maxs:Vector<F32>;
	var vals:Vector<F32>;
	var n:Int;

	/**
	 * @param input The source module.
	 * @param points Control points: value in [min, max) snaps to val.
	 */
	public function new(input:IModule2D, points:Array<ControlPoint>) {
		this.input = input;
		n = points == null ? 0 : points.length;
		mins = new Vector<F32>(n);
		maxs = new Vector<F32>(n);
		vals = new Vector<F32>(n);
		for (i in 0...n) {
			mins[i] = points[i].min;
			maxs[i] = points[i].max;
			vals[i] = points[i].val;
		}
	}

	public function value(x:F32, y:F32):F32 {
		var v = input.value(x, y);

		var lo = 0;
		var hi = n - 1;
		while (lo <= hi) {
			var mid = (lo + hi) >> 1;
			if (v < mins[mid]) hi = mid - 1;
			else if (v >= maxs[mid]) lo = mid + 1;
			else return vals[mid];
		}

		return v;
	}
}
