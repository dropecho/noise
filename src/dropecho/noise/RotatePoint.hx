package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/** Rotates input coordinates by a fixed angle (in radians) around the origin before sampling the source module. Cos/sin are pre-computed at construction time. */
class RotatePoint implements IBatchModule2D {
	var input:IModule2D;
	var cosAngle:F32;
	var sinAngle:F32;

	public function new(input:IModule2D, angle:F32 = 0) {
		this.input = input;
		this.cosAngle = Math.cos(angle);
		this.sinAngle = Math.sin(angle);
	}

	public function value(x:F32, y:F32):F32 {
		return input.value(x * cosAngle - y * sinAngle, x * sinAngle + y * cosAngle);
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		var rotatedX = new Vector<F32>(count);
		var rotatedY = new Vector<F32>(count);
		for (i in 0...count) {
			var x = xs[i];
			var y = ys[i];
			rotatedX[i] = x * cosAngle - y * sinAngle;
			rotatedY[i] = x * sinAngle + y * cosAngle;
		}
		Batch.values(input, out, rotatedX, rotatedY, count);
	}
}
