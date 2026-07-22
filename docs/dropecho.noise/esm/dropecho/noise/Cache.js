import {FPHelper} from "../../haxe/io/FPHelper.js"
import {StringMap} from "../../haxe/ds/StringMap.js"
import {Int64} from "../../haxe/Int64.js"
import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
Caches source module output to avoid redundant computation when the same coordinates are queried repeatedly by multiple consumers.
*/
export const Cache = Register.global("$hxClasses")["dropecho.noise.Cache"] = 
class Cache extends Register.inherits() {
	new(input) {
		this.cache = new StringMap();
		this.input = input;
	}
	value(x, y) {
		var key = Int64.toString(FPHelper.doubleToI64(x)) + ":" + Int64.toString(FPHelper.doubleToI64(y));
		var cached = this.cache.inst.get(key);
		if (cached == null) {
			cached = this.input.value(x, y);
			this.cache.inst.set(key, cached);
		};
		return cached;
	}
	static keyOf(v) {
		return Int64.toString(FPHelper.doubleToI64(v));
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

