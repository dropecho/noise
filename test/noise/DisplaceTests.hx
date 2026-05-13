package noise;

import utest.Assert;
import dropecho.noise.Constant;
import dropecho.noise.Displace;
import dropecho.noise.Perlin;

class DisplaceTests extends utest.Test {
	public function test_displaces_with_two_modules() {
		var d = new Displace(new Constant(0.5), new Perlin(), new Perlin());
		Assert.notEquals(Math.NaN, d.value(0, 0));
	}

	public function test_single_module_used_for_both_axes() {
		var xMod = new Perlin();
		var d = new Displace(new Constant(0.5), xMod);
		Assert.notEquals(Math.NaN, d.value(0, 0));
	}

	public function test_single_module_produces_same_result_as_symmetric_two_module() {
		var xMod = new Perlin();
		var single = new Displace(new Constant(0.5), xMod);
		var two = new Displace(new Constant(0.5), xMod, xMod);
		Assert.floatEquals(single.value(0.3, 0.7), two.value(0.3, 0.7));
	}
}
