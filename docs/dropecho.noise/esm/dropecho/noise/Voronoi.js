import {Int32} from "../../haxe/Int32.js"
import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
* Voronoi (cellular) noise generator. Divides space into cells seeded by a fast integer hash,
* then outputs a hash value of the nearest cell center. Supports Euclidean, Manhattan, and
* Chebyshev distance metrics via the DistanceType enum.
*/
export const Voronoi = Register.global("$hxClasses")["dropecho.noise.Voronoi"] = 
class Voronoi extends Register.inherits() {
	new(frequency, distanceType) {
		this.frequency = frequency;
		this.distanceType = distanceType;
	}
	value(x, y) {
		x *= this.frequency;
		y *= this.frequency;
		var t = x | 0;
		var ix = (x < t) ? t - 1 : t;
		var t = y | 0;
		var iy = (y < t) ? t - 1 : t;
		var minDist = 3.40282347e+38;
		var closestCX = 0;
		var closestCY = 0;
		var _g = -1;
		while (_g < 2) {
			var cx = _g++;
			var _g1 = -1;
			while (_g1 < 2) {
				var cellX = cx + ix | 0;
				var cellY = _g1++ + iy | 0;
				var n = (((Int32._mul(cellX, 9167) + Int32._mul(cellY, 41179) | 0) + Int32._mul(0, 9167) | 0) + Int32._mul(0, 4819) | 0) & 2147483647;
				n = n >> 13 ^ n;
				var b = Int32._mul(n, n);
				var jx = 0.353 * ((Int32._mul(n, b) & 2147483647) / 1073741824.0 - 1.0);
				var n1 = (((Int32._mul(cellX, 9167) + Int32._mul(cellY, 41179) | 0) + Int32._mul(1, 9167) | 0) + Int32._mul(0, 4819) | 0) & 2147483647;
				n1 = n1 >> 13 ^ n1;
				var b1 = Int32._mul(n1, n1);
				var dx = x - (cellX + jx);
				var dy = y - (cellY + 0.353 * ((Int32._mul(n1, b1) & 2147483647) / 1073741824.0 - 1.0));
				var dist;
				switch (this.distanceType) {
					case 0:
						dist = dx * dx + dy * dy;
						break
					case 1:
						dist = ((dx >= 0) ? dx : -dx) + ((dy >= 0) ? dy : -dy);
						break
					case 2:
						var a = (dx >= 0) ? dx : -dx;
						var b2 = (dy >= 0) ? dy : -dy;
						dist = (a < b2) ? b2 : a;
						break
					default:
					dist = dx * dx + dy * dy;
					
				};
				if (dist < minDist) {
					minDist = dist;
					closestCX = cellX;
					closestCY = cellY;
				};
			};
		};
		var n = (((Int32._mul(closestCX, 9167) + Int32._mul(closestCY, 41179) | 0) + Int32._mul(0, 9167) | 0) + Int32._mul(1, 4819) | 0) & 2147483647;
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


Voronoi.halfUnitVec = 0.353