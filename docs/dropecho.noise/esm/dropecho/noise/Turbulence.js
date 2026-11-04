import {Register} from "../../genes/Register.js"
import {Simplex} from "./Simplex.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
* Randomly displaces input coordinates using Simplex noise before sampling the source module.
* Independent x and y displacements are generated using different z-slice values of the same noise.
* Power controls displacement magnitude; frequency controls the scale of the distortion.
*/
export const Turbulence = Register.global("$hxClasses")["dropecho.noise.Turbulence"] = 
class Turbulence extends Register.inherits() {
	new(input, power, frequency) {
		if (power == null) {
			power = 1;
		};
		if (frequency == null) {
			frequency = 1;
		};
		this.input = input;
		this.power = power;
		this.frequency = frequency;
	}
	value(x, y) {
		var sx = x * this.frequency;
		var sy = y * this.frequency;
		return this.input.value(x + Simplex.noise(sx, sy, 0.0) * this.power, y + Simplex.noise(sx, sy, 1.0) * this.power);
	}
	static get __name__() {
		return "dropecho.noise.Turbulence"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Turbulence
	}
}

