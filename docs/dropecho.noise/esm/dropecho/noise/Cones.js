import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Outputs a concentric cone cross-section pattern — radial distance from each cell center mapped to a tent-shaped peak.
*/
export const Cones = Register.global("$hxClasses")["dropecho.noise.Cones"] = 
class Cones extends Register.inherits() {
	new(frequency) {
		if (frequency == null) {
			frequency = 1;
		};
		this.frequency = frequency;
	}
	value(x, y) {
		var f = x * this.frequency;
		var t = f | 0;
		var f1 = y * this.frequency;
		var t1 = f1 | 0;
		var x1 = x * this.frequency - (((f < t) ? t - 1 : t) + 0.5);
		var y1 = y * this.frequency - (((f1 < t1) ? t1 - 1 : t1) + 0.5);
		return 1 - Math.sqrt(x1 * x1 + y1 * y1) * 4;
	}
	static get __name__() {
		return "dropecho.noise.Cones"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Cones
	}
}

