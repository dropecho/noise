package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/**
 * Randomly displaces input coordinates using Simplex noise before sampling the source module.
 * Independent x and y displacements are generated using different z-slice values of the same noise.
 * Power controls displacement magnitude; frequency controls the scale of the distortion.
 */
class Turbulence implements IBatchModule2D {
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

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		var movedX = new Vector<F32>(count);
		var movedY = new Vector<F32>(count);
		for (i in 0...count) {
			// Same arithmetic as value().
			var x = xs[i];
			var y = ys[i];
			var sx:F32 = x * frequency;
			var sy:F32 = y * frequency;
			var xDisplace:F32 = Simplex.noise(sx, sy, 0.0) * power;
			var yDisplace:F32 = Simplex.noise(sx, sy, 1.0) * power;
			movedX[i] = x + xDisplace;
			movedY[i] = y + yDisplace;
		}
		Batch.values(input, out, movedX, movedY, count);
	}
}
