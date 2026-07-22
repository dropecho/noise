import {Register} from "../../genes/Register.js"
import {Simplex} from "./Simplex.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

/**
* Domain warp: iteratively displaces the sample coordinates through Simplex noise before
* evaluating the source module. Each octave feeds the warped position into the next warp,
* producing increasingly complex, swirling distortion.
*/
export const FractalWarp = Register.global("$hxClasses")["dropecho.noise.FractalWarp"] = 
class FractalWarp extends Register.inherits() {
	new(input, warpStrength, warpFrequency, octaves) {
		if (warpStrength == null) {
			warpStrength = 1;
		};
		if (warpFrequency == null) {
			warpFrequency = 1;
		};
		if (octaves == null) {
			octaves = 1;
		};
		this.input = input;
		this.warpStrength = warpStrength;
		this.warpFrequency = warpFrequency;
		this.octaves = octaves;
	}
	value(x, y) {
		var wx = x;
		var wy = y;
		var _g = 0;
		var _g1 = this.octaves;
		while (_g < _g1) {
			++_g;
			var fx = wx * this.warpFrequency;
			var fy = wy * this.warpFrequency;
			wx += Simplex.noise(fx, fy, 0.0) * this.warpStrength;
			wy += Simplex.noise(fx, fy, 1.0) * this.warpStrength;
		};
		return this.input.value(wx, wy);
	}
	static get __name__() {
		return "dropecho.noise.FractalWarp"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return FractalWarp
	}
}

