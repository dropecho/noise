import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Outputs concentric cylinder cross-section rings aligned along the x-axis. Produces parallel band patterns.
*/
export const Cylinders = Register.global("$hxClasses")["dropecho.noise.Cylinders"] = 
class Cylinders extends Register.inherits() {
	new(frequency) {
		if (frequency == null) {
			frequency = 1;
		};
		this.frequency = frequency;
	}
	value(x, y) {
		var f = x * this.frequency;
		var t = f | 0;
		var f1 = Math.cos((x * this.frequency - (((f < t) ? t - 1 : t) + 0.5)) * Math.PI * 2);
		if (f1 >= 0) {
			return f1;
		} else {
			return -f1;
		};
	}
	static get __name__() {
		return "dropecho.noise.Cylinders"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Cylinders
	}
}

