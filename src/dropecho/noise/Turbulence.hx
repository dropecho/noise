package dropecho.noise;

/**
 * Randomly displaces input coordinates using Simplex noise before sampling the source module.
 * Independent x and y displacements are generated using different z-slice values of the same noise.
 * Power controls displacement magnitude; frequency controls the scale of the distortion.
 */
class Turbulence implements IModule2D {
	var input:IModule2D;
	var power:Float;
	var frequency:Float;

	public function new(input:IModule2D, power:Float = 1, frequency:Float = 1) {
		this.input = input;
		this.power = power;
		this.frequency = frequency;
	}

	public function value(x:Float, y:Float):Float {
		var sx = x * frequency;
		var sy = y * frequency;
		// Use different z values to get independent x and y displacements
		var xDisplace = Simplex.noise(sx, sy, 0.0) * power;
		var yDisplace = Simplex.noise(sx, sy, 1.0) * power;
		return input.value(x + xDisplace, y + yDisplace);
	}
}
