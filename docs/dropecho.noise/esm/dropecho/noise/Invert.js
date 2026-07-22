import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Negates the source module's output (multiplies by -1). Peaks become valleys and vice versa.
*/
export const Invert = Register.global("$hxClasses")["dropecho.noise.Invert"] = 
class Invert extends Register.inherits() {
	new(input) {
		this.input = input;
	}
	value(x, y) {
		return -this.input.value(x, y);
	}
	static get __name__() {
		return "dropecho.noise.Invert"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Invert
	}
}

