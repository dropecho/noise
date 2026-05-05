import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Cylinders = Register.global("$hxClasses")["dropecho.noise.Cylinders"] = 
class Cylinders extends Register.inherits() {
	new(frequency) {
		if (frequency == null) {
			frequency = 1;
		};
		this.frequency = frequency;
	}
	value(x, y) {
		var f = Math.cos((x * this.frequency - ((x * this.frequency | 0) + 0.5)) * Math.PI * 2);
		if (f >= 0) {
			return f;
		} else {
			return -f;
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

