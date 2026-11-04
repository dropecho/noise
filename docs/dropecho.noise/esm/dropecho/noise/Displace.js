import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
* Displaces input coordinates using separate x and y noise modules before sampling the source.
* If only one displacement module is provided, it is used for both axes.
*/
export const Displace = Register.global("$hxClasses")["dropecho.noise.Displace"] = 
class Displace extends Register.inherits() {
	new(input, xModule, yModule, power) {
		if (power == null) {
			power = 1;
		};
		this._sameModule = false;
		this._input = input;
		this._xModule = xModule;
		this._power = power;
		if (yModule == null) {
			this._sameModule = true;
			this._yModule = xModule;
		} else {
			this._yModule = yModule;
		};
	}
	value(x, y) {
		var xval = this._xModule.value(x, y);
		var yval = (this._sameModule) ? xval : this._yModule.value(x, y);
		return this._input.value(xval * this._power + x, yval * this._power + y);
	}
	static get __name__() {
		return "dropecho.noise.Displace"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Displace
	}
}

