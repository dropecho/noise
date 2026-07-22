import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Clamps the source module's output to a [min, max] range. Values outside the range are pinned to the nearest bound.
*/
export const Clamp = Register.global("$hxClasses")["dropecho.noise.Clamp"] = 
class Clamp extends Register.inherits() {
	new(input, min, max) {
		if (min == null) {
			min = -1;
		};
		if (max == null) {
			max = 1;
		};
		this.input = input;
		this.min = min;
		this.max = max;
	}
	value(x, y) {
		var a = this.input.value(x, y);
		var b = this.min;
		var a1 = (a < b) ? b : a;
		var b = this.max;
		if (a1 < b) {
			return a1;
		} else {
			return b;
		};
	}
	static get __name__() {
		return "dropecho.noise.Clamp"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Clamp
	}
}

