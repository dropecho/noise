package noise;

import utest.Assert;
import dropecho.noise.Billow;
import dropecho.noise.Ridged;
import dropecho.noise.Simplex;
import dropecho.noise.Voronoi;
import dropecho.noise.Worley;

class GeneratorTests extends utest.Test {
	static inline final X:Float = 1.5;
	static inline final Y:Float = 2.3;

	// Simplex
	public function test_simplex_nonzero() {
		Assert.notEquals(0.0, new Simplex(1, 1).value(X, Y));
	}

	public function test_simplex_deterministic() {
		var s = new Simplex(1, 1);
		Assert.floatEquals(s.value(X, Y), s.value(X, Y));
	}

	public function test_simplex_octaves_change_output() {
		Assert.notEquals(new Simplex(1, 1).value(X, Y), new Simplex(4, 1).value(X, Y));
	}

	// Voronoi
	public function test_voronoi_euclidian_in_range() {
		var v = new Voronoi(1, Euclidian).value(X, Y);
		Assert.isTrue(v >= -1.0 && v <= 1.0);
	}

	public function test_voronoi_manhattan_in_range() {
		var v = new Voronoi(1, Manhattan).value(X, Y);
		Assert.isTrue(v >= -1.0 && v <= 1.0);
	}

	public function test_voronoi_chebyshev_in_range() {
		var v = new Voronoi(1, Chebyshev).value(X, Y);
		Assert.isTrue(v >= -1.0 && v <= 1.0);
	}

	public function test_voronoi_euclidian_deterministic() {
		var v = new Voronoi(1, Euclidian);
		Assert.floatEquals(v.value(X, Y), v.value(X, Y));
	}

	public function test_voronoi_distance_types_differ_over_grid() {
		var eucl = new Voronoi(1, Euclidian);
		var manh = new Voronoi(1, Manhattan);
		var diffs = 0;
		for (i in 0...8) {
			for (j in 0...8) {
				if (eucl.value(i * 0.13 + 0.05, j * 0.13 + 0.05) != manh.value(i * 0.13 + 0.05, j * 0.13 + 0.05))
					diffs++;
			}
		}
		Assert.isTrue(diffs > 0);
	}

	// Worley
	public function test_worley_in_range() {
		var v = new Worley(1).value(X, Y);
		Assert.isTrue(v >= -1.0 && v <= 1.0);
	}

	public function test_worley_deterministic() {
		var w = new Worley(1);
		Assert.floatEquals(w.value(X, Y), w.value(X, Y));
	}

	public function test_worley_nonzero() {
		Assert.notEquals(0.0, new Worley(1).value(X, Y));
	}

	// Billow
	public function test_billow_nonnegative() {
		var b = new Billow(1, 1);
		for (i in 0...20) {
			Assert.isTrue(b.value(i * 0.3, i * 0.17) >= 0);
		}
	}

	public function test_billow_octaves_change_output() {
		Assert.notEquals(new Billow(1, 1).value(X, Y), new Billow(4, 1).value(X, Y));
	}

	// Ridged
	public function test_ridged_nonzero() {
		Assert.notEquals(0.0, new Ridged(1, 1).value(X, Y));
	}

	public function test_ridged_octaves_change_output() {
		Assert.notEquals(new Ridged(1, 1).value(X, Y), new Ridged(4, 1).value(X, Y));
	}
}
