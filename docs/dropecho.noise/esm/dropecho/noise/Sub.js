import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Outputs the difference of two source modules' values (input - input2).
*/
export const Sub = Register.global("$hxClasses")["dropecho.noise.Sub"] = 
class Sub extends Register.inherits() {
	new(input, input2) {
		this.input = input;
		this.input2 = input2;
	}
	value(x, y) {
		return this.input.value(x, y) - this.input2.value(x, y);
	}
	static get __name__() {
		return "dropecho.noise.Sub"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Sub
	}
}

