package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/**
 * Domain warp: iteratively displaces the sample coordinates through Simplex noise before
 * evaluating the source module. Each octave feeds the warped position into the next warp,
 * producing increasingly complex, swirling distortion.
 */
class FractalWarp implements IBatchModule2D {
	var input:IModule2D;
	var warpStrength:F32;
	var warpFrequency:F32;
	var octaves:Int;

	public function new(input:IModule2D, warpStrength:F32 = 1, warpFrequency:F32 = 1, octaves:Int = 1) {
		this.input = input;
		this.warpStrength = warpStrength;
		this.warpFrequency = warpFrequency;
		this.octaves = octaves;
	}

	public function value(x:F32, y:F32):F32 {
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

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		var warpedX = new Vector<F32>(count);
		var warpedY = new Vector<F32>(count);
		for (i in 0...count) {
			// Same arithmetic as value().
			var wx = xs[i];
			var wy = ys[i];
			for (_ in 0...octaves) {
				var fx = wx * warpFrequency;
				var fy = wy * warpFrequency;
				wx += Simplex.noise(fx, fy, 0.0) * warpStrength;
				wy += Simplex.noise(fx, fy, 1.0) * warpStrength;
			}
			warpedX[i] = wx;
			warpedY[i] = wy;
		}
		Batch.values(input, out, warpedX, warpedY, count);
	}
}
