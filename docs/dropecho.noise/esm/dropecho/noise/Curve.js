import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
* Maps source module output through a piecewise Catmull-Rom spline defined by
* (input, output) control point pairs. Control points must be sorted by input value.
* Values outside the range of the control points are clamped to the nearest endpoint.
*/
export const Curve = Register.global("$hxClasses")["dropecho.noise.Curve"] = 
class Curve extends Register.inherits() {
	new(input, points) {
		this.input = input;
		this.n = points.length;
		this.inputs = new Array(this.n);
		this.outputs = new Array(this.n);
		var _g = 0;
		var _g1 = this.n;
		while (_g < _g1) {
			var i = _g++;
			this.inputs[i] = points[i].input;
			this.outputs[i] = points[i].output;
		};
	}
	value(x, y) {
		var v = this.input.value(x, y);
		if (this.n == 0) {
			return v;
		};
		if (v <= this.inputs[0]) {
			return this.outputs[0];
		};
		if (v >= this.inputs[this.n - 1]) {
			return this.outputs[this.n - 1];
		};
		var lo = 1;
		var hi = this.n - 1;
		while (lo < hi) {
			var mid = lo + hi >> 1;
			if (this.inputs[mid] < v) {
				lo = mid + 1;
			} else {
				hi = mid;
			};
		};
		var i = lo;
		var p1i = this.inputs[i - 1];
		var t = (v - p1i) / (this.inputs[i] - p1i);
		var p0o = this.outputs[(i - 2 < 0) ? 0 : i - 2];
		var p1o = this.outputs[i - 1];
		var p2o = this.outputs[i];
		var p3o = this.outputs[(i + 1 >= this.n) ? this.n - 1 : i + 1];
		var t2 = t * t;
		return 0.5 * (2 * p1o + (-p0o + p2o) * t + (2 * p0o - 5 * p1o + 4 * p2o - p3o) * t2 + (-p0o + 3 * p1o - 3 * p2o + p3o) * (t2 * t));
	}
	catmullRom(p0, p1, p2, p3, t) {
		var t2 = t * t;
		return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * (t2 * t));
	}
	static get __name__() {
		return "dropecho.noise.Curve"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Curve
	}
}

