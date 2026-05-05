import {Int32} from "../../haxe/Int32.js"
import {Register} from "../../genes/Register.js"
import {VectorMath} from "../utils/VectorMath.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Voronoi = Register.global("$hxClasses")["dropecho.noise.Voronoi"] = 
class Voronoi extends Register.inherits() {
	new(frequency, distanceType) {
		this.halfUnitVec = 0.353;
		this.frequency = frequency;
		this.distanceType = distanceType;
	}
	value(x, y) {
		x *= this.frequency;
		y *= this.frequency;
		var ix = (x >= 0) ? x | 0 : x - 1 | 0;
		var iy = (y >= 0) ? y | 0 : y - 1 | 0;
		var minDist = 3.40282347e+38;
		var closestCX = 0;
		var closestCY = 0;
		switch (this.distanceType) {
			case 0:
				var _g = -1;
				while (_g < 2) {
					var cx = _g++;
					var cellX = cx + ix | 0;
					var cellY = -1 + iy | 0;
					var jx = this.halfUnitVec;
					var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n = n >> 13 ^ n;
					var b = Int32._mul(n, n);
					var jx1 = jx * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
					var jy = this.halfUnitVec;
					var n1 = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n1 = n1 >> 13 ^ n1;
					var b1 = Int32._mul(n1, n1);
					var dx = x - (cellX + jx1);
					var dy = y - (cellY + jy * ((Int32._mul(n1, b1) & 2147483647) / 1073741824.0 - 1.0));
					var dist = dx * dx + dy * dy;
					if (dist < minDist) {
						minDist = dist;
						closestCX = cellX;
						closestCY = cellY;
					};
					var cellX1 = cx + ix | 0;
					var cellY1 = iy | 0;
					var jx2 = this.halfUnitVec;
					var n2 = (((Int32._mul(cellX1, VectorMath.magicX) + Int32._mul(cellY1, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n2 = n2 >> 13 ^ n2;
					var b2 = Int32._mul(n2, n2);
					var jx3 = jx2 * ((Int32._mul(n2, b2) & 2147483647) / 1073741824.0 - 1.0);
					var jy1 = this.halfUnitVec;
					var n3 = (((Int32._mul(cellX1, VectorMath.magicX) + Int32._mul(cellY1, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n3 = n3 >> 13 ^ n3;
					var b3 = Int32._mul(n3, n3);
					var dx1 = x - (cellX1 + jx3);
					var dy1 = y - (cellY1 + jy1 * ((Int32._mul(n3, b3) & 2147483647) / 1073741824.0 - 1.0));
					var dist1 = dx1 * dx1 + dy1 * dy1;
					if (dist1 < minDist) {
						minDist = dist1;
						closestCX = cellX1;
						closestCY = cellY1;
					};
					var cellX2 = cx + ix | 0;
					var cellY2 = 1 + iy | 0;
					var jx4 = this.halfUnitVec;
					var n4 = (((Int32._mul(cellX2, VectorMath.magicX) + Int32._mul(cellY2, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n4 = n4 >> 13 ^ n4;
					var b4 = Int32._mul(n4, n4);
					var jx5 = jx4 * ((Int32._mul(n4, b4) & 2147483647) / 1073741824.0 - 1.0);
					var jy2 = this.halfUnitVec;
					var n5 = (((Int32._mul(cellX2, VectorMath.magicX) + Int32._mul(cellY2, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n5 = n5 >> 13 ^ n5;
					var b5 = Int32._mul(n5, n5);
					var dx2 = x - (cellX2 + jx5);
					var dy2 = y - (cellY2 + jy2 * ((Int32._mul(n5, b5) & 2147483647) / 1073741824.0 - 1.0));
					var dist2 = dx2 * dx2 + dy2 * dy2;
					if (dist2 < minDist) {
						minDist = dist2;
						closestCX = cellX2;
						closestCY = cellY2;
					};
				};
				break
			case 1:
				var _g = -1;
				while (_g < 2) {
					var cx = _g++;
					var cellX = cx + ix | 0;
					var cellY = -1 + iy | 0;
					var jx = this.halfUnitVec;
					var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n = n >> 13 ^ n;
					var b = Int32._mul(n, n);
					var jx1 = jx * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
					var jy = this.halfUnitVec;
					var n1 = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n1 = n1 >> 13 ^ n1;
					var b1 = Int32._mul(n1, n1);
					var dx = x - (cellX + jx1);
					var dy = y - (cellY + jy * ((Int32._mul(n1, b1) & 2147483647) / 1073741824.0 - 1.0));
					var dist = ((dx >= 0) ? dx : -dx) + ((dy >= 0) ? dy : -dy);
					if (dist < minDist) {
						minDist = dist;
						closestCX = cellX;
						closestCY = cellY;
					};
					var cellX1 = cx + ix | 0;
					var cellY1 = iy | 0;
					var jx2 = this.halfUnitVec;
					var n2 = (((Int32._mul(cellX1, VectorMath.magicX) + Int32._mul(cellY1, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n2 = n2 >> 13 ^ n2;
					var b2 = Int32._mul(n2, n2);
					var jx3 = jx2 * ((Int32._mul(n2, b2) & 2147483647) / 1073741824.0 - 1.0);
					var jy1 = this.halfUnitVec;
					var n3 = (((Int32._mul(cellX1, VectorMath.magicX) + Int32._mul(cellY1, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n3 = n3 >> 13 ^ n3;
					var b3 = Int32._mul(n3, n3);
					var dx1 = x - (cellX1 + jx3);
					var dy1 = y - (cellY1 + jy1 * ((Int32._mul(n3, b3) & 2147483647) / 1073741824.0 - 1.0));
					var dist1 = ((dx1 >= 0) ? dx1 : -dx1) + ((dy1 >= 0) ? dy1 : -dy1);
					if (dist1 < minDist) {
						minDist = dist1;
						closestCX = cellX1;
						closestCY = cellY1;
					};
					var cellX2 = cx + ix | 0;
					var cellY2 = 1 + iy | 0;
					var jx4 = this.halfUnitVec;
					var n4 = (((Int32._mul(cellX2, VectorMath.magicX) + Int32._mul(cellY2, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n4 = n4 >> 13 ^ n4;
					var b4 = Int32._mul(n4, n4);
					var jx5 = jx4 * ((Int32._mul(n4, b4) & 2147483647) / 1073741824.0 - 1.0);
					var jy2 = this.halfUnitVec;
					var n5 = (((Int32._mul(cellX2, VectorMath.magicX) + Int32._mul(cellY2, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n5 = n5 >> 13 ^ n5;
					var b5 = Int32._mul(n5, n5);
					var dx2 = x - (cellX2 + jx5);
					var dy2 = y - (cellY2 + jy2 * ((Int32._mul(n5, b5) & 2147483647) / 1073741824.0 - 1.0));
					var dist2 = ((dx2 >= 0) ? dx2 : -dx2) + ((dy2 >= 0) ? dy2 : -dy2);
					if (dist2 < minDist) {
						minDist = dist2;
						closestCX = cellX2;
						closestCY = cellY2;
					};
				};
				break
			case 2:
				var _g = -1;
				while (_g < 2) {
					var cx = _g++;
					var cellX = cx + ix | 0;
					var cellY = -1 + iy | 0;
					var jx = this.halfUnitVec;
					var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n = n >> 13 ^ n;
					var b = Int32._mul(n, n);
					var jx1 = jx * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
					var jy = this.halfUnitVec;
					var n1 = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n1 = n1 >> 13 ^ n1;
					var b1 = Int32._mul(n1, n1);
					var dx = x - (cellX + jx1);
					var dy = y - (cellY + jy * ((Int32._mul(n1, b1) & 2147483647) / 1073741824.0 - 1.0));
					var a = (dx >= 0) ? dx : -dx;
					var b2 = (dy >= 0) ? dy : -dy;
					var dist = (a < b2) ? b2 : a;
					if (dist < minDist) {
						minDist = dist;
						closestCX = cellX;
						closestCY = cellY;
					};
					var cellX1 = cx + ix | 0;
					var cellY1 = iy | 0;
					var jx2 = this.halfUnitVec;
					var n2 = (((Int32._mul(cellX1, VectorMath.magicX) + Int32._mul(cellY1, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n2 = n2 >> 13 ^ n2;
					var b3 = Int32._mul(n2, n2);
					var jx3 = jx2 * ((Int32._mul(n2, b3) & 2147483647) / 1073741824.0 - 1.0);
					var jy1 = this.halfUnitVec;
					var n3 = (((Int32._mul(cellX1, VectorMath.magicX) + Int32._mul(cellY1, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n3 = n3 >> 13 ^ n3;
					var b4 = Int32._mul(n3, n3);
					var dx1 = x - (cellX1 + jx3);
					var dy1 = y - (cellY1 + jy1 * ((Int32._mul(n3, b4) & 2147483647) / 1073741824.0 - 1.0));
					var a1 = (dx1 >= 0) ? dx1 : -dx1;
					var b5 = (dy1 >= 0) ? dy1 : -dy1;
					var dist1 = (a1 < b5) ? b5 : a1;
					if (dist1 < minDist) {
						minDist = dist1;
						closestCX = cellX1;
						closestCY = cellY1;
					};
					var cellX2 = cx + ix | 0;
					var cellY2 = 1 + iy | 0;
					var jx4 = this.halfUnitVec;
					var n4 = (((Int32._mul(cellX2, VectorMath.magicX) + Int32._mul(cellY2, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n4 = n4 >> 13 ^ n4;
					var b6 = Int32._mul(n4, n4);
					var jx5 = jx4 * ((Int32._mul(n4, b6) & 2147483647) / 1073741824.0 - 1.0);
					var jy2 = this.halfUnitVec;
					var n5 = (((Int32._mul(cellX2, VectorMath.magicX) + Int32._mul(cellY2, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
					n5 = n5 >> 13 ^ n5;
					var b7 = Int32._mul(n5, n5);
					var dx2 = x - (cellX2 + jx5);
					var dy2 = y - (cellY2 + jy2 * ((Int32._mul(n5, b7) & 2147483647) / 1073741824.0 - 1.0));
					var a2 = (dx2 >= 0) ? dx2 : -dx2;
					var b8 = (dy2 >= 0) ? dy2 : -dy2;
					var dist2 = (a2 < b8) ? b8 : a2;
					if (dist2 < minDist) {
						minDist = dist2;
						closestCX = cellX2;
						closestCY = cellY2;
					};
				};
				break
			default:
			var _g = -1;
			while (_g < 2) {
				var cx = _g++;
				var cellX = cx + ix | 0;
				var cellY = -1 + iy | 0;
				var jx = this.halfUnitVec;
				var n = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
				n = n >> 13 ^ n;
				var b = Int32._mul(n, n);
				var jx1 = jx * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
				var jy = this.halfUnitVec;
				var n1 = (((Int32._mul(cellX, VectorMath.magicX) + Int32._mul(cellY, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
				n1 = n1 >> 13 ^ n1;
				var b1 = Int32._mul(n1, n1);
				var dx = x - (cellX + jx1);
				var dy = y - (cellY + jy * ((Int32._mul(n1, b1) & 2147483647) / 1073741824.0 - 1.0));
				var dist = dx * dx + dy * dy;
				if (dist < minDist) {
					minDist = dist;
					closestCX = cellX;
					closestCY = cellY;
				};
				var cellX1 = cx + ix | 0;
				var cellY1 = iy | 0;
				var jx2 = this.halfUnitVec;
				var n2 = (((Int32._mul(cellX1, VectorMath.magicX) + Int32._mul(cellY1, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
				n2 = n2 >> 13 ^ n2;
				var b2 = Int32._mul(n2, n2);
				var jx3 = jx2 * ((Int32._mul(n2, b2) & 2147483647) / 1073741824.0 - 1.0);
				var jy1 = this.halfUnitVec;
				var n3 = (((Int32._mul(cellX1, VectorMath.magicX) + Int32._mul(cellY1, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
				n3 = n3 >> 13 ^ n3;
				var b3 = Int32._mul(n3, n3);
				var dx1 = x - (cellX1 + jx3);
				var dy1 = y - (cellY1 + jy1 * ((Int32._mul(n3, b3) & 2147483647) / 1073741824.0 - 1.0));
				var dist1 = dx1 * dx1 + dy1 * dy1;
				if (dist1 < minDist) {
					minDist = dist1;
					closestCX = cellX1;
					closestCY = cellY1;
				};
				var cellX2 = cx + ix | 0;
				var cellY2 = 1 + iy | 0;
				var jx4 = this.halfUnitVec;
				var n4 = (((Int32._mul(cellX2, VectorMath.magicX) + Int32._mul(cellY2, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
				n4 = n4 >> 13 ^ n4;
				var b4 = Int32._mul(n4, n4);
				var jx5 = jx4 * ((Int32._mul(n4, b4) & 2147483647) / 1073741824.0 - 1.0);
				var jy2 = this.halfUnitVec;
				var n5 = (((Int32._mul(cellX2, VectorMath.magicX) + Int32._mul(cellY2, VectorMath.magicY) | 0) + Int32._mul(1, VectorMath.magicZ) | 0) + Int32._mul(0, VectorMath.magicS) | 0) & 2147483647;
				n5 = n5 >> 13 ^ n5;
				var b5 = Int32._mul(n5, n5);
				var dx2 = x - (cellX2 + jx5);
				var dy2 = y - (cellY2 + jy2 * ((Int32._mul(n5, b5) & 2147483647) / 1073741824.0 - 1.0));
				var dist2 = dx2 * dx2 + dy2 * dy2;
				if (dist2 < minDist) {
					minDist = dist2;
					closestCX = cellX2;
					closestCY = cellY2;
				};
			};
			
		};
		var n = (((Int32._mul(closestCX, VectorMath.magicX) + Int32._mul(closestCY, VectorMath.magicY) | 0) + Int32._mul(0, VectorMath.magicZ) | 0) + Int32._mul(1, VectorMath.magicS) | 0) & 2147483647;
		n = n >> 13 ^ n;
		var b = Int32._mul(n, n);
		return (Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0;
	}
	static get __name__() {
		return "dropecho.noise.Voronoi"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Voronoi
	}
}

