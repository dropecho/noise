package noise;

import utest.Assert;
import dropecho.noise.Perlin;
import dropecho.noise.RotatePoint;

class RotatePointTests extends utest.Test {
	public function test_zero_angle_is_identity() {
		var perlin = new Perlin();
		var rotated = new RotatePoint(perlin, 0);
		Assert.floatEquals(perlin.value(1.5, 2.3), rotated.value(1.5, 2.3));
	}

	public function test_quarter_turn_swaps_axes() {
		var perlin = new Perlin();
		var rotated = new RotatePoint(perlin, Math.PI / 2);
		// Rotating (1, 0) by 90deg gives (0, 1)
		Assert.floatEquals(perlin.value(0, 1), rotated.value(1, 0));
	}

	public function test_half_turn_negates_coords() {
		var perlin = new Perlin();
		var rotated = new RotatePoint(perlin, Math.PI);
		// Rotating (1, 0) by 180deg gives (-1, 0)
		Assert.floatEquals(perlin.value(-1, 0), rotated.value(1, 0));
	}
}
