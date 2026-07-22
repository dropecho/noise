import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Checkerboard pattern generator. Returns 1 and -1 in alternating grid squares.
*/
export const CheckerBoard = Register.global("$hxClasses")["dropecho.noise.CheckerBoard"] = 
class CheckerBoard extends Register.inherits() {
	new(frequency) {
		if (frequency == null) {
			frequency = 1;
		};
		this.frequency = frequency;
	}
	value(x, y) {
		var f = x * this.frequency;
		var t = f | 0;
		var f1 = y * this.frequency;
		var t1 = f1 | 0;
		if (((((f < t) ? t - 1 : t) + ((f1 < t1) ? t1 - 1 : t1) | 0) & 1) == 0) {
			return 1;
		} else {
			return -1;
		};
	}
	static get __name__() {
		return "dropecho.noise.CheckerBoard"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return CheckerBoard
	}
}

