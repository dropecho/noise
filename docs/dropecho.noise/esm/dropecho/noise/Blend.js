import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Linearly interpolates between two source modules using a third module as the blend factor. The blender output is used directly as the lerp alpha.
*/
export const Blend = Register.global("$hxClasses")["dropecho.noise.Blend"] = 
class Blend extends Register.inherits() {
	new(from, to, blender) {
		this.from = from;
		this.to = to;
		this.blender = blender;
	}
	value(x, y) {
		var blendValue = this.blender.value(x, y);
		if (blendValue <= 0) {
			return this.from.value(x, y);
		};
		if (blendValue >= 1) {
			return this.to.value(x, y);
		};
		var from = this.from.value(x, y);
		return from + (this.to.value(x, y) - from) * blendValue;
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

