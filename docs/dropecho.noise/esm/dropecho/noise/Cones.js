import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Cones = Register.global("$hxClasses")["dropecho.noise.Cones"] = 
class Cones extends Register.inherits() {
	new(frequency) {
		if (frequency == null) {
			frequency = 1;
		};
		this.frequency = frequency;
	}
	value(x, y) {
		var x1 = x * this.frequency - ((x * this.frequency | 0) + 0.5);
		var y1 = y * this.frequency - ((y * this.frequency | 0) + 0.5);
		return 1 - Math.sqrt(x1 * x1 + y1 * y1) * 4;
	}
	static get __name__() {
		return "dropecho.noise.Cones"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Cones
	}
}

