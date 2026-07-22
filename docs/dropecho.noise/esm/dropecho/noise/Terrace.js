import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Maps source module output to discrete stepped values using [min, max, val] control points. Values that fall in a control point's range are snapped to its val; others pass through unchanged.
*/
export const Terrace = Register.global("$hxClasses")["dropecho.noise.Terrace"] = 
class Terrace extends Register.inherits() {
	new(input, points) {
		this.input = input;
		this.n = (points == null) ? 0 : points.length;
		this.mins = new Array(this.n);
		this.maxs = new Array(this.n);
		this.vals = new Array(this.n);
		var _g = 0;
		var _g1 = this.n;
		while (_g < _g1) {
			var i = _g++;
			this.mins[i] = points[i].min;
			this.maxs[i] = points[i].max;
			this.vals[i] = points[i].val;
		};
	}
	value(x, y) {
		var v = this.input.value(x, y);
		var lo = 0;
		var hi = this.n - 1;
		while (lo <= hi) {
			var mid = lo + hi >> 1;
			if (v < this.mins[mid]) {
				hi = mid - 1;
			} else if (v >= this.maxs[mid]) {
				lo = mid + 1;
			} else {
				return this.vals[mid];
			};
		};
		return v;
	}
	static get __name__() {
		return "dropecho.noise.Terrace"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Terrace
	}
}

