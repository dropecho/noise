package noise;

import dropecho.noise.Curve.CurvePoint;
import dropecho.noise.Terrace.ControlPoint;
import dropecho.utils.FastMath.F32;
import dropecho.noise.Abs;
import dropecho.noise.Add;
import dropecho.noise.Billow;
import dropecho.noise.Blend;
import dropecho.noise.Cache;
import dropecho.noise.CellularF2F1;
import dropecho.noise.CheckerBoard;
import dropecho.noise.Clamp;
import dropecho.noise.Cones;
import dropecho.noise.Constant;
import dropecho.noise.Curve;
import dropecho.noise.Cylinders;
import dropecho.noise.Displace;
import dropecho.noise.Exponent;
import dropecho.noise.FractalWarp;
import dropecho.noise.IModule2D;
import dropecho.noise.Invert;
import dropecho.noise.Max;
import dropecho.noise.Min;
import dropecho.noise.Multiply;
import dropecho.noise.Normalize;
import dropecho.noise.Perlin;
import dropecho.noise.Pow;
import dropecho.noise.Ridged;
import dropecho.noise.RotatePoint;
import dropecho.noise.Scale;
import dropecho.noise.ScaleBias;
import dropecho.noise.Select;
import dropecho.noise.Simplex;
import dropecho.noise.Spheres;
import dropecho.noise.Sub;
import dropecho.noise.Terrace;
import dropecho.noise.Threshold;
import dropecho.noise.TranslatePoint;
import dropecho.noise.Turbulence;
import dropecho.noise.Voronoi;
import dropecho.noise.Worley;
import utest.Assert;

class BenchmarkTests extends utest.Test {
	#if (RUN_BENCHMARKS && (sys || nodejs))
	static inline final SIZE = 512;
	// Spread samples over SPAN x SPAN lattice cells instead of a single [0,1) cell,
	// so perm-table lookups, cell hashing, and branches see realistic access patterns.
	static inline final SPAN = 32;

	function benchmark(module:IModule2D) {
		var start = Sys.cpuTime();
		var min:Float = 99999;
		var max:Float = -99999;

		for (x in 0...SIZE) {
			for (y in 0...SIZE) {
				var val = module.value(x * (SPAN / SIZE), y * (SPAN / SIZE));
				if (val < min)
					min = val;
				if (val > max)
					max = val;
			}
		}

		return {time: Sys.cpuTime() - start, min: min, max: max};
	}

	// ── Generators ──────────────────────────────────────────────────────────

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

	public function test_gaa_cellular_f2f1() {
		var r = benchmark(new CellularF2F1(1));
		trace('CellularF2F1\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	// ── Pattern generators ───────────────────────────────────────────────────

	public function test_haa_checkerboard() {
		var r = benchmark(new CheckerBoard(1));
		trace('CheckerBoard\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_hab_cones() {
		var r = benchmark(new Cones(1));
		trace('Cones\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_hac_cylinders() {
		var r = benchmark(new Cylinders(1));
		trace('Cylinders\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_had_spheres() {
		var r = benchmark(new Spheres(1));
		trace('Spheres\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_hae_constant() {
		var r = benchmark(new Constant(0.5));
		trace('Constant\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time >= 0);
	}

	// ── Combinators ──────────────────────────────────────────────────────────

	public function test_iaa_add() {
		var a = new Perlin(1, 1);
		var b = new Simplex(1, 1);
		var r = benchmark(new Add(a, b));
		trace('Add (Perlin + Simplex)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_iab_sub() {
		var a = new Perlin(1, 1);
		var b = new Simplex(1, 1);
		var r = benchmark(new Sub(a, b));
		trace('Sub (Perlin - Simplex)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_iac_multiply() {
		var a = new Perlin(1, 1);
		var b = new Simplex(1, 1);
		var r = benchmark(new Multiply(a, b));
		trace('Multiply (Perlin * Simplex)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_iad_blend() {
		var a = new Perlin(1, 1);
		var b = new Simplex(1, 1);
		var ctrl = new Voronoi(1, Euclidian);
		var r = benchmark(new Blend(a, b, ctrl));
		trace('Blend (Perlin->Simplex via Voronoi)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_iae_min() {
		var a = new Perlin(1, 1);
		var b = new Simplex(1, 1);
		var r = benchmark(new Min(a, b));
		trace('Min (Perlin, Simplex)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_iaf_max() {
		var a = new Perlin(1, 1);
		var b = new Simplex(1, 1);
		var r = benchmark(new Max(a, b));
		trace('Max (Perlin, Simplex)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_iag_select_hard() {
		var a = new Perlin(1, 1);
		var b = new Simplex(1, 1);
		var ctrl = new Voronoi(1, Euclidian);
		var r = benchmark(new Select(a, b, ctrl, 0, 0));
		trace('Select hard (no falloff)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_iah_select_falloff() {
		var a = new Perlin(1, 1);
		var b = new Simplex(1, 1);
		var ctrl = new Voronoi(1, Euclidian);
		var r = benchmark(new Select(a, b, ctrl, 0, 0.5));
		trace('Select with falloff (0.5)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	// ── Simple modifiers ─────────────────────────────────────────────────────

	public function test_jaa_abs() {
		var r = benchmark(new Abs(new Perlin(1, 1)));
		trace('Abs\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
		Assert.isTrue(r.min >= 0);
	}

	public function test_jab_clamp() {
		var r = benchmark(new Clamp(new Perlin(1, 1), -0.5, 0.5));
		trace('Clamp [-0.5, 0.5]\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_jac_invert() {
		var r = benchmark(new Invert(new Perlin(1, 1)));
		trace('Invert\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_jad_scale_bias() {
		var r = benchmark(new ScaleBias(new Perlin(1, 1), 2.0, 0.5));
		trace('ScaleBias (scale=2, bias=0.5)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_jae_scale() {
		var r = benchmark(new Scale(new Perlin(1, 1), 2.0));
		trace('Scale (s=2)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_jaf_threshold() {
		var r = benchmark(new Threshold(new Perlin(1, 1), 0.0));
		trace('Threshold (cutoff=0)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_jag_translate_point() {
		var r = benchmark(new TranslatePoint(new Perlin(1, 1), 0.5, 0.5));
		trace('TranslatePoint (0.5, 0.5)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_jah_normalize() {
		var r = benchmark(new Normalize(new Perlin(1, 1), -1, 1, 0, 1));
		trace('Normalize [-1,1] -> [0,1]\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_jai_rotate_point() {
		var r = benchmark(new RotatePoint(new Perlin(1, 1), Math.PI / 4));
		trace('RotatePoint (45°)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	// ── Control-point modifiers ──────────────────────────────────────────────

	public function test_kaa_curve() {
		var pts:Array<CurvePoint> = [
			{input: (-1.0 : F32), output: (-1.0 : F32)},
			{input: (-0.5 : F32), output: (-0.25 : F32)},
			{input: (0.0 : F32),  output: (0.0 : F32)},
			{input: (0.5 : F32),  output: (0.25 : F32)},
			{input: (1.0 : F32),  output: (1.0 : F32)},
		];
		var r = benchmark(new Curve(new Perlin(1, 1), pts));
		trace('Curve (5 control points)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_kab_terrace() {
		var pts:Array<ControlPoint> = [
			{min: (-1.0 : F32), max: (-0.5 : F32), val: (-0.75 : F32)},
			{min: (-0.5 : F32), max: (0.0 : F32),  val: (-0.25 : F32)},
			{min: (0.0 : F32),  max: (0.5 : F32),  val: (0.25 : F32)},
			{min: (0.5 : F32),  max: (1.0 : F32),  val: (0.75 : F32)},
		];
		var r = benchmark(new Terrace(new Perlin(1, 1), pts));
		trace('Terrace (4 steps)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_kac_exponent() {
		var r = benchmark(new Exponent(new Perlin(1, 1), 2.0));
		trace('Exponent (exp=2)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_kad_pow() {
		var a = new Perlin(1, 1);
		var b = new Constant(2.0);
		var r = benchmark(new Pow(a, b));
		trace('Pow (Perlin ^ Constant(2))\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_kae_displace() {
		var src = new Perlin(1, 1);
		var dx = new Simplex(1, 2);
		var dy = new Simplex(1, 3);
		var r = benchmark(new Displace(src, dx, dy));
		trace('Displace (Perlin displaced by 2 Simplex)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	// ── Complex modifiers ────────────────────────────────────────────────────

	public function test_lab_fractal_warp_1oct() {
		var r = benchmark(new FractalWarp(new Perlin(1, 1), 0.5, 2.0, 1));
		trace('FractalWarp (1 octave)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_lac_fractal_warp_3oct() {
		var r = benchmark(new FractalWarp(new Perlin(1, 1), 0.5, 2.0, 3));
		trace('FractalWarp (3 octaves)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	// Defined after FractalWarp so it runs first (utest reverses definition order),
	// warming up Simplex.noise() before the FractalWarp benchmarks execute.
	public function test_lad_turbulence() {
		var r = benchmark(new Turbulence(new Perlin(1, 1), 0.5, 2.0));
		trace('Turbulence (power=0.5, freq=2)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	// ── Cache ────────────────────────────────────────────────────────────────

	public function test_maa_cache_cold() {
		var perlin = new Perlin(1, 1);
		var cached = new Cache(perlin);
		var r = benchmark(cached);
		trace('Cache (cold, all misses)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time > 0);
	}

	public function test_mab_cache_warm() {
		var perlin = new Perlin(1, 1);
		var cached = new Cache(perlin);
		// Warm up the cache with a first pass.
		benchmark(cached);
		var r = benchmark(cached);
		trace('Cache (warm, all hits)\n time: ${r.time}\n range: [${r.min}, ${r.max}]');
		Assert.isTrue(r.time >= 0);
	}

	public function test_mac_cache_overhead_vs_raw() {
		var perlin = new Perlin(1, 1);
		var cached = new Cache(new Perlin(1, 1));

		var rawTime = benchmark(perlin).time;
		var coldTime = benchmark(cached).time;
		var warmTime = benchmark(cached).time;

		trace('Cache overhead comparison');
		trace(' Raw Perlin:     ${rawTime}');
		trace(' Cache (cold):   ${coldTime}');
		trace(' Cache (warm):   ${warmTime}');
		trace(' Cold overhead:  ${Math.round((coldTime / rawTime - 1) * 100)}%');
		trace(' Warm speedup:   ${Math.round(rawTime / warmTime * 10) / 10}x');

		Assert.isTrue(rawTime > 0);
	}

	// ── Comparison ───────────────────────────────────────────────────────────

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
