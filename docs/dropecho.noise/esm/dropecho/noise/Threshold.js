import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Returns 1.0 if the source module's output meets or exceeds the cutoff, else -1.0. Useful for generating binary land/sea or solid/empty masks.
*/
export const Threshold = Register.global("$hxClasses")["dropecho.noise.Threshold"] = 
class Threshold extends Register.inherits() {
	new(input, cutoff) {
		if (cutoff == null) {
			cutoff = 0;
		};
		this.input = input;
		this.cutoff = cutoff;
	}
	value(x, y) {
		if (this.input.value(x, y) >= this.cutoff) {
			return 1.0;
		} else {
			return -1.0;
		};
	}
	static get __name__() {
		return "dropecho.noise.Threshold"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Threshold
	}
}

