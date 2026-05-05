import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Blend = Register.global("$hxClasses")["dropecho.noise.Blend"] = 
class Blend extends Register.inherits() {
	new(from, to, blender) {
		this.to = to;
		this.from = from;
		this.blender = blender;
	}
	value(x, y) {
		var fromValue = this.from.value(x, y);
		return fromValue + (this.to.value(x, y) - fromValue) * this.blender.value(x, y);
	}
	static get __name__() {
		return "dropecho.noise.Blend"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Blend
	}
}

