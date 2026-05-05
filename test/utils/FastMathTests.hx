package utils;

import utest.Assert;
import dropecho.utils.FastMath;

class FastMathTests extends utest.Test {
	public function test_floor_positive_fractional() {
		Assert.equals(1, FastMath.floor(1.7));
	}

	public function test_floor_positive_exact() {
		Assert.equals(1, FastMath.floor(1.0));
	}

	public function test_floor_zero() {
		Assert.equals(0, FastMath.floor(0.0));
	}

	public function test_floor_negative_fractional() {
		Assert.equals(-2, FastMath.floor(-1.5));
	}

	public function test_floor_negative_exact() {
		Assert.equals(-1, FastMath.floor(-1.0));
	}

	public function test_ceil_positive_fractional() {
		Assert.equals(2, FastMath.ceil(1.5));
	}

	public function test_ceil_positive_exact() {
		Assert.equals(1, FastMath.ceil(1.0));
	}

	public function test_ceil_zero() {
		Assert.equals(0, FastMath.ceil(0.0));
	}

	public function test_ceil_negative_fractional() {
		Assert.equals(-1, FastMath.ceil(-1.5));
	}

	public function test_ceil_negative_exact() {
		Assert.equals(-1, FastMath.ceil(-1.0));
	}

	public function test_round_half_up() {
		Assert.equals(1, FastMath.round(0.5));
	}

	public function test_round_negative_half() {
		Assert.equals(-1, FastMath.round(-0.5));
	}

	public function test_round_negative_exact() {
		Assert.equals(-1, FastMath.round(-1.0));
	}

	public function test_round_positive_exact() {
		Assert.equals(2, FastMath.round(2.0));
	}
}
