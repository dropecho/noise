package noise;

import dropecho.noise.Billow;
import dropecho.noise.IModule2D;
import dropecho.noise.Ridged;
import dropecho.noise.Simplex;
import dropecho.noise.Worley;
import dropecho.noise.Voronoi;
import dropecho.noise.Perlin;
import utest.Assert;

class BenchmarkTests extends utest.Test {
	#if (sys || nodejs)
	static inline final SIZE = 512;

	function benchmark(module:IModule2D) {
		var start = Sys.cpuTime();
		var min:Float = 99999;
		var max:Float = -99999;

		for (x in 0...SIZE) {
			for (y in 0...SIZE) {
				var val = module.value(x / SIZE, y / SIZE);
				if (val < min)
					min = val;
				if (val > max)
					max = val;
			}
		}

		return {time: Sys.cpuTime() - start, min: min, max: max};
	}

	public function test_aaa_perlin() {
		var r = benchmark(new Perlin(1, 1));
		trace('Perlin (1 octave)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min < 0 && r.max > 0);
	}

	public function test_aab_perlin_octaves() {
		var r = benchmark(new Perlin(4, 1));
		trace('Perlin (4 octaves)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min < 0 && r.max > 0);
	}

	public function test_baa_simplex() {
		var r = benchmark(new Simplex(1, 1));
		trace('Simplex (1 octave)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min < 0 && r.max > 0);
	}

	public function test_bab_simplex_octaves() {
		var r = benchmark(new Simplex(4, 1));
		trace('Simplex (4 octaves)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min < 0 && r.max > 0);
	}

	public function test_caa_voronoi_euclidian() {
		var r = benchmark(new Voronoi(1, Euclidian));
		trace('Voronoi (Euclidian)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min < 0 && r.max > 0);
	}

	public function test_cab_voronoi_manhattan() {
		var r = benchmark(new Voronoi(1, Manhattan));
		trace('Voronoi (Manhattan)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min < 0 && r.max > 0);
	}

	public function test_cac_voronoi_chebyshev() {
		var r = benchmark(new Voronoi(1, Chebyshev));
		trace('Voronoi (Chebyshev)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min < 0 && r.max > 0);
	}

	public function test_daa_worley() {
		var r = benchmark(new Worley(1));
		trace('Worley\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_eaa_billow() {
		var r = benchmark(new Billow(1, 1));
		trace('Billow (1 octave)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min >= 0);
	}

	public function test_eab_billow_octaves() {
		var r = benchmark(new Billow(4, 1));
		trace('Billow (4 octaves)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min >= 0);
	}

	public function test_faa_ridged() {
		var r = benchmark(new Ridged(1, 1));
		trace('Ridged (1 octave)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_fab_ridged_octaves() {
		var r = benchmark(new Ridged(4, 1));
		trace('Ridged (4 octaves)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_zzz_voronoi_vs_simplex_jitter() {
		// Old Voronoi made 9+1 Simplex calls per value(). The optimized version
		// uses a cheap integer hash instead. Assert it beats 9x Simplex cost.
		var simplex = new Simplex(1, 1);
		var voronoi = new Voronoi(1, Euclidian);

		var simplexTime = benchmark(simplex).time;
		var voronoiTime = benchmark(voronoi).time;
		var oldEstimate = simplexTime * 10;
		var speedup = Math.round(oldEstimate / voronoiTime * 10) / 10;

		trace('Simplex 1-octave (single call cost)\n time: ${simplexTime}');
		trace('Old Voronoi estimate (10x Simplex)\n time: ${oldEstimate}');
		trace('Voronoi (hash jitter)\n time: ${voronoiTime}');
		trace('Speedup vs old approach: ~${speedup}x');

		Assert.isTrue(voronoiTime < simplexTime * 9);
	}
	#end
}
