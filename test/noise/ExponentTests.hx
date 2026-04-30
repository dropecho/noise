package noise;

import utest.Assert;
import dropecho.noise.Constant;
import dropecho.noise.Exponent;

class ExponentTests extends utest.Test {
	public function test_exp_one_is_identity() {
		var e = new Exponent(new Constant(0.5), 1);
		Assert.floatEquals(0.5, e.value(0, 0));
	}

	public function test_boundaries_are_preserved() {
		var eMax = new Exponent(new Constant(1.0), 2);
		var eMin = new Exponent(new Constant(-1.0), 2);
		Assert.floatEquals(1.0, eMax.value(0, 0));
		Assert.floatEquals(-1.0, eMin.value(0, 0));
	}

	public function test_exp_gt_one_pushes_toward_negative() {
		// pow(0.5, 2) = 0.25 → 0.25*2-1 = -0.5, which is less than input 0.0
		var e = new Exponent(new Constant(0.0), 2);
		Assert.isTrue(e.value(0, 0) < 0.0);
	}

	public function test_exp_lt_one_pushes_toward_positive() {
		// pow(0.5, 0.5) = 0.707 → 0.707*2-1 = 0.414, which is more than input 0.0
		var e = new Exponent(new Constant(0.0), 0.5);
		Assert.isTrue(e.value(0, 0) > 0.0);
	}
}
