package noise;

import utest.Assert;
import dropecho.noise.Constant;
import dropecho.noise.ScaleBias;

class ScaleBiasTests extends utest.Test {
	public function test_scale() {
		var sb = new ScaleBias(new Constant(0.5), 2, 0);
		Assert.floatEquals(1.0, sb.value(0, 0));
	}

	public function test_bias() {
		var sb = new ScaleBias(new Constant(0.0), 1, 0.5);
		Assert.floatEquals(0.5, sb.value(0, 0));
	}

	public function test_scale_and_bias() {
		var sb = new ScaleBias(new Constant(0.5), 2, 1);
		Assert.floatEquals(2.0, sb.value(0, 0));
	}

	public function test_defaults_are_identity() {
		var sb = new ScaleBias(new Constant(0.75));
		Assert.floatEquals(0.75, sb.value(0, 0));
	}
}
