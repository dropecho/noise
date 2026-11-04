package;

import dropecho.noise.*;
import dropecho.noise.Curve.CurvePoint;
import dropecho.noise.Terrace.ControlPoint;
import dropecho.utils.FastMath.F32;

typedef BenchCase = {name:String, module:IModule2D};

/**
 * Times every noise module over a SIZE x SIZE grid and prints one line per module:
 * name, median milliseconds per grid, and checksums of the grid and of scattered
 * points (negative coordinates included). An optimization that changes a checksum
 * changed the output.
 */
class Bench {
	static final SIZE:Int = #if bench_size Std.parseInt(haxe.macro.Compiler.getDefine("bench_size")) #else 512 #end;
	// Samples cover SPAN x SPAN lattice cells, so tables and branches see varied input.
	static inline final SPAN = 32;
	static inline final REPEATS = 7;

	static function main() {
		var filter = Sys.args().length > 0 ? new EReg(Sys.args()[0], "i") : null;
		for (c in cases()) {
			if (filter != null && !filter.match(c.name)) continue;
			var r = measure(c.module);
			Sys.println('${pad(c.name, 28)}${pad(Std.string(Math.round(r.ms * 100) / 100), 10)}${r.checksum}/${scatter(c.module)}');
		}
	}

	/**
	 * Samples a module over the grid once to warm up, then REPEATS more times.
	 * @param module The module to time.
	 * @return The median time in milliseconds and the checksum of one pass.
	 */
	static function measure(module:IModule2D):{ms:Float, checksum:Float} {
		var checksum = sample(module);
		var times = [];
		for (_ in 0...REPEATS) {
			var start = haxe.Timer.stamp();
			sample(module);
			times.push((haxe.Timer.stamp() - start) * 1000);
		}
		times.sort(Reflect.compare);
		return {ms: times[REPEATS >> 1], checksum: checksum};
	}

	static function sample(module:IModule2D):Float {
		var step:Float = SPAN / SIZE;
		var sum:Float = 0;
		for (x in 0...SIZE) {
			for (y in 0...SIZE) {
				sum += module.value(x * step, y * step);
			}
		}
		return sum;
	}

	/**
	 * Sums a module's values at pseudo-random points in [-512, 512) on both axes.
	 * @param module The module to sample.
	 * @return The sum, as a checksum.
	 */
	static function scatter(module:IModule2D):Float {
		var seed:Float = 12345;
		inline function next():Float {
			// Park-Miller LCG in doubles: products stay below 2^53, so it is exact everywhere.
			seed = (seed * 16807) % 2147483647;
			return seed / 2147483647 * 1024 - 512;
		}
		var sum:Float = 0;
		for (_ in 0...65536) {
			sum += module.value(next(), next());
		}
		return sum;
	}

	static function pad(s:String, width:Int):String {
		return StringTools.rpad(s, " ", width);
	}

	static function cases():Array<BenchCase> {
		var curvePoints:Array<CurvePoint> = [
			{input: (-1.0 : F32), output: (-1.0 : F32)},
			{input: (-0.5 : F32), output: (-0.25 : F32)},
			{input: (0.0 : F32), output: (0.0 : F32)},
			{input: (0.5 : F32), output: (0.25 : F32)},
			{input: (1.0 : F32), output: (1.0 : F32)},
		];
		var terracePoints:Array<ControlPoint> = [
			{min: (-1.0 : F32), max: (-0.5 : F32), val: (-0.75 : F32)},
			{min: (-0.5 : F32), max: (0.0 : F32), val: (-0.25 : F32)},
			{min: (0.0 : F32), max: (0.5 : F32), val: (0.25 : F32)},
			{min: (0.5 : F32), max: (1.0 : F32), val: (0.75 : F32)},
		];
		var perlin = new Perlin(1, 1);
		var simplex = new Simplex(1, 1);
		var voronoi = new Voronoi(1, Euclidian);

		return [
			{name: "Constant", module: new Constant(0.5)},
			{name: "Perlin", module: perlin},
			{name: "Perlin x4", module: new Perlin(4, 1)},
			{name: "Simplex", module: simplex},
			{name: "Simplex x4", module: new Simplex(4, 1)},
			{name: "Billow x4", module: new Billow(4, 1)},
			{name: "Ridged x4", module: new Ridged(4, 1)},
			{name: "Voronoi Euclidian", module: voronoi},
			{name: "Voronoi Manhattan", module: new Voronoi(1, Manhattan)},
			{name: "Voronoi Chebyshev", module: new Voronoi(1, Chebyshev)},
			{name: "Worley", module: new Worley(1)},
			{name: "CellularF2F1", module: new CellularF2F1(1)},
			{name: "CheckerBoard", module: new CheckerBoard(1)},
			{name: "Cones", module: new Cones(1)},
			{name: "Cylinders", module: new Cylinders(1)},
			{name: "Spheres", module: new Spheres(1)},
			{name: "Add", module: new Add(perlin, simplex)},
			{name: "Blend", module: new Blend(perlin, simplex, voronoi)},
			{name: "Select hard", module: new Select(perlin, simplex, voronoi, 0, 0)},
			{name: "Select falloff", module: new Select(perlin, simplex, voronoi, 0, 0.5)},
			{name: "Clamp", module: new Clamp(perlin, -0.5, 0.5)},
			{name: "Normalize", module: new Normalize(perlin, -1, 1, 0, 1)},
			{name: "RotatePoint", module: new RotatePoint(perlin, Math.PI / 4)},
			{name: "Curve", module: new Curve(perlin, curvePoints)},
			{name: "Terrace", module: new Terrace(perlin, terracePoints)},
			{name: "Exponent", module: new Exponent(perlin, 2.0)},
			{name: "Pow", module: new Pow(perlin, new Constant(2.0))},
			{name: "Displace", module: new Displace(perlin, new Simplex(1, 2), new Simplex(1, 3))},
			{name: "Turbulence", module: new Turbulence(perlin, 0.5, 2.0)},
			{name: "FractalWarp x3", module: new FractalWarp(perlin, 0.5, 2.0, 3)},
		];
	}
}
