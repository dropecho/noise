import {Int32} from "../../haxe/Int32.js"
import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
* Cellular noise returning sqrt(F2) - sqrt(F1) — the difference between the distance to
* the 2nd nearest cell center and the nearest cell center. Produces cracked, rocky, or
* dried-mud surface patterns distinct from standard Worley F1 output.
*/
export const CellularF2F1 = Register.global("$hxClasses")["dropecho.noise.CellularF2F1"] = 
class CellularF2F1 extends Register.inherits() {
	new(frequency) {
		this.frequency = frequency;
	}
	value(x, y) {
		x *= this.frequency;
		y *= this.frequency;
		var t = x | 0;
		var ix = (x < t) ? t - 1 : t;
		var t = y | 0;
		var iy = (y < t) ? t - 1 : t;
		var f1 = 3.40282347e+38;
		var f2 = 3.40282347e+38;
		var _g = -1;
		while (_g < 2) {
			var cx = _g++;
			var cellX = cx + ix | 0;
			var cellY = -1 + iy | 0;
			var n = (((Int32._mul(cellX, 9167) + Int32._mul(cellY, 41179) | 0) + Int32._mul(0, 9167) | 0) + Int32._mul(0, 4819) | 0) & 2147483647;
			n = n >> 13 ^ n;
			var b = Int32._mul(n, n);
			var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
			var n1 = (((Int32._mul(cellX, 9167) + Int32._mul(cellY, 41179) | 0) + Int32._mul(1, 9167) | 0) + Int32._mul(0, 4819) | 0) & 2147483647;
			n1 = n1 >> 13 ^ n1;
			var b1 = Int32._mul(n1, n1);
			var dx = x - (cellX + jx);
			var dy = y - (cellY + 0.353553 * ((Int32._mul(n1, b1) & 2147483647) / 1073741824.0 - 1.0));
			var dist = dx * dx + dy * dy;
			if (dist < f1) {
				f2 = f1;
				f1 = dist;
			} else if (dist < f2) {
				f2 = dist;
			};
			var cellX1 = cx + ix | 0;
			var cellY1 = iy | 0;
			var n2 = (((Int32._mul(cellX1, 9167) + Int32._mul(cellY1, 41179) | 0) + Int32._mul(0, 9167) | 0) + Int32._mul(0, 4819) | 0) & 2147483647;
			n2 = n2 >> 13 ^ n2;
			var b2 = Int32._mul(n2, n2);
			var jx1 = 0.353553 * ((Int32._mul(n2, b2) & 2147483647) / 1073741824.0 - 1.0);
			var n3 = (((Int32._mul(cellX1, 9167) + Int32._mul(cellY1, 41179) | 0) + Int32._mul(1, 9167) | 0) + Int32._mul(0, 4819) | 0) & 2147483647;
			n3 = n3 >> 13 ^ n3;
			var b3 = Int32._mul(n3, n3);
			var dx1 = x - (cellX1 + jx1);
			var dy1 = y - (cellY1 + 0.353553 * ((Int32._mul(n3, b3) & 2147483647) / 1073741824.0 - 1.0));
			var dist1 = dx1 * dx1 + dy1 * dy1;
			if (dist1 < f1) {
				f2 = f1;
				f1 = dist1;
			} else if (dist1 < f2) {
				f2 = dist1;
			};
			var cellX2 = cx + ix | 0;
			var cellY2 = 1 + iy | 0;
			var n4 = (((Int32._mul(cellX2, 9167) + Int32._mul(cellY2, 41179) | 0) + Int32._mul(0, 9167) | 0) + Int32._mul(0, 4819) | 0) & 2147483647;
			n4 = n4 >> 13 ^ n4;
			var b4 = Int32._mul(n4, n4);
			var jx2 = 0.353553 * ((Int32._mul(n4, b4) & 2147483647) / 1073741824.0 - 1.0);
			var n5 = (((Int32._mul(cellX2, 9167) + Int32._mul(cellY2, 41179) | 0) + Int32._mul(1, 9167) | 0) + Int32._mul(0, 4819) | 0) & 2147483647;
			n5 = n5 >> 13 ^ n5;
			var b5 = Int32._mul(n5, n5);
			var dx2 = x - (cellX2 + jx2);
			var dy2 = y - (cellY2 + 0.353553 * ((Int32._mul(n5, b5) & 2147483647) / 1073741824.0 - 1.0));
			var dist2 = dx2 * dx2 + dy2 * dy2;
			if (dist2 < f1) {
				f2 = f1;
				f1 = dist2;
			} else if (dist2 < f2) {
				f2 = dist2;
			};
		};
		return Math.sqrt(f2) - Math.sqrt(f1);
	}
	static get __name__() {
		return "dropecho.noise.CellularF2F1"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return CellularF2F1
	}
}


CellularF2F1.halfUnitVec = 0.353553