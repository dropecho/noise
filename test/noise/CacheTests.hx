package noise;

import utest.Assert;
import dropecho.noise.Cache;
import dropecho.noise.IModule2D;
import dropecho.noise.Perlin;

class CacheTests extends utest.Test {
	public function test_cache_returns_same_value() {
		var cache = new Cache(new Perlin());
		var first = cache.value(1.5, 2.3);
		var second = cache.value(1.5, 2.3);
		Assert.equals(first, second);
	}

	public function test_cache_same_coord_returns_identical_reference() {
		var cache = new Cache(new Perlin());
		var v1 = cache.value(3.14, 7.77);
		var v2 = cache.value(3.14, 7.77);
		var v3 = cache.value(3.15, 7.77);
		Assert.equals(v1, v2);
		Assert.notEquals(v1, v3);
	}

	public function test_cache_different_coords_differ() {
		var cache = new Cache(new Perlin());
		var a = cache.value(0.1, 0.2);
		var b = cache.value(0.3, 0.4);
		Assert.notEquals(a, b);
	}
}
