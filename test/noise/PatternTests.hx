package noise;

import utest.Assert;
import dropecho.noise.CheckerBoard;
import dropecho.noise.Cones;
import dropecho.noise.Cylinders;

class PatternTests extends utest.Test {
	// CheckerBoard
	public function test_checkerboard_cell_0_0_is_one() {
		Assert.floatEquals(1.0, new CheckerBoard(1).value(0.5, 0.5));
	}

	public function test_checkerboard_cell_1_0_is_neg_one() {
		Assert.floatEquals(-1.0, new CheckerBoard(1).value(1.5, 0.5));
	}

	public function test_checkerboard_cell_1_1_is_one() {
		Assert.floatEquals(1.0, new CheckerBoard(1).value(1.5, 1.5));
	}

	public function test_checkerboard_only_returns_one_or_neg_one() {
		var cb = new CheckerBoard(1);
		for (i in 0...10) {
			var v = cb.value(i * 0.3, i * 0.17);
			Assert.isTrue(v == 1.0 || v == -1.0);
		}
	}

	// Cones
	public function test_cones_peak_at_cell_center() {
		Assert.floatEquals(1.0, new Cones(1).value(0.5, 0.5));
	}

	public function test_cones_decreases_from_center() {
		var c = new Cones(1);
		Assert.isTrue(c.value(0.5, 0.5) > c.value(0.7, 0.5));
	}

	// Cylinders
	public function test_cylinders_output_nonnegative() {
		var cyl = new Cylinders(1);
		for (i in 0...20) {
			Assert.isTrue(cyl.value(i * 0.1, 0) >= 0);
		}
	}

	public function test_cylinders_peak_at_cell_center() {
		Assert.floatEquals(1.0, new Cylinders(1).value(0.5, 0));
	}

	public function test_cylinders_ignores_y() {
		var cyl = new Cylinders(1);
		Assert.floatEquals(cyl.value(0.3, 0), cyl.value(0.3, 99));
	}
}
