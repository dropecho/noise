import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

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

