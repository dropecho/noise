package noise;

import utest.Assert;
import dropecho.noise.Spheres;

class SpheresTests extends utest.Test {
	public function test_origin_is_on_ring_surface() {
		var s = new Spheres(1);
		// dist = 0, fractional = 0, output = 1 - 4*0.5 = -1
		// Actually at origin, dist=0, frac=0, output = 1-4*abs(0-0.5) = 1-2 = -1
		Assert.floatEquals(-1.0, s.value(0, 0));
	}

	public function test_output_in_range() {
		var s = new Spheres(1);
		for (i in 0...50) {
			var v = s.value(i * 0.37, i * 0.19);
			Assert.isTrue(v >= -1.0 && v <= 1.0);
		}
	}

	public function test_frequency_scales_rings() {
		var s1 = new Spheres(1);
		var s2 = new Spheres(2);
		// At the same point, doubling frequency should match querying s1 at double distance
		Assert.floatEquals(s1.value(2.0, 0), s2.value(1.0, 0));
	}
}
