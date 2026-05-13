package dropecho.noise;

import dropecho.utils.FastMath;

/**
 * Randomly displaces input coordinates using Simplex noise before sampling the source module.
 * Independent x and y displacements are generated using different z-slice values of the same noise.
 * Power controls displacement magnitude; frequency controls the scale of the distortion.
 */
class Turbulence implements IModule2D {
	var input:IModule2D;
	var power:F32;
	var frequency:F32;

	public function new(input:IModule2D, power:F32 = 1, frequency:F32 = 1) {
		this.input = input;
		this.power = power;
		this.frequency = frequency;
	}

	public function value(x:F32, y:F32):F32 {
		var sx:F32 = x * frequency;
		var sy:F32 = y * frequency;
		var xDisplace:F32 = Simplex.noise(sx, sy, 0.0) * power;
		var yDisplace:F32 = Simplex.noise(sx, sy, 1.0) * power;
		return input.value(x + xDisplace, y + yDisplace);
	}
}
