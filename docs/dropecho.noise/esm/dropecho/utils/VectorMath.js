import {Int32} from "../../haxe/Int32.js"
import {Register} from "../../genes/Register.js"
import {Vector3s, Vector2s} from "./Vector.js"

const $global = Register.$global

export const VectorMath = Register.global("$hxClasses")["dropecho.utils.VectorMath"] = 
class VectorMath {
	static rand3(a, seed) {
		var y = a.y | 0;
		var z = a.z | 0;
		var n = (((Int32._mul(a.x | 0, 9167) + Int32._mul(y, 41179) | 0) + Int32._mul(z, 9167) | 0) + Int32._mul(seed, 4819) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		return 1.0 - (Int32._mul(n, b) & 2147483647) / 1073741824.0;
	}
	static rand3I32(x, y, z, seed) {
		var n = (((Int32._mul(x, 9167) + Int32._mul(y, 41179) | 0) + Int32._mul(z, 9167) | 0) + Int32._mul(seed, 4819) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		return Int32._mul(n, b) & 2147483647;
	}
	static rand3dTo3d(a) {
		var y = a.y | 0;
		var z = a.z | 0;
		var n = (((Int32._mul(a.x | 0, 9167) + Int32._mul(y, 41179) | 0) + Int32._mul(z, 9167) | 0) + Int32._mul(0, 4819) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var rx = 1.0 - (Int32._mul(n, b) & 2147483647) / 1073741824.0;
		var y = a.y | 0;
		var z = a.z | 0;
		var n = (((Int32._mul(a.x | 0, 9167) + Int32._mul(y, 41179) | 0) + Int32._mul(z, 9167) | 0) + Int32._mul(1, 4819) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var ry = 1.0 - (Int32._mul(n, b) & 2147483647) / 1073741824.0;
		var t = rx | 0;
		var t1 = ry | 0;
		return new Vector3s(rx - ((rx < t) ? t - 1 : t), ry - ((ry < t1) ? t1 - 1 : t1), 0);
	}
	static add(a, b) {
		return new Vector3s(a.x + b.x, a.y + b.y, a.z + b.z);
	}
	static sub(a, b) {
		return new Vector3s(a.x - b.x, a.y - b.y, a.z - b.z);
	}
	static abs(a) {
		var f = a.x;
		var f1 = a.y;
		var f2 = a.z;
		return new Vector3s((f >= 0) ? f : -f, (f1 >= 0) ? f1 : -f1, (f2 >= 0) ? f2 : -f2);
	}
	static distance(a, b) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
	static distanceSq(a, b) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return dx * dx + dy * dy + dz * dz;
	}
	static chebyshevDistance(a, b) {
		var f = b.x - a.x;
		var dx = (f >= 0) ? f : -f;
		var f = b.y - a.y;
		var dy = (f >= 0) ? f : -f;
		var f = b.z - a.z;
		var dz = (f >= 0) ? f : -f;
		var a = (dx < dy) ? dy : dx;
		if (a < dz) {
			return dz;
		} else {
			return a;
		};
	}
	static manhattanDistance(a, b) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return ((dx >= 0) ? dx : -dx) + ((dy >= 0) ? dy : -dy) + ((dz >= 0) ? dz : -dz);
	}
	static $length(a) {
		return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
	}
	static lengthsq(a) {
		return a.x * a.x + a.y * a.y + a.z * a.z;
	}
	static scale(a, scalar) {
		return new Vector3s(a.x * scalar, a.y * scalar, a.z * scalar);
	}
	static inverseSqrt(a) {
		return 1.0 / Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
	}
	static normalize(a) {
		var scalar = 1.0 / Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
		return new Vector3s(a.x * scalar, a.y * scalar, a.z * scalar);
	}
	static dot(a, b) {
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}
	static floor(a) {
		var f = a.x;
		var t = f | 0;
		var f1 = a.y;
		var t1 = f1 | 0;
		var f2 = a.z;
		var t2 = f2 | 0;
		return new Vector3s((f < t) ? t - 1 : t, (f1 < t1) ? t1 - 1 : t1, (f2 < t2) ? t2 - 1 : t2);
	}
	static randomUnitVector2() {
		var theta = Math.random() * 2 * Math.PI;
		return new Vector2s(Math.cos(theta), Math.sin(theta));
	}
	static get __name__() {
		return "dropecho.utils.VectorMath"
	}
	get __class__() {
		return VectorMath
	}
}


VectorMath.magicX = 9167
VectorMath.magicY = 41179
VectorMath.magicZ = 9167
VectorMath.magicS = 4819