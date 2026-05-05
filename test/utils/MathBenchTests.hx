package utils;

import dropecho.noise.Simplex;
import dropecho.noise.Worley;
import dropecho.noise.IModule2D;
import dropecho.noise.Voronoi;
import utest.Assert;
import dropecho.noise.Perlin;
import dropecho.utils.FastMath;

class MathBenchTests extends utest.Test {
	#if (sys || nodejs)
	function benchmark(func:(index:F32) -> Void) {
		var start = Sys.cpuTime();

		for (i in 0...100_000_000) {
			func(i);
		}

		var end = Sys.cpuTime();

		return end - start;
	}

	public function test_zzz_benchmark() {
		var time = benchmark((index:F32) -> {
			var x = index + 2;
		});
		Assert.notEquals(time, 0);
	}

	public function test_max_benchmark() {
		var time = benchmark((index:F32) -> {
			Math.max(0, index);
		});
		trace('Math max\n time: ${time}');
		Assert.notEquals(time, 0);

		var time = benchmark((index:F32) -> {
			FastMath.max(0, index);
		});
		trace('FastMath max\n time: ${time}');
		Assert.notEquals(time, 0);
	}

	public function test_min_benchmark() {
		var time = benchmark((index:F32) -> {
			Math.min(0, index);
		});
		trace('Math min\n time: ${time}');
		Assert.notEquals(time, 0);

		var time = benchmark((index:F32) -> {
			FastMath.min(0, index);
		});
		trace('FastMath min\n time: ${time}');
		Assert.notEquals(time, 0);
	}
	#end
}
