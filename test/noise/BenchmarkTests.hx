package noise;

import dropecho.noise.Simplex;
import dropecho.noise.Worley;
import dropecho.noise.IModule2D;
import dropecho.noise.Voronoi;
import utest.Assert;
import dropecho.noise.Perlin;

class BenchmarkTests extends utest.Test {
	var points = [
		for (_ in 0...500_000)
			Math.random()
	];

	#if (sys || nodejs)
	function benchmark(module:IModule2D):Float {
		var start = Sys.cpuTime();

		for (point in points) {
			module.value(0, point);
		}
		var end = Sys.cpuTime();

		return end - start;
	}

	public function test_perlin_benchmark() {
		var time = benchmark(new Perlin());
		trace('Perlin total ${time}');
		Assert.notEquals(time, 0);
	}

	public function test_simplex_benchmark() {
		var time = benchmark(new Simplex());
		trace('Simplex total ${time}');
		Assert.notEquals(time, 0);
	}

	public function test_voronoi_benchmark() {
		var noise = new Voronoi(0.1, DistanceType.Euclidian);
		var time = benchmark(noise);
		trace('Voronoi total ${time}');
		Assert.notEquals(time, 0);
	}

	public function test_worley_benchmark() {
		var noise = new Worley(0.1);
		var time = benchmark(noise);
		trace('Worley total ${time}');
		Assert.notEquals(time, 0);
	}
	#end
}
