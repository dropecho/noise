import {Register} from "../../genes/Register.js"
import {Simplex2D} from "./Simplex2D.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
* Simplex noise generator. `value()` uses a native 2D simplex (3 corners, 1 branch) for speed.
* The static `noise()` 3D function is kept for Turbulence/FractalWarp which need independent
* per-axis displacements via different z slices.
* Supports multiple octaves for fractal detail.
*/
export const Simplex = Register.global("$hxClasses")["dropecho.noise.Simplex"] = 
class Simplex extends Register.inherits() {
	new(octaves, frequency, lacunarity, persistence) {
		if (octaves == null) {
			octaves = 1;
		};
		if (frequency == null) {
			frequency = 1;
		};
		if (lacunarity == null) {
			lacunarity = 2;
		};
		if (persistence == null) {
			persistence = 0.5;
		};
		this.octaves = octaves;
		this.frequency = frequency;
		this.lacunarity = lacunarity;
		this.persistence = persistence;
	}
	value(x, y) {
		var val = 0;
		var freq = this.frequency;
		var cur_persistence = 1.0;
		var _g = 0;
		var _g1 = this.octaves;
		while (_g < _g1) {
			++_g;
			val += Simplex2D.noise(x * freq, y * freq) * cur_persistence;
			freq *= this.lacunarity;
			cur_persistence *= this.persistence;
		};
		return val;
	}
	static dot3(g, x, y, z) {
		return Simplex.grad3[g] * x + Simplex.grad3[g + 1] * y + Simplex.grad3[g + 2] * z;
	}
	static noise(xin, yin, zin) {
		var n0;
		var n1;
		var n2;
		var n3;
		var s = (xin + yin + zin) * 0.333333333333333315;
		var f = xin + s;
		var t = f | 0;
		var i = (f < t) ? t - 1 : t;
		var f = yin + s;
		var t = f | 0;
		var j = (f < t) ? t - 1 : t;
		var f = zin + s;
		var t = f | 0;
		var k = (f < t) ? t - 1 : t;
		var t = ((i + j | 0) + k | 0) * 0.166666666666666657;
		var x0 = xin - (i - t);
		var y0 = yin - (j - t);
		var z0 = zin - (k - t);
		var i1;
		var j1;
		var k1;
		var i2;
		var j2;
		var k2;
		if (x0 >= y0) {
			if (y0 >= z0) {
				i1 = 1;
				j1 = 0;
				k1 = 0;
				i2 = 1;
				j2 = 1;
				k2 = 0;
			} else if (x0 >= z0) {
				i1 = 1;
				j1 = 0;
				k1 = 0;
				i2 = 1;
				j2 = 0;
				k2 = 1;
			} else {
				i1 = 0;
				j1 = 0;
				k1 = 1;
				i2 = 1;
				j2 = 0;
				k2 = 1;
			};
		} else if (y0 < z0) {
			i1 = 0;
			j1 = 0;
			k1 = 1;
			i2 = 0;
			j2 = 1;
			k2 = 1;
		} else if (x0 < z0) {
			i1 = 0;
			j1 = 1;
			k1 = 0;
			i2 = 0;
			j2 = 1;
			k2 = 1;
		} else {
			i1 = 0;
			j1 = 1;
			k1 = 0;
			i2 = 1;
			j2 = 1;
			k2 = 0;
		};
		var x1 = x0 - i1 + 0.166666666666666657;
		var y1 = y0 - j1 + 0.166666666666666657;
		var z1 = z0 - k1 + 0.166666666666666657;
		var x2 = x0 - i2 + 0.333333333333333315;
		var y2 = y0 - j2 + 0.333333333333333315;
		var z2 = z0 - k2 + 0.333333333333333315;
		var x3 = x0 - 1.0 + 0.5;
		var y3 = y0 - 1.0 + 0.5;
		var z3 = z0 - 1.0 + 0.5;
		var ii = i & 255;
		var jj = j & 255;
		var kk = k & 255;
		var gi0 = Simplex.perm12[ii + Simplex.perm[jj + Simplex.perm[kk] | 0] | 0];
		var gi1 = Simplex.perm12[(ii + i1 | 0) + Simplex.perm[(jj + j1 | 0) + Simplex.perm[kk + k1 | 0] | 0] | 0];
		var gi2 = Simplex.perm12[(ii + i2 | 0) + Simplex.perm[(jj + j2 | 0) + Simplex.perm[kk + k2 | 0] | 0] | 0];
		var gi3 = Simplex.perm12[(ii + 1 | 0) + Simplex.perm[(jj + 1 | 0) + Simplex.perm[kk + 1 | 0] | 0] | 0];
		var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
		if (t0 < 0) {
			n0 = 0.0;
		} else {
			t0 *= t0;
			n0 = t0 * t0 * (Simplex.grad3[gi0] * x0 + Simplex.grad3[gi0 + 1] * y0 + Simplex.grad3[gi0 + 2] * z0);
		};
		var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
		if (t1 < 0) {
			n1 = 0.0;
		} else {
			t1 *= t1;
			n1 = t1 * t1 * (Simplex.grad3[gi1] * x1 + Simplex.grad3[gi1 + 1] * y1 + Simplex.grad3[gi1 + 2] * z1);
		};
		var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
		if (t2 < 0) {
			n2 = 0.0;
		} else {
			t2 *= t2;
			n2 = t2 * t2 * (Simplex.grad3[gi2] * x2 + Simplex.grad3[gi2 + 1] * y2 + Simplex.grad3[gi2 + 2] * z2);
		};
		var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
		if (t3 < 0) {
			n3 = 0.0;
		} else {
			t3 *= t3;
			n3 = t3 * t3 * (Simplex.grad3[gi3] * x3 + Simplex.grad3[gi3 + 1] * y3 + Simplex.grad3[gi3 + 2] * z3);
		};
		return 32.0 * (n0 + n1 + n2 + n3);
	}
	static get __name__() {
		return "dropecho.noise.Simplex"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Simplex
	}
}


Simplex.uvec = .707
Simplex.grad3 = [.707, .707, 0, -0.707, .707, 0, .707, -0.707, 0, -0.707, -0.707, 0, .707, 0, .707, -0.707, 0, .707, .707, 0, -0.707, -0.707, 0, -0.707, 0, .707, .707, 0, -0.707, .707, 0, .707, -0.707, 0, -0.707, -0.707].slice(0)
Simplex.p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]
Simplex.perm = (function($this) {var $r0
	var _g = [];
	{
		var _g1 = 0;
		while (_g1 < 512) _g.push(Simplex.p[_g1++ & 255]);
	};
	
	$r0 = _g.slice(0)
	return $r0})(this)
Simplex.perm12 = (function($this) {var $r0
	var _g = [];
	{
		var _g1 = 0;
		while (_g1 < 512) _g.push(Simplex.perm[_g1++ & 255] % 12 * 3);
	};
	
	$r0 = _g.slice(0)
	return $r0})(this)
Simplex.F3 = 0.333333333333333315
Simplex.G3 = 0.166666666666666657