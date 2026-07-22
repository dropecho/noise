import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Outputs the sum of two source modules' values.
*/
export const Add = Register.global("$hxClasses")["dropecho.noise.Add"] = 
class Add extends Register.inherits() {
	new(input, input2) {
		this.input = input;
		this.input2 = input2;
	}
	value(x, y) {
		return this.input.value(x, y) + this.input2.value(x, y);
	}
	static get __name__() {
		return "dropecho.noise.Add"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Add
	}
}

