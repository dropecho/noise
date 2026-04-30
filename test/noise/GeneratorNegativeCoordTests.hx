package noise;

import utest.Assert;
import dropecho.noise.CheckerBoard;
import dropecho.noise.Cones;
import dropecho.noise.Cylinders;

// Verifies that generators using floor() handle negative coordinates correctly.
// Std.int() truncates toward zero (-0.5 → 0), floor() rounds down (-0.5 → -1).
class GeneratorNegativeCoordTests extends utest.Test {
	public function test_checkerboard_symmetric_around_origin() {
		var cb = new CheckerBoard(1);
		// (0.5, 0.5) and (-0.5, -0.5) are in adjacent-diagonal cells — same colour
		Assert.equals(cb.value(0.5, 0.5), cb.value(-0.5, -0.5));
		// (0.5, 0.5) and (-0.5, 0.5) are in horizontally adjacent cells — opposite colour
		Assert.notEquals(cb.value(0.5, 0.5), cb.value(-0.5, 0.5));
	}

	public function test_checkerboard_output_only_one_or_neg_one() {
		var cb = new CheckerBoard(1);
		for (i in 0...10) {
			var v = cb.value(i * 0.5 - 2.5, i * 0.3 - 1.5);
			Assert.isTrue(v == 1 || v == -1);
		}
	}

	public function test_cones_finite_for_negative_coords() {
		var c = new Cones(1);
		for (i in 0...10) {
			var v = c.value(-i * 0.7, -i * 0.4);
			Assert.isFalse(Math.isNaN(v));
		}
	}

	public function test_cylinders_finite_for_negative_coords() {
		var c = new Cylinders(1);
		for (i in 0...10) {
			var v = c.value(-i * 0.7, i * 0.4);
			Assert.isFalse(Math.isNaN(v));
		}
	}
}
