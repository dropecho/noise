import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Remaps the source module's output from [inputMin, inputMax] to [outputMin, outputMax] via linear interpolation. Useful for converting noise ranges (e.g. [-1,1] to [0,1]).
*/
export const Normalize = Register.global("$hxClasses")["dropecho.noise.Normalize"] = 
class Normalize extends Register.inherits() {
	new(input, inputMin, inputMax, outputMin, outputMax) {
		if (inputMin == null) {
			inputMin = -1;
		};
		if (inputMax == null) {
			inputMax = 1;
		};
		if (outputMin == null) {
			outputMin = -1;
		};
		if (outputMax == null) {
			outputMax = 1;
		};
		this.input = input;
		this.inputMin = inputMin;
		this.inputMax = inputMax;
		this.outputMin = outputMin;
		this.outputMax = outputMax;
	}
	value(x, y) {
		var t = this.input.value(x, y);
		var a = this.inputMin;
		var from = this.outputMin;
		return from + (this.outputMax - from) * ((t - a) / (this.inputMax - a));
	}
	static get __name__() {
		return "dropecho.noise.Normalize"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Normalize
	}
}

