package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/**
 * "Billowy" turbulent noise — absolute value of octaved Perlin noise.
 * Resembles rolling storm clouds or rounded hills. Output is always >= 0.
 */
@:build(dropecho.macros.Constructor.fromArgs())
class Billow implements IGridModule2D {
	public function new(octaves:I32 = 1, frequency:F32 = 1, lacunarity:F32 = 2, persistence:F32 = 0.5);

	public function value(x:F32, y:F32):F32 {
		var val:F32 = 0;

		var currentAmplitude:F32 = 1;
		var currentFrequency:F32 = frequency;

		for (_ in 0...this.octaves) {
			val += Perlin.noise2d(x * currentFrequency, y * currentFrequency) * currentAmplitude;

			currentAmplitude *= persistence;
			currentFrequency *= lacunarity;
		}

		return FastMath.abs(val);
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		Perlin.fractal(out, xs, ys, count, octaves, frequency, lacunarity, persistence);
		for (i in 0...count) {
			out[i] = FastMath.abs(out[i]);
		}
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		Perlin.fractalGrid(out, xs, width, ys, height, octaves, frequency, lacunarity, persistence);
		for (k in 0...width * height) {
			out[k] = FastMath.abs(out[k]);
		}
	}
}
