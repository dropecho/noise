import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const CheckerBoard = Register.global("$hxClasses")["dropecho.noise.CheckerBoard"] = 
class CheckerBoard extends Register.inherits() {
	new(frequency) {
		if (frequency == null) {
			frequency = 1;
		};
		this.frequency = frequency;
	}
	value(x, y) {
		if (((x * this.frequency | 0) + (y * this.frequency | 0)) % 2 == 0) {
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

