package noise;

import utest.Assert;
import dropecho.noise.Perlin;
import dropecho.noise.TranslatePoint;

class TranslatePointTests extends utest.Test {
	public function test_zero_translation_is_identity() {
		var perlin = new Perlin();
		var translated = new TranslatePoint(perlin, 0, 0);
		Assert.floatEquals(perlin.value(1.5, 2.3), translated.value(1.5, 2.3));
	}

	public function test_dx_shifts_x_coordinate() {
		var perlin = new Perlin();
		var translated = new TranslatePoint(perlin, 10, 0);
		Assert.floatEquals(perlin.value(11.5, 2.3), translated.value(1.5, 2.3));
	}

	public function test_dy_shifts_y_coordinate() {
		var perlin = new Perlin();
		var translated = new TranslatePoint(perlin, 0, 5);
		Assert.floatEquals(perlin.value(1.5, 7.3), translated.value(1.5, 2.3));
	}
}
