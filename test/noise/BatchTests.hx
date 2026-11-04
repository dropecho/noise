package noise;

import haxe.ds.Vector;
import utest.Assert;
import dropecho.noise.*;
import dropecho.utils.FastMath.F32;

class BatchTests extends utest.Test {
	static inline final COUNT = 300;

	function modules():Array<{name:String, module:IModule2D}> {
		var perlin = new Perlin(1, 0.7);
		var simplex = new Simplex(2, 1);
		// Spans well past [0, 1], so Blend and Select hit all three branches.
		var wide = new ScaleBias(new Perlin(2, 0.5), 3, 0.5);
		var curvePoints:Array<dropecho.noise.Curve.CurvePoint> = [
			{input: (-1.0 : F32), output: (-1.0 : F32)},
			{input: (-0.2 : F32), output: (0.3 : F32)},
			{input: (0.4 : F32), output: (-0.1 : F32)},
			{input: (1.0 : F32), output: (1.0 : F32)},
		];
		var terracePoints:Array<dropecho.noise.Terrace.ControlPoint> = [
			{min: (-1.0 : F32), max: (-0.3 : F32), val: (-0.6 : F32)},
			{min: (-0.3 : F32), max: (0.2 : F32), val: (0.0 : F32)},
			{min: (0.2 : F32), max: (1.0 : F32), val: (0.6 : F32)},
		];
		return [
			{name: "Perlin", module: perlin},
			{name: "Perlin x4", module: new Perlin(4, 1.3)},
			{name: "Simplex", module: simplex},
			{name: "Billow", module: new Billow(3, 1.1)},
			{name: "Ridged", module: new Ridged(3, 0.9)},
			{name: "Voronoi Euclidian", module: new Voronoi(0.8, Euclidian)},
			{name: "Voronoi Manhattan", module: new Voronoi(0.8, Manhattan)},
			{name: "Voronoi Chebyshev", module: new Voronoi(0.8, Chebyshev)},
			{name: "Worley", module: new Worley(1.2)},
			{name: "CellularF2F1", module: new CellularF2F1(0.9)},
			{name: "CheckerBoard", module: new CheckerBoard(1.5)},
			{name: "Cones", module: new Cones(0.7)},
			{name: "Cylinders", module: new Cylinders(0.7)},
			{name: "Spheres", module: new Spheres(0.3)},
			{name: "Constant", module: new Constant(0.25)},
			{name: "Abs", module: new Abs(perlin)},
			{name: "Invert", module: new Invert(perlin)},
			{name: "ScaleBias", module: new ScaleBias(perlin, 1.7, -0.2)},
			{name: "Threshold", module: new Threshold(perlin, 0.1)},
			{name: "Exponent", module: new Exponent(perlin, 2.5)},
			{name: "Normalize", module: new Normalize(perlin, -1, 1, 0, 1)},
			{name: "Clamp", module: new Clamp(new Perlin(3, 1), -0.2, 0.3)},
			{name: "Curve", module: new Curve(perlin, curvePoints)},
			{name: "Terrace", module: new Terrace(perlin, terracePoints)},
			{name: "Add", module: new Add(perlin, simplex)},
			{name: "Sub", module: new Sub(perlin, simplex)},
			{name: "Multiply", module: new Multiply(perlin, simplex)},
			{name: "Min", module: new Min(perlin, simplex)},
			{name: "Max", module: new Max(perlin, simplex)},
			{name: "Pow", module: new Pow(new Abs(perlin), new Constant(1.5))},
			{name: "TranslatePoint", module: new TranslatePoint(perlin, 0.37, -1.91)},
			{name: "Scale", module: new Scale(perlin, 1.37)},
			{name: "RotatePoint", module: new RotatePoint(perlin, 0.6)},
			{name: "Displace one module", module: new Displace(perlin, simplex, null, 0.8)},
			{name: "Displace two modules", module: new Displace(perlin, simplex, new Worley(1), 0.8)},
			{name: "Turbulence", module: new Turbulence(perlin, 0.5, 2)},
			{name: "FractalWarp", module: new FractalWarp(perlin, 0.5, 2, 3)},
			{name: "Blend", module: new Blend(perlin, simplex, wide)},
			// Every point uses both inputs, then only one: the whole-grid and skipped paths.
			{name: "Blend half", module: new Blend(perlin, simplex, new Constant(0.5))},
			{name: "Blend all from", module: new Blend(perlin, simplex, new Constant(-1))},
			{name: "Select hard", module: new Select(perlin, simplex, wide, 0.5, 0)},
			{name: "Select falloff", module: new Select(perlin, simplex, wide, 0.5, 0.8)},
			{name: "nested", module: new Clamp(new Add(new TranslatePoint(new Perlin(2, 1), 3.3, 0.1), perlin), -0.5, 0.5)},
		];
	}

	// A row from x = -9.37 rightwards, crossing 0 and many cells.
	function row(y:F32):{xs:Vector<F32>, ys:Vector<F32>} {
		var xs = new Vector<F32>(COUNT);
		var ys = new Vector<F32>(COUNT);
		for (i in 0...COUNT) {
			xs[i] = -9.37 + i * 0.061;
			ys[i] = y;
		}
		return {xs: xs, ys: ys};
	}

	function scattered():{xs:Vector<F32>, ys:Vector<F32>} {
		var xs = new Vector<F32>(COUNT);
		var ys = new Vector<F32>(COUNT);
		var seed:Float = 777;
		for (i in 0...COUNT) {
			seed = (seed * 16807) % 2147483647;
			xs[i] = seed / 2147483647 * 200 - 100;
			seed = (seed * 16807) % 2147483647;
			ys[i] = seed / 2147483647 * 200 - 100;
		}
		return {xs: xs, ys: ys};
	}

	function assertMatchesValue(points:{xs:Vector<F32>, ys:Vector<F32>}) {
		for (m in modules()) {
			var out = new Vector<F32>(COUNT);
			Batch.values(m.module, out, points.xs, points.ys, COUNT);
			var mismatches = 0;
			for (i in 0...COUNT) {
				if (out[i] != m.module.value(points.xs[i], points.ys[i])) mismatches++;
			}
			Assert.equals(0, mismatches, '${m.name}: batch differs from value() at $mismatches points');
		}
	}

	public function test_batch_matches_value_on_a_row() {
		assertMatchesValue(row(-2.73));
	}

	public function test_batch_matches_value_on_a_row_at_positive_y() {
		assertMatchesValue(row(5.5));
	}

	public function test_batch_matches_value_on_scattered_points() {
		assertMatchesValue(scattered());
	}

	public function test_grid_matches_value_for_every_module() {
		// Uneven columns and rows crossing zero.
		var width = 23;
		var height = 9;
		var xs = new Vector<F32>(width);
		var ys = new Vector<F32>(height);
		for (i in 0...width) {
			xs[i] = -4.3 + i * 0.41 + (i % 3) * 0.07;
		}
		for (j in 0...height) {
			ys[j] = -1.9 + j * 0.53 - (j % 2) * 0.11;
		}
		for (m in modules()) {
			var out = new Vector<F32>(width * height);
			Batch.gridValues(m.module, out, xs, width, ys, height);
			var mismatches = 0;
			for (j in 0...height) {
				for (i in 0...width) {
					if (out[j * width + i] != m.module.value(xs[i], ys[j])) mismatches++;
				}
			}
			Assert.equals(0, mismatches, '${m.name}: grid differs from value() at $mismatches points');
		}
	}

	public function test_grid_lays_out_rows() {
		var perlin = new Perlin(2, 1);
		var out = new Vector<F32>(6 * 4);
		var x0:F32 = -1.5;
		var y0:F32 = 2.25;
		var step:F32 = 0.4;
		Batch.grid(perlin, out, x0, y0, step, 6, 4);
		var mismatches = 0;
		for (j in 0...4) {
			for (i in 0...6) {
				var y:F32 = y0 + j * step;
				var x:F32 = x0 + i * step;
				if (out[j * 6 + i] != perlin.value(x, y)) mismatches++;
			}
		}
		Assert.equals(0, mismatches);
	}
}
