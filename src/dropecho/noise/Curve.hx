package dropecho.noise;

typedef CurvePoint = {input:Float, output:Float};

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Curve implements IModule2D {
	public function new(input:IModule2D, points:Array<CurvePoint>);

	public function value(x:Float, y:Float):Float {
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

		var t = (v - p1.input) / (p2.input - p1.input);
		return catmullRom(p0.output, p1.output, p2.output, p3.output, t);
	}

	private inline function catmullRom(p0:Float, p1:Float, p2:Float, p3:Float, t:Float):Float {
		var t2 = t * t;
		var t3 = t2 * t;
		return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
	}
}
