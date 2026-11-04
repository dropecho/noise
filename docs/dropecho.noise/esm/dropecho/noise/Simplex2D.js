import {Register} from "../../genes/Register.js"

const $global = Register.$global

/**
* Standalone 2D simplex noise. Kept separate from the 3D Simplex class so that adding
* noise2d does not alter the property-shape of the Simplex class object, which would
* invalidate V8's inline caches for the perm/grad3 lookups inside Simplex.noise().
*/
export const Simplex2D = Register.global("$hxClasses")["dropecho.noise.Simplex2D"] = 
class Simplex2D {
	static dot2(gi, x, y) {
		switch (gi) {
			case 0:
				return x;
				break
			case 1:
				return -x;
				break
			case 2:
				return y;
				break
			case 3:
				return -y;
				break
			case 4:
				return x + y;
				break
			case 5:
				return -x + y;
				break
			case 6:
				return x - y;
				break
			default:
			return -x - y;
			
		};
	}
	static noise(xin, yin) {
		var s = (xin + yin) * 0.3660254037844386;
		var f = xin + s;
		var t = f | 0;
		var i = (f < t) ? t - 1 : t;
		var f = yin + s;
		var t = f | 0;
		var j = (f < t) ? t - 1 : t;
		var t = (i + j | 0) * 0.21132486540518713;
		var x0 = xin - (i - t);
		var y0 = yin - (j - t);
		var i1;
		var j1;
		if (x0 > y0) {
			i1 = 1;
			j1 = 0;
		} else {
			i1 = 0;
			j1 = 1;
		};
		var x1 = x0 - i1 + 0.21132486540518713;
		var y1 = y0 - j1 + 0.21132486540518713;
		var x2 = x0 - 1.0 + 0.4226497308103742;
		var y2 = y0 - 1.0 + 0.4226497308103742;
		var ii = i & 255;
		var jj = j & 255;
		var gi1 = Simplex2D.perm[(ii + i1 | 0) + Simplex2D.perm[jj + j1 | 0] | 0] & 7;
		var gi2 = Simplex2D.perm[(ii + 1 | 0) + Simplex2D.perm[jj + 1 | 0] | 0] & 7;
		var n0;
		var n1;
		var n2;
		var t0 = 0.5 - x0 * x0 - y0 * y0;
		if (t0 < 0) {
			n0 = 0.0;
		} else {
			t0 *= t0;
			var n01 = t0 * t0;
			var n02;
			switch (Simplex2D.perm[ii + Simplex2D.perm[jj] | 0] & 7) {
				case 0:
					n02 = x0;
					break
				case 1:
					n02 = -x0;
					break
				case 2:
					n02 = y0;
					break
				case 3:
					n02 = -y0;
					break
				case 4:
					n02 = x0 + y0;
					break
				case 5:
					n02 = -x0 + y0;
					break
				case 6:
					n02 = x0 - y0;
					break
				default:
				n02 = -x0 - y0;
				
			};
			n0 = n01 * n02;
		};
		var t1 = 0.5 - x1 * x1 - y1 * y1;
		if (t1 < 0) {
			n1 = 0.0;
		} else {
			t1 *= t1;
			var n11 = t1 * t1;
			var n12;
			switch (gi1) {
				case 0:
					n12 = x1;
					break
				case 1:
					n12 = -x1;
					break
				case 2:
					n12 = y1;
					break
				case 3:
					n12 = -y1;
					break
				case 4:
					n12 = x1 + y1;
					break
				case 5:
					n12 = -x1 + y1;
					break
				case 6:
					n12 = x1 - y1;
					break
				default:
				n12 = -x1 - y1;
				
			};
			n1 = n11 * n12;
		};
		var t2 = 0.5 - x2 * x2 - y2 * y2;
		if (t2 < 0) {
			n2 = 0.0;
		} else {
			t2 *= t2;
			var n21 = t2 * t2;
			var n22;
			switch (gi2) {
				case 0:
					n22 = x2;
					break
				case 1:
					n22 = -x2;
					break
				case 2:
					n22 = y2;
					break
				case 3:
					n22 = -y2;
					break
				case 4:
					n22 = x2 + y2;
					break
				case 5:
					n22 = -x2 + y2;
					break
				case 6:
					n22 = x2 - y2;
					break
				default:
				n22 = -x2 - y2;
				
			};
			n2 = n21 * n22;
		};
		return 70.0 * (n0 + n1 + n2);
	}
	static get __name__() {
		return "dropecho.noise.Simplex2D"
	}
	get __class__() {
		return Simplex2D
	}
}


Simplex2D.F2 = 0.3660254037844386
Simplex2D.G2 = 0.21132486540518713
Simplex2D.G2x2 = 0.4226497308103742
Simplex2D.p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]
Simplex2D.perm = (function($this) {var $r0
	var _g = [];
	{
		var _g1 = 0;
		while (_g1 < 512) _g.push(Simplex2D.p[_g1++ & 255]);
	};
	
	$r0 = _g.slice(0)
	return $r0})(this)