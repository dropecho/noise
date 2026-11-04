import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Scales input coordinates by a scalar before sampling the source module. Equivalent to multiplying the source module's frequency.
*/
export const Scale = Register.global("$hxClasses")["dropecho.noise.Scale"] = 
class Scale extends Register.inherits() {
	new(input, s) {
		this._input = input;
		this._scalar = s;
	}
	value(x, y) {
		return this._input.value(x * this._scalar, y * this._scalar);
	}
	static get __name__() {
		return "dropecho.noise.Scale"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Scale
	}
}

