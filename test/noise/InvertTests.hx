package noise;

import utest.Assert;
import dropecho.noise.Constant;
import dropecho.noise.Invert;
import dropecho.noise.Perlin;

class InvertTests extends utest.Test {
	public function test_invert_negates_constant() {
		var inverted = new Invert(new Constant(0.5));
		Assert.floatEquals(-0.5, inverted.value(0, 0));
	}

	public function test_invert_negates_negative() {
		var inverted = new Invert(new Constant(-0.75));
		Assert.floatEquals(0.75, inverted.value(0, 0));
	}

	public function test_invert_mirrors_perlin() {
		var perlin = new Perlin();
		var inverted = new Invert(perlin);
		Assert.floatEquals(-perlin.value(1.5, 2.3), inverted.value(1.5, 2.3));
	}
}
