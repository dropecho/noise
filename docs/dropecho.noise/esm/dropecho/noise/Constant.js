import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Always outputs the same constant value regardless of coordinates. Useful as a fixed input to combiners and selectors.
*/
export const Constant = Register.global("$hxClasses")["dropecho.noise.Constant"] = 
class Constant extends Register.inherits() {
	new(constant) {
		this.constant = constant;
	}
	value(x, y) {
		return this.constant;
	}
	static get __name__() {
		return "dropecho.noise.Constant"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Constant
	}
}

