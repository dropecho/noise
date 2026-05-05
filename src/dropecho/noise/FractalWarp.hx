package dropecho.noise;

/**
 * Domain warp: iteratively displaces the sample coordinates through Simplex noise before
 * evaluating the source module. Each octave feeds the warped position into the next warp,
 * producing increasingly complex, swirling distortion.
 */
class FractalWarp implements IModule2D {
	var input:IModule2D;
	var warpStrength:Float;
	var warpFrequency:Float;
	var octaves:Int;

	public function new(input:IModule2D, warpStrength:Float = 1, warpFrequency:Float = 1, octaves:Int = 1) {
		this.input = input;
		this.warpStrength = warpStrength;
		this.warpFrequency = warpFrequency;
		this.octaves = octaves;
	}

	public function value(x:Float, y:Float):Float {
		var wx = x;
		var wy = y;

		for (_ in 0...octaves) {
			var fx = wx * warpFrequency;
			var fy = wy * warpFrequency;
			wx += Simplex.noise(fx, fy, 0.0) * warpStrength;
			wy += Simplex.noise(fx, fy, 1.0) * warpStrength;
		}

		return input.value(wx, wy);
	}
}
