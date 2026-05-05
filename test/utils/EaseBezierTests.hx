package utils;

import utest.Assert;
import dropecho.utils.MathUtils;

class EaseBezierTests extends utest.Test {
	public function test_t0_returns_p0() {
		Assert.floatEquals(0.0, MathUtils.easeBezier(0, 0, 0.5, 0.5, 1));
	}

	public function test_t1_returns_p3() {
		Assert.floatEquals(1.0, MathUtils.easeBezier(1, 0, 0.5, 0.5, 1));
	}

	public function test_linear_control_points_give_linear_output() {
		// With p0=0, p1=1/3, p2=2/3, p3=1 the bezier is linear
		Assert.floatEquals(0.5, MathUtils.easeBezier(0.5, 0, 1.0 / 3.0, 2.0 / 3.0, 1));
	}

	public function test_output_clamped_to_zero_one() {
		// Even with out-of-range t the result is clamped
		Assert.floatEquals(0.0, MathUtils.easeBezier(-1, 0, 0.5, 0.5, 1));
		Assert.floatEquals(1.0, MathUtils.easeBezier(2, 0, 0.5, 0.5, 1));
	}

	public function test_symmetric_curve_is_symmetric() {
		// p0=0, p1=0, p2=1, p3=1 — ease-in-out shape, symmetric around t=0.5
		var lo = MathUtils.easeBezier(0.25, 0, 0, 1, 1);
		var hi = MathUtils.easeBezier(0.75, 0, 0, 1, 1);
		Assert.floatEquals(1.0 - lo, hi);
	}
}
