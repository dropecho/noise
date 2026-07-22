import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Outputs the smaller of two source modules' values at each point.
*/
export const Min = Register.global("$hxClasses")["dropecho.noise.Min"] = 
class Min extends Register.inherits() {
	new(input, input2) {
		this.input = input;
		this.input2 = input2;
	}
	value(x, y) {
		var a = this.input.value(x, y);
		var b = this.input2.value(x, y);
		if (a < b) {
			return a;
		} else {
			return b;
		};
	}
	static get __name__() {
		return "dropecho.noise.Min"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Min
	}
}

