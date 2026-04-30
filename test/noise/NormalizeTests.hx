package noise;

import utest.Assert;
import dropecho.noise.Constant;
import dropecho.noise.Normalize;

class NormalizeTests extends utest.Test {
	public function test_remaps_to_zero_one() {
		// [-1,1] → [0,1]: value 0.0 should map to 0.5
		var n = new Normalize(new Constant(0.0), -1, 1, 0, 1);
		Assert.floatEquals(0.5, n.value(0, 0));
	}

	public function test_remaps_max() {
		var n = new Normalize(new Constant(1.0), -1, 1, 0, 1);
		Assert.floatEquals(1.0, n.value(0, 0));
	}

	public function test_remaps_min() {
		var n = new Normalize(new Constant(-1.0), -1, 1, 0, 1);
		Assert.floatEquals(0.0, n.value(0, 0));
	}

	public function test_identity_with_defaults() {
		var n = new Normalize(new Constant(0.5));
		Assert.floatEquals(0.5, n.value(0, 0));
	}

	public function test_inverts_range() {
		// Map [-1,1] to [1,-1] — inverting the range
		var n = new Normalize(new Constant(0.5), -1, 1, 1, -1);
		Assert.floatEquals(-0.5, n.value(0, 0));
	}
}
