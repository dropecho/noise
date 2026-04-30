package noise;

import utest.Assert;
import dropecho.noise.Perlin;
import dropecho.noise.FractalWarp;

class FractalWarpTests extends utest.Test {
	public function test_zero_strength_is_identity() {
		var perlin = new Perlin();
		var warp = new FractalWarp(perlin, 0, 1, 1);
		Assert.floatEquals(perlin.value(1.5, 2.3), warp.value(1.5, 2.3));
	}

	public function test_nonzero_strength_displaces() {
		var perlin = new Perlin();
		var warp = new FractalWarp(perlin, 10, 1, 1);
		Assert.notEquals(perlin.value(1.5, 2.3), warp.value(1.5, 2.3));
	}

	public function test_multiple_octaves_produce_finite_output() {
		var perlin = new Perlin();
		var warp = new FractalWarp(perlin, 1, 1, 3);
		for (i in 0...10) {
			var v = warp.value(i * 0.4, i * 0.6);
			Assert.isFalse(Math.isNaN(v));
		}
	}
}
