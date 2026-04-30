package noise;

import utest.Assert;
import dropecho.noise.Constant;
import dropecho.noise.Threshold;

class ThresholdTests extends utest.Test {
	public function test_above_cutoff_returns_one() {
		var t = new Threshold(new Constant(0.5), 0.0);
		Assert.floatEquals(1.0, t.value(0, 0));
	}

	public function test_below_cutoff_returns_neg_one() {
		var t = new Threshold(new Constant(-0.5), 0.0);
		Assert.floatEquals(-1.0, t.value(0, 0));
	}

	public function test_at_cutoff_returns_one() {
		var t = new Threshold(new Constant(0.5), 0.5);
		Assert.floatEquals(1.0, t.value(0, 0));
	}

	public function test_output_is_always_binary() {
		var perlin = new dropecho.noise.Perlin();
		var t = new Threshold(perlin, 0.0);
		for (i in 0...20) {
			var v = t.value(i * 0.3, i * 0.7);
			Assert.isTrue(v == 1.0 || v == -1.0);
		}
	}
}
