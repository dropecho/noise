package noise;

import utest.Assert;
import dropecho.noise.Constant;
import dropecho.noise.Terrace;
import dropecho.noise.ControlPoint;

class TerraceTests extends utest.Test {
	public function test_snaps_value_in_range() {
		var t = new Terrace(new Constant(-0.5), [{min: -1.0, max: 0.0, val: -0.25}]);
		Assert.floatEquals(-0.25, t.value(0, 0));
	}

	public function test_passes_through_unmatched() {
		var t = new Terrace(new Constant(0.5), [{min: -1.0, max: 0.0, val: -0.25}]);
		Assert.floatEquals(0.5, t.value(0, 0));
	}

	public function test_empty_points_passes_through() {
		Assert.floatEquals(0.3, new Terrace(new Constant(0.3), []).value(0, 0));
	}

	public function test_null_points_passes_through() {
		Assert.floatEquals(0.3, new Terrace(new Constant(0.3), null).value(0, 0));
	}

	public function test_max_is_exclusive() {
		// v == max should NOT snap
		var t = new Terrace(new Constant(0.0), [{min: -1.0, max: 0.0, val: -0.5}]);
		Assert.floatEquals(0.0, t.value(0, 0));
	}

	public function test_min_is_inclusive() {
		var t = new Terrace(new Constant(-1.0), [{min: -1.0, max: 0.0, val: -0.5}]);
		Assert.floatEquals(-0.5, t.value(0, 0));
	}

	public function test_multiple_control_points_route_correctly() {
		var pts:Array<ControlPoint> = [
			{min: -1.0, max: -0.5, val: -0.75},
			{min: -0.5, max: 0.0, val: -0.25},
			{min: 0.0, max: 0.5, val: 0.25},
			{min: 0.5, max: 1.0, val: 0.75},
		];
		Assert.floatEquals(-0.75, new Terrace(new Constant(-0.8), pts).value(0, 0));
		Assert.floatEquals(-0.25, new Terrace(new Constant(-0.3), pts).value(0, 0));
		Assert.floatEquals(0.25, new Terrace(new Constant(0.1), pts).value(0, 0));
		Assert.floatEquals(0.75, new Terrace(new Constant(0.6), pts).value(0, 0));
	}
}
