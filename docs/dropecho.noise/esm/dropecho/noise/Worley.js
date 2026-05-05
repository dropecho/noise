import {Int32} from "../../haxe/Int32.js"
import {Register} from "../../genes/Register.js"
import {VectorMath} from "../utils/VectorMath.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Worley = Register.global("$hxClasses")["dropecho.noise.Worley"] = 
class Worley extends Register.inherits() {
	new(frequency) {
		this.frequency = frequency;
	}
	value(x, y) {
		x *= this.frequency;
		y *= this.frequency;
		var ix = (x >= 0) ? x | 0 : x - 1 | 0;
		var iy = (y >= 0) ? y | 0 : y - 1 | 0;
		var minDistSq = 3.40282347e+38;
		var cellX = -1 + ix | 0;
		var cellY = -1 + iy | 0;
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var dx = x - (cellX + jx);
		var dy = y - (cellY + 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0));
		var distSq = dx * dx + dy * dy;
		if (distSq < 3.40282347e+38) {
			minDistSq = distSq;
		};
		var cellX = -1 + ix | 0;
		var cellY = iy | 0;
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var dx = x - (cellX + jx);
		var dy = y - (cellY + 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0));
		var distSq = dx * dx + dy * dy;
		if (distSq < minDistSq) {
			minDistSq = distSq;
		};
		var cellX = -1 + ix | 0;
		var cellY = 1 + iy | 0;
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var dx = x - (cellX + jx);
		var dy = y - (cellY + 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0));
		var distSq = dx * dx + dy * dy;
		if (distSq < minDistSq) {
			minDistSq = distSq;
		};
		var cellX = ix | 0;
		var cellY = -1 + iy | 0;
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var dx = x - (cellX + jx);
		var dy = y - (cellY + 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0));
		var distSq = dx * dx + dy * dy;
		if (distSq < minDistSq) {
			minDistSq = distSq;
		};
		var cellX = ix | 0;
		var cellY = iy | 0;
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var dx = x - (cellX + jx);
		var dy = y - (cellY + 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0));
		var distSq = dx * dx + dy * dy;
		if (distSq < minDistSq) {
			minDistSq = distSq;
		};
		var cellX = ix | 0;
		var cellY = 1 + iy | 0;
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var dx = x - (cellX + jx);
		var dy = y - (cellY + 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0));
		var distSq = dx * dx + dy * dy;
		if (distSq < minDistSq) {
			minDistSq = distSq;
		};
		var cellX = 1 + ix | 0;
		var cellY = -1 + iy | 0;
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var dx = x - (cellX + jx);
		var dy = y - (cellY + 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0));
		var distSq = dx * dx + dy * dy;
		if (distSq < minDistSq) {
			minDistSq = distSq;
		};
		var cellX = 1 + ix | 0;
		var cellY = iy | 0;
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var dx = x - (cellX + jx);
		var dy = y - (cellY + 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0));
		var distSq = dx * dx + dy * dy;
		if (distSq < minDistSq) {
			minDistSq = distSq;
		};
		var cellX = 1 + ix | 0;
		var cellY = 1 + iy | 0;
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var jx = 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
		var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		var dx = x - (cellX + jx);
		var dy = y - (cellY + 0.353553 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0));
		var distSq = dx * dx + dy * dy;
		if (distSq < minDistSq) {
			minDistSq = distSq;
		};
		return Math.sqrt(minDistSq) * 2 - 1;
	}
	static get __name__() {
		return "dropecho.noise.Worley"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Worley
	}
}


Worley.halfUnitVec = 0.353553