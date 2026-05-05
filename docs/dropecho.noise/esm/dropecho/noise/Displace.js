import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Displace = Register.global("$hxClasses")["dropecho.noise.Displace"] = 
class Displace extends Register.inherits() {
	new(input, xModule, yModule) {
		this.same_module = false;
		this.power = 100;
		this._input = input;
		this._xModule = xModule;
		if (yModule == null) {
			this.same_module = true;
			this._yModule = xModule;
		} else {
			this._yModule = yModule;
		};
	}
	value(x, y) {
		var xval = this._xModule.value(x, y);
		var yval = (this.same_module) ? xval : this._yModule.value(x, y);
		return this._input.value(xval * this.power + x, yval * this.power + y);
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

