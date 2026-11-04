package noise;

import haxe.ds.Vector;
import utest.Assert;
import dropecho.noise.*;
import dropecho.utils.FastMath.F32;

class BatchTests extends utest.Test {
	static inline final COUNT = 300;

	function modules():Array<{name:String, module:IModule2D}> {
		var perlin = new Perlin(1, 0.7);
		return [
			{name: "Perlin", module: perlin},
			{name: "Perlin x4", module: new Perlin(4, 1.3)},
			{name: "Clamp", module: new Clamp(new Perlin(3, 1), -0.2, 0.3)},
			{name: "Add", module: new Add(perlin, new Simplex(2, 1))},
			{name: "TranslatePoint", module: new TranslatePoint(perlin, 0.37, -1.91)},
			{name: "nested", module: new Clamp(new Add(new TranslatePoint(new Perlin(2, 1), 3.3, 0.1), perlin), -0.5, 0.5)},
			{name: "fallback (Simplex)", module: new Simplex(2, 1)},
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
