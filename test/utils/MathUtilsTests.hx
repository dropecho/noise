package utils;

import utest.Assert;
import dropecho.utils.MathUtils;

class MathUtilsTests extends utest.Test {
	public function test_map_min_to_min() {
		Assert.floatEquals(0.0, MathUtils.map(0.0, 0, 1, 0, 10));
	}

	public function test_map_max_to_max() {
		Assert.floatEquals(10.0, MathUtils.map(1.0, 0, 1, 0, 10));
	}

	public function test_map_midpoint() {
		Assert.floatEquals(5.0, MathUtils.map(0.5, 0, 1, 0, 10));
	}

	public function test_map_negative_input_range() {
		Assert.floatEquals(5.0, MathUtils.map(0.0, -1, 1, 0, 10));
	}

	public function test_map_negative_output_range() {
		Assert.floatEquals(-5.0, MathUtils.map(0.5, 0, 1, -10, 0));
	}

	public function test_mapEasing_identity_easing_equals_map() {
		var result = MathUtils.mapEasing(0.5, 0, 1, 0, 10, k -> k);
		Assert.floatEquals(5.0, result);
	}

	public function test_mapEasing_min_maps_to_toMin() {
		var result = MathUtils.mapEasing(0.0, 0, 1, 3, 7, k -> k);
		Assert.floatEquals(3.0, result);
	}

	public function test_mapEasing_max_maps_to_toMax() {
		var result = MathUtils.mapEasing(1.0, 0, 1, 3, 7, k -> k);
		Assert.floatEquals(7.0, result);
	}
}
