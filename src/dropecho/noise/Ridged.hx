package dropecho.noise;

import dropecho.utils.FastMath;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Ridged implements IModule2D {
	public function new(octaves:Int = 1, frequency:Float = 1, amplitude:Float = 1, lacunarity:Float = 2, persistence:Float = 1);

	public function value(x:Float, y:Float):Float {
		var max:Float = 0; // sum all amplitudes for normalization.
		var val:Float = 0;

		var currentAmplitude = amplitude;
		var currentFrequency = frequency;
		var currentValue:Float;

		for (_ in 0...this.octaves) {
			currentValue = Simplex.noise(x * currentFrequency, y * currentFrequency, 0) * currentAmplitude;
			max += currentAmplitude;
			currentAmplitude *= persistence;
			currentFrequency *= lacunarity;

			val += max - Math.abs(currentValue);
			val *= (val / max);
		}

		return (val / Math.pow(max, octaves)) - amplitude;
	}
}
