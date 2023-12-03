package noise;

import dropecho.noise.Voronoi;
import utest.Assert;
import dropecho.noise.Perlin;

class BenchmarkTests extends utest.Test {
	#if (sys || nodejs)
	public function test_perlin_benchmark() {
		var noise = new Perlin();
		var start = Sys.cpuTime();

		for (i in 0...500_000) {
			noise.value(0, 1.4);
		}
		var end = Sys.cpuTime();

		trace('perlin total ${end - start}');

		Assert.notEquals(end - start, 0);
	}

	public function test_voronoi_benchmark() {
		var noise = new Voronoi(0.1, DistanceType.Euclidian);
		var start = Sys.cpuTime();

		for (i in 0...500_000) {
			noise.value(0, 1.4);
		}
		var end = Sys.cpuTime();
		trace('Voronoi total ${end - start}');

		Assert.notEquals(end - start, 0);
	}
	#end
}
