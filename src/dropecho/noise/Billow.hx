package dropecho.noise;

import dropecho.utils.FastMath;

/**
 * "Billowy" turbulent noise — absolute value of octaved Perlin noise.
 * Resembles rolling storm clouds or rounded hills. Output is always >= 0.
 */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Billow implements IModule2D {
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
}
