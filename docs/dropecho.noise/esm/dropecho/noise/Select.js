import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
* Outputs one of two source modules based on a control module's value relative to a threshold.
* When falloff > 0, a smooth fade is applied in the region [threshold - falloff, threshold + falloff]
* using a 5th-order fade curve. Outside that region the selection is hard.
*/
export const Select = Register.global("$hxClasses")["dropecho.noise.Select"] = 
class Select extends Register.inherits() {
	new(a, b, control, threshold, falloff) {
		if (threshold == null) {
			threshold = 0;
		};
		if (falloff == null) {
			falloff = 0;
		};
		this.a = a;
		this.b = b;
		this.control = control;
		this.threshold = threshold;
		this.falloff = falloff;
	}
	value(x, y) {
		var cv = this.control.value(x, y);
		if (this.falloff <= 0) {
			if (cv < this.threshold) {
				return this.a.value(x, y);
			} else {
				return this.b.value(x, y);
			};
		};
		var lo = this.threshold - this.falloff;
		var hi = this.threshold + this.falloff;
		if (cv < lo) {
			return this.a.value(x, y);
		};
		if (cv > hi) {
			return this.b.value(x, y);
		};
		var t = (cv - lo) / (this.falloff * 2);
		var t1 = t * t * t * (t * (t * 6 - 15) + 10);
		if (t1 <= 0) {
			return this.a.value(x, y);
		};
		if (t1 >= 1) {
			return this.b.value(x, y);
		};
		var from = this.a.value(x, y);
		return from + (this.b.value(x, y) - from) * t1;
	}
	static get __name__() {
		return "dropecho.noise.Select"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Select
	}
}

