package dropecho.noise;

import dropecho.utils.FastMath;
import haxe.ds.Vector;

typedef CurvePoint = {input:F32, output:F32};

/**
 * Maps source module output through a piecewise Catmull-Rom spline defined by
 * (input, output) control point pairs. Control points must be sorted by input value.
 * Values outside the range of the control points are clamped to the nearest endpoint.
 */
class Curve implements IBatchModule2D {
	var input:IModule2D;

	// Control points unpacked into parallel vectors: anonymous-structure field access
	// is a dynamic by-name lookup on C#/Python and a pointer chase on JS.
	var inputs:Vector<F32>;
	var outputs:Vector<F32>;
	var n:Int;

	public function new(input:IModule2D, points:Array<CurvePoint>) {
		this.input = input;
		n = points.length;
		inputs = new Vector<F32>(n);
		outputs = new Vector<F32>(n);
		for (i in 0...n) {
			inputs[i] = points[i].input;
			outputs[i] = points[i].output;
		}
	}

	public function value(x:F32, y:F32):F32 {
		return map(input.value(x, y));
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		Batch.values(input, out, xs, ys, count);
		for (i in 0...count) {
			out[i] = map(out[i]);
		}
	}

	private function map(v:F32):F32 {
		if (n == 0) return v;
		if (v <= inputs[0]) return outputs[0];
		if (v >= inputs[n - 1]) return outputs[n - 1];

		var lo = 1;
		var hi = n - 1;
		while (lo < hi) {
			var mid = (lo + hi) >> 1;
			if (inputs[mid] < v) lo = mid + 1; else hi = mid;
		}
		var i = lo;

		var p1i:F32 = inputs[i - 1];
		var p2i:F32 = inputs[i];
		var t:F32 = (v - p1i) / (p2i - p1i);
		var p0o:F32 = outputs[i - 2 < 0 ? 0 : i - 2];
		var p1o:F32 = outputs[i - 1];
		var p2o:F32 = outputs[i];
		var p3o:F32 = outputs[i + 1 >= n ? n - 1 : i + 1];
		return catmullRom(p0o, p1o, p2o, p3o, t);
	}

	private inline function catmullRom(p0:F32, p1:F32, p2:F32, p3:F32, t:F32):F32 {
		var t2 = t * t;
		var t3 = t2 * t;
		var half:F32 = 0.5;
		return half * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
	}
}
