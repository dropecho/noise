package noise;

import utest.Assert;
import dropecho.noise.Constant;
import dropecho.noise.Curve;

class CurveTests extends utest.Test {
	public function test_empty_points_returns_raw_value() {
		var c = new Curve(new Constant(0.5), []);
		Assert.floatEquals(0.5, c.value(0, 0));
	}

	public function test_clamps_below_min_point() {
		var c = new Curve(new Constant(-2.0), [{input: -1.0, output: 0.0}, {input: 1.0, output: 1.0}]);
		Assert.floatEquals(0.0, c.value(0, 0));
	}

	public function test_clamps_above_max_point() {
		var c = new Curve(new Constant(2.0), [{input: -1.0, output: 0.0}, {input: 1.0, output: 1.0}]);
		Assert.floatEquals(1.0, c.value(0, 0));
	}

	public function test_linear_identity_curve() {
		var c = new Curve(new Constant(0.0), [
			{input: -1.0, output: -1.0},
			{input: 0.0, output: 0.0},
			{input: 1.0, output: 1.0}
		]);
		Assert.floatEquals(0.0, c.value(0, 0));
	}

	public function test_inverted_curve() {
		var c = new Curve(new Constant(0.0), [
			{input: -1.0, output: 1.0},
			{input: 0.0, output: 0.0},
			{input: 1.0, output: -1.0}
		]);
		Assert.floatEquals(0.0, c.value(0, 0));
	}

	public function test_value_in_upper_segment_advances_search() {
		var c = new Curve(new Constant(0.5), [
			{input: -1.0, output: -1.0},
			{input: 0.0, output: 0.0},
			{input: 1.0, output: 1.0}
		]);
		// 0.5 is between points[1] and points[2], forcing i++ to execute
		Assert.isTrue(c.value(0, 0) > 0.0 && c.value(0, 0) <= 1.0);
	}
}
