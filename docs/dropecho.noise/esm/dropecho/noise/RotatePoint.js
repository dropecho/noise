import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Rotates input coordinates by a fixed angle (in radians) around the origin before sampling the source module. Cos/sin are pre-computed at construction time.
*/
export const RotatePoint = Register.global("$hxClasses")["dropecho.noise.RotatePoint"] = 
class RotatePoint extends Register.inherits() {
	new(input, angle) {
		if (angle == null) {
			angle = 0;
		};
		this.input = input;
		this.cosAngle = Math.cos(angle);
		this.sinAngle = Math.sin(angle);
	}
	value(x, y) {
		return this.input.value(x * this.cosAngle - y * this.sinAngle, x * this.sinAngle + y * this.cosAngle);
	}
	static get __name__() {
		return "dropecho.noise.RotatePoint"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return RotatePoint
	}
}

