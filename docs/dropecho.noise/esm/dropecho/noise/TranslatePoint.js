import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Offsets input coordinates by (dx, dy) before sampling the source module. Useful for shifting the origin of any noise pattern.
*/
export const TranslatePoint = Register.global("$hxClasses")["dropecho.noise.TranslatePoint"] = 
class TranslatePoint extends Register.inherits() {
	new(input, dx, dy) {
		if (dx == null) {
			dx = 0;
		};
		if (dy == null) {
			dy = 0;
		};
		this.input = input;
		this.dx = dx;
		this.dy = dy;
	}
	value(x, y) {
		return this.input.value(x + this.dx, y + this.dy);
	}
	static get __name__() {
		return "dropecho.noise.TranslatePoint"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return TranslatePoint
	}
}

