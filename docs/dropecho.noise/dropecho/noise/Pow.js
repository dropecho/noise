import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Pow = Register.global("$hxClasses")["dropecho.noise.Pow"] = 
class Pow extends Register.inherits() {
	new(input, input2) {
		this.input2 = input2;
		this.input = input;
	}
	value(x, y) {
		return Math.pow(this.input.value(x, y), this.input2.value(x, y));
	}
	static get __name__() {
		return "dropecho.noise.Pow"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Pow
	}
}

