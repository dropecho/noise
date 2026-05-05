import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Terrace = Register.global("$hxClasses")["dropecho.noise.Terrace"] = 
class Terrace extends Register.inherits() {
	new(input, points) {
		this.points = points;
		this.input = input;
	}
	value(x, y) {
		var v = this.input.value(x, y);
		if (this.points != null) {
			var _g = 0;
			var _g1 = this.points;
			while (_g < _g1.length) {
				var point = _g1[_g];
				++_g;
				if (v >= point.min && v < point.max) {
					return point.val;
				};
			};
		};
		return v;
	}
	static get __name__() {
		return "dropecho.noise.Terrace"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Terrace
	}
}

