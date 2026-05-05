package dropecho.noise;

import dropecho.utils.FastMath;

typedef CurvePoint = {input:F32, output:F32};

/**
 * Maps source module output through a piecewise Catmull-Rom spline defined by
 * (input, output) control point pairs. Control points must be sorted by input value.
 * Values outside the range of the control points are clamped to the nearest endpoint.
 */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Curve implements IModule2D {
	public function new(input:IModule2D, points:Array<CurvePoint>);

	public function value(x:F32, y:F32):F32 {
		var v = input.value(x, y);
		var n = points.length;

		if (n == 0) return v;
		if (v <= points[0].input) return points[0].output;
		if (v >= points[n - 1].input) return points[n - 1].output;

		var i = 1;
		while (i < n && points[i].input < v)
			i++;

		var p0 = points[i - 2 < 0 ? 0 : i - 2];
		var p1 = points[i - 1];
		var p2 = points[i];
		var p3 = points[i + 1 >= n ? n - 1 : i + 1];

		var p1i:F32 = p1.input;
		var p2i:F32 = p2.input;
		var t:F32 = (v - p1i) / (p2i - p1i);
		var p0o:F32 = p0.output;
		var p1o:F32 = p1.output;
		var p2o:F32 = p2.output;
		var p3o:F32 = p3.output;
		return catmullRom(p0o, p1o, p2o, p3o, t);
	}

	private inline function catmullRom(p0:F32, p1:F32, p2:F32, p3:F32, t:F32):F32 {
		var t2 = t * t;
		var t3 = t2 * t;
		var half:F32 = 0.5;
		return half * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
	}
}
