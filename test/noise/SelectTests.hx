package noise;

import utest.Assert;
import dropecho.noise.Constant;
import dropecho.noise.Select;

class SelectTests extends utest.Test {
	public function test_below_threshold_returns_a() {
		var s = new Select(new Constant(1.0), new Constant(-1.0), new Constant(-0.5), 0, 0);
		Assert.floatEquals(1.0, s.value(0, 0));
	}

	public function test_above_threshold_returns_b() {
		var s = new Select(new Constant(1.0), new Constant(-1.0), new Constant(0.5), 0, 0);
		Assert.floatEquals(-1.0, s.value(0, 0));
	}

	public function test_falloff_blends_at_boundary() {
		var s = new Select(new Constant(-1.0), new Constant(1.0), new Constant(0.0), 0, 0.5);
		var v = s.value(0, 0);
		// Control is exactly at threshold midpoint, result should be blended
		Assert.isTrue(v > -1.0 && v < 1.0);
	}

	public function test_falloff_below_range_returns_a() {
		var s = new Select(new Constant(1.0), new Constant(-1.0), new Constant(-1.0), 0, 0.1);
		Assert.floatEquals(1.0, s.value(0, 0));
	}

	public function test_falloff_above_range_returns_b() {
		var s = new Select(new Constant(1.0), new Constant(-1.0), new Constant(1.0), 0, 0.1);
		Assert.floatEquals(-1.0, s.value(0, 0));
	}
}
