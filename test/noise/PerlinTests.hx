package noise;

import dropecho.noise.Voronoi;
import utest.Assert;
import dropecho.noise.Perlin;

class PerlinTests extends utest.Test {
	public function test_perlin() {
		var perlin = new Perlin();
		var noise = perlin.value(0, 1.4);
		Assert.notEquals(noise, 0);
	}
}
