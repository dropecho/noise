import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Outputs the absolute value of the source module's output. Maps [-1, 0] to [0, 1], so all output is non-negative.
*/
export const Abs = Register.global("$hxClasses")["dropecho.noise.Abs"] = 
class Abs extends Register.inherits() {
	new(input) {
		this.input = input;
	}
	value(x, y) {
		var f = this.input.value(x, y);
		if (f >= 0) {
			return f;
		} else {
			return -f;
		};
	}
	static get __name__() {
		return "dropecho.noise.Abs"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Abs
	}
}

