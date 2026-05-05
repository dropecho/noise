package noise;

import utest.Assert;
import dropecho.noise.Abs;
import dropecho.noise.Add;
import dropecho.noise.Blend;
import dropecho.noise.CheckerBoard;
import dropecho.noise.Clamp;
import dropecho.noise.Constant;
import dropecho.noise.Displace;
import dropecho.noise.Max;
import dropecho.noise.Min;
import dropecho.noise.Multiply;
import dropecho.noise.Pow;
import dropecho.noise.Scale;
import dropecho.noise.Sub;

class CombinatorTests extends utest.Test {
	// Constant
	public function test_constant_ignores_coords() {
		Assert.floatEquals(0.5, new Constant(0.5).value(0, 0));
		Assert.floatEquals(0.5, new Constant(0.5).value(99, -50));
	}

	// Abs
	public function test_abs_flips_negative() {
		Assert.floatEquals(0.7, new Abs(new Constant(-0.7)).value(0, 0));
	}

	public function test_abs_preserves_positive() {
		Assert.floatEquals(0.3, new Abs(new Constant(0.3)).value(0, 0));
	}

	// Add
	public function test_add_sums_inputs() {
		Assert.floatEquals(0.7, new Add(new Constant(0.3), new Constant(0.4)).value(0, 0));
	}

	// Sub
	public function test_sub_subtracts_inputs() {
		Assert.floatEquals(0.3, new Sub(new Constant(0.5), new Constant(0.2)).value(0, 0));
	}

	// Multiply
	public function test_multiply_products_inputs() {
		Assert.floatEquals(0.2, new Multiply(new Constant(0.5), new Constant(0.4)).value(0, 0));
	}

	public function test_multiply_by_zero() {
		Assert.floatEquals(0.0, new Multiply(new Constant(0.9), new Constant(0)).value(0, 0));
	}

	// Max
	public function test_max_returns_larger() {
		Assert.floatEquals(0.7, new Max(new Constant(0.3), new Constant(0.7)).value(0, 0));
		Assert.floatEquals(0.7, new Max(new Constant(0.7), new Constant(0.3)).value(0, 0));
	}

	// Min
	public function test_min_returns_smaller() {
		Assert.floatEquals(0.3, new Min(new Constant(0.3), new Constant(0.7)).value(0, 0));
		Assert.floatEquals(0.3, new Min(new Constant(0.7), new Constant(0.3)).value(0, 0));
	}

	// Clamp
	public function test_clamp_above_max() {
		Assert.floatEquals(1.0, new Clamp(new Constant(2.0)).value(0, 0));
	}

	public function test_clamp_below_min() {
		Assert.floatEquals(-1.0, new Clamp(new Constant(-2.0)).value(0, 0));
	}

	public function test_clamp_passes_through_in_range() {
		Assert.floatEquals(0.5, new Clamp(new Constant(0.5), -1, 1).value(0, 0));
	}

	// Pow
	public function test_pow_raises_to_power() {
		Assert.floatEquals(8.0, new Pow(new Constant(2.0), new Constant(3.0)).value(0, 0));
	}

	// Blend
	public function test_blend_lerps_at_half() {
		Assert.floatEquals(0.5, new Blend(new Constant(0.0), new Constant(1.0), new Constant(0.5)).value(0, 0));
	}

	public function test_blend_at_zero_returns_from() {
		Assert.floatEquals(0.2, new Blend(new Constant(0.2), new Constant(0.8), new Constant(0)).value(0, 0));
	}

	public function test_blend_at_one_returns_to() {
		Assert.floatEquals(0.8, new Blend(new Constant(0.2), new Constant(0.8), new Constant(1)).value(0, 0));
	}

	// Scale
	public function test_scale_modifies_sample_coords() {
		var src = new CheckerBoard(1);
		var scaled = new Scale(src, 2);
		// Scale(2) samples at (x*2, y*2)
		Assert.equals(src.value(1.2, 0), scaled.value(0.6, 0));
	}

	// Displace
	public function test_displace_zero_passes_through() {
		var src = new CheckerBoard(1);
		var d = new Displace(src, new Constant(0), new Constant(0));
		Assert.equals(src.value(0.3, 0.3), d.value(0.3, 0.3));
	}

	public function test_displace_shifts_coords() {
		var src = new CheckerBoard(1);
		// 0.004 * power(100) = 0.4 shift: samples src at x+0.4
		// src at (0.7,0) = cell (0,0) → 1; src at (1.1,0) = cell (1,0) → -1
		var d = new Displace(src, new Constant(0.004), new Constant(0));
		Assert.notEquals(src.value(0.7, 0), d.value(0.7, 0));
	}
}
