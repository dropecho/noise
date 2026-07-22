import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
* Applies an exponential curve to the source module's output via pow((v+1)/2, exp)*2-1.
* exp > 1 sharpens peaks and pushes midtones toward -1; exp < 1 flattens and pushes toward +1.
*/
export const Exponent = Register.global("$hxClasses")["dropecho.noise.Exponent"] = 
class Exponent extends Register.inherits() {
	new(input, exp) {
		if (exp == null) {
			exp = 1;
		};
		this.input = input;
		this.exp = exp;
	}
	value(x, y) {
		return Math.pow((this.input.value(x, y) + 1.0) / 2.0, this.exp) * 2.0 - 1.0;
	}
	static get __name__() {
		return "dropecho.noise.Exponent"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Exponent
	}
}

