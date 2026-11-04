import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Outputs the product of two source modules' values. Useful for masking one noise pattern with another.
*/
export const Multiply = Register.global("$hxClasses")["dropecho.noise.Multiply"] = 
class Multiply extends Register.inherits() {
	new(input, input2) {
		this.input = input;
		this.input2 = input2;
	}
	value(x, y) {
		return this.input.value(x, y) * this.input2.value(x, y);
	}
	static get __name__() {
		return "dropecho.noise.Multiply"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Multiply
	}
}

