package noise;

import utest.Assert;
import dropecho.noise.Perlin;
import dropecho.noise.Turbulence;

class TurbulenceTests extends utest.Test {
	public function test_zero_power_is_identity() {
		var perlin = new Perlin();
		var turb = new Turbulence(perlin, 0, 1);
		Assert.floatEquals(perlin.value(1.5, 2.3), turb.value(1.5, 2.3));
	}

	public function test_nonzero_power_displaces() {
		var perlin = new Perlin();
		var turb = new Turbulence(perlin, 10, 1);
		// With large power, result should differ from unperturbed sample
		Assert.notEquals(perlin.value(1.5, 2.3), turb.value(1.5, 2.3));
	}

	public function test_output_is_finite() {
		var perlin = new Perlin();
		var turb = new Turbulence(perlin, 1, 1);
		for (i in 0...10) {
			var v = turb.value(i * 0.5, i * 0.3);
			Assert.isFalse(Math.isNaN(v));
		}
	}
}
