import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Outputs concentric ring patterns based on radial distance from the origin. Output peaks (+1) at half-integer distances and troughs (-1) at integer distances.
*/
export const Spheres = Register.global("$hxClasses")["dropecho.noise.Spheres"] = 
class Spheres extends Register.inherits() {
	new(frequency) {
		if (frequency == null) {
			frequency = 1;
		};
		this.frequency = frequency;
	}
	value(x, y) {
		var dist = Math.sqrt(x * x + y * y) * this.frequency;
		var t = dist | 0;
		var f = dist - ((dist < t) ? t - 1 : t) - 0.5;
		return 1.0 - 4.0 * ((f >= 0) ? f : -f);
	}
	static get __name__() {
		return "dropecho.noise.Spheres"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Spheres
	}
}

