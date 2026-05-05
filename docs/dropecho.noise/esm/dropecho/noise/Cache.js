import {ObjectMap} from "../../haxe/ds/ObjectMap.js"
import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Cache = Register.global("$hxClasses")["dropecho.noise.Cache"] = 
class Cache extends Register.inherits() {
	new(input) {
		this.cache = new ObjectMap();
		this.input = input;
	}
	value(x, y) {
		var point = {"x": x, "y": y};
		if (!this.cache.inst.has(point)) {
			var this1 = this.cache;
			var value = this.input.value(x, y);
			this1.inst.set(point, value);
		};
		return this.cache.inst.get(point);
	}
	static get __name__() {
		return "dropecho.noise.Cache"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Cache
	}
}

