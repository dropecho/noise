package dropecho.noise;

import dropecho.utils.FastMath;

/**
 * Ridged multifractal noise for sharp mountain-ridge and canyon terrain features.
 * Each octave of Perlin noise is inverted and its absolute value summed, producing
 * characteristic sharp peaks and deep valleys.
 */
@:build(dropecho.macros.Constructor.fromArgs())
class Ridged implements IModule2D {
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

		return 1 - FastMath.abs((octaves + 1) * val);
	}
}
