package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;

/**
 * Simplex noise generator. `value()` uses a native 2D simplex (3 corners, 1 branch) for speed.
 * The static `noise()` 3D function is kept for Turbulence/FractalWarp which need independent
 * per-axis displacements via different z slices.
 * Supports multiple octaves for fractal detail.
 */
@:build(dropecho.macros.Constructor.fromArgs())
class Simplex implements IModule2D {
	/**
	 * @param octaves The number of octaves in the noise (how many "layers").
	 * @param frequency The frequency of the base noise layer.
	 * @param lacunarity The multiplier of the frequency per octave.
	 * @param persistence The multiplier of the amplitude per octave.
	 */
	public function new(octaves:I32 = 1, frequency:F32 = 1, lacunarity:F32 = 2, persistence:F32 = 0.5);

	public function value(x:F32, y:F32):F32 {
		var val:F32 = 0;

		var freq = this.frequency;
		var cur_persistence = 1.0;

		for (_ in 0...this.octaves) {
			val += Simplex2D.noise(x * freq, y * freq) * cur_persistence;
			freq *= this.lacunarity;
			cur_persistence *= this.persistence;
		}

		return val;
	}

	// Static fields declared in the SAME ORDER as the original so V8's hidden class
	// shape is unchanged and existing inline caches for noise() remain valid.

	private static inline final uvec:F32 = .707;

	// haxe.ds.Vector compiles to a native array on C# (no Array wrapper indirection)
	// and to a plain array on JS/Python.
	// @formatter:off
	private static final grad3:Vector<F32> = Vector.fromArrayCopy(([
		uvec, uvec, 0, -uvec, uvec, 0, uvec, -uvec, 0, -uvec, -uvec, 0,
		uvec, 0, uvec, -uvec, 0, uvec, uvec, 0, -uvec, -uvec, 0, -uvec,
		0, uvec, uvec, 0, -uvec, uvec, 0, uvec, -uvec, 0, -uvec, -uvec
	] : Array<F32>));

	private static final p = [
		151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,
		234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
		134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
		1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250,
		124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
		154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251,
		34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176,
		115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
	];
	// @formatter:on

	private static final perm:Vector<Int> = Vector.fromArrayCopy([for (i in 0...512) p[i & 255]]);
	private static final perm12:Vector<Int> = Vector.fromArrayCopy([for (i in 0...512) (perm[i & 255] % 12) * 3]);

	private static inline function dot3(g:Int, x:F32, y:F32, z:F32):F32 {
		return grad3[g] * x + grad3[g + 1] * y + grad3[g + 2] * z;
	}

	static inline final F3:F32 = 1.0 / 3.0;
	static inline final G3:F32 = 1.0 / 6.0;

	public static function noise(xin:F32, yin:F32, zin:F32):F32 {
		var n0, n1, n2, n3;

		var s:F32 = (xin + yin + zin) * F3;
		var i:I32 = FastMath.floor(xin + s);
		var j:I32 = FastMath.floor(yin + s);
		var k:I32 = FastMath.floor(zin + s);

		var t = (i + j + k) * G3;
		var X0:F32 = i - t;
		var Y0:F32 = j - t;
		var Z0:F32 = k - t;

		var x0:F32 = xin - X0;
		var y0:F32 = yin - Y0;
		var z0:F32 = zin - Z0;

		var i1, j1, k1;
		var i2, j2, k2;
		if (x0 >= y0) {
			if (y0 >= z0)      { i1=1;j1=0;k1=0;i2=1;j2=1;k2=0; }
			else if (x0 >= z0) { i1=1;j1=0;k1=0;i2=1;j2=0;k2=1; }
			else               { i1=0;j1=0;k1=1;i2=1;j2=0;k2=1; }
		} else {
			if (y0 < z0)       { i1=0;j1=0;k1=1;i2=0;j2=1;k2=1; }
			else if (x0 < z0)  { i1=0;j1=1;k1=0;i2=0;j2=1;k2=1; }
			else               { i1=0;j1=1;k1=0;i2=1;j2=1;k2=0; }
		}

		var x1:F32 = x0 - i1 + G3;
		var y1:F32 = y0 - j1 + G3;
		var z1:F32 = z0 - k1 + G3;
		var x2:F32 = x0 - i2 + 2.0 * G3;
		var y2:F32 = y0 - j2 + 2.0 * G3;
		var z2:F32 = z0 - k2 + 2.0 * G3;
		var x3:F32 = x0 - 1.0 + 3.0 * G3;
		var y3:F32 = y0 - 1.0 + 3.0 * G3;
		var z3:F32 = z0 - 1.0 + 3.0 * G3;

		var ii:I32 = i & 255;
		var jj:I32 = j & 255;
		var kk:I32 = k & 255;
		var gi0:I32 = perm12[ii + perm[jj + perm[kk]]];
		var gi1:I32 = perm12[ii + i1 + perm[jj + j1 + perm[kk + k1]]];
		var gi2:I32 = perm12[ii + i2 + perm[jj + j2 + perm[kk + k2]]];
		var gi3:I32 = perm12[ii + 1 + perm[jj + 1 + perm[kk + 1]]];

		var t0:F32 = 0.6 - x0*x0 - y0*y0 - z0*z0;
		if (t0 < 0) { n0 = 0.0; } else { t0 *= t0; n0 = t0 * t0 * dot3(gi0, x0, y0, z0); }
		var t1:F32 = 0.6 - x1*x1 - y1*y1 - z1*z1;
		if (t1 < 0) { n1 = 0.0; } else { t1 *= t1; n1 = t1 * t1 * dot3(gi1, x1, y1, z1); }
		var t2:F32 = 0.6 - x2*x2 - y2*y2 - z2*z2;
		if (t2 < 0) { n2 = 0.0; } else { t2 *= t2; n2 = t2 * t2 * dot3(gi2, x2, y2, z2); }
		var t3:F32 = 0.6 - x3*x3 - y3*y3 - z3*z3;
		if (t3 < 0) { n3 = 0.0; } else { t3 *= t3; n3 = t3 * t3 * dot3(gi3, x3, y3, z3); }

		return 32.0 * (n0 + n1 + n2 + n3);
	}
}
