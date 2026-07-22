import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Applies a linear transform (output * scale + bias) to the source module's output. Use to remap value ranges or adjust contrast.
*/
export const ScaleBias = Register.global("$hxClasses")["dropecho.noise.ScaleBias"] = 
class ScaleBias extends Register.inherits() {
	new(input, scale, bias) {
		if (scale == null) {
			scale = 1;
		};
		if (bias == null) {
			bias = 0;
		};
		this.input = input;
		this.scale = scale;
		this.bias = bias;
	}
	value(x, y) {
		return this.input.value(x, y) * this.scale + this.bias;
	}
	static get __name__() {
		return "dropecho.noise.ScaleBias"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return ScaleBias
	}
}

