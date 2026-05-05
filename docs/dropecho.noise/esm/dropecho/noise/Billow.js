import {Register} from "../../genes/Register.js"
import {Perlin} from "./Perlin.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Billow = Register.global("$hxClasses")["dropecho.noise.Billow"] = 
class Billow extends Register.inherits() {
	new(octaves, frequency, lacunarity, persistence) {
		if (octaves == null) {
			octaves = 1;
		};
		if (frequency == null) {
			frequency = 1;
		};
		if (lacunarity == null) {
			lacunarity = 2;
		};
		if (persistence == null) {
			persistence = 0.5;
		};
		this.persistence = persistence;
		this.octaves = octaves;
		this.lacunarity = lacunarity;
		this.frequency = frequency;
	}
	value(x, y) {
		var val = 0;
		var currentAmplitude = 1;
		var currentFrequency = this.frequency;
		var _g = 0;
		var _g1 = this.octaves;
		while (_g < _g1) {
			++_g;
			var x1 = x * currentFrequency;
			var y1 = y * currentFrequency;
			var X = (x1 >= 0) ? x1 | 0 : x1 - 1 | 0;
			var Y = (y1 >= 0) ? y1 | 0 : y1 - 1 | 0;
			var i = Perlin.perm[Perlin.perm[X & 255] + (Y & 255) | 0];
			var top_left = (x1 - X) * Perlin.gradients_x[i] + (y1 - Y) * Perlin.gradients_y[i];
			var uy = Y + 1 | 0;
			var i1 = Perlin.perm[Perlin.perm[X & 255] + (uy & 255) | 0];
			var bottom_left = (x1 - X) * Perlin.gradients_x[i1] + (y1 - uy) * Perlin.gradients_y[i1];
			var ux = X + 1 | 0;
			var i2 = Perlin.perm[Perlin.perm[ux & 255] + (Y & 255) | 0];
			var ux1 = X + 1 | 0;
			var uy1 = Y + 1 | 0;
			var i3 = Perlin.perm[Perlin.perm[ux1 & 255] + (uy1 & 255) | 0];
			var t = x1 - X;
			var u = t * t * t * (t * (t * 6 - 15) + 10);
			var t1 = y1 - Y;
			var from = top_left + ((x1 - ux) * Perlin.gradients_x[i2] + (y1 - Y) * Perlin.gradients_y[i2] - top_left) * u;
			val += (from + (bottom_left + ((x1 - ux1) * Perlin.gradients_x[i3] + (y1 - uy1) * Perlin.gradients_y[i3] - bottom_left) * u - from) * (t1 * t1 * t1 * (t1 * (t1 * 6 - 15) + 10))) * currentAmplitude;
			currentAmplitude *= this.persistence;
			currentFrequency *= this.lacunarity;
		};
		if (val >= 0) {
			return val;
		} else {
			return -val;
		};
	}
	static get __name__() {
		return "dropecho.noise.Billow"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Billow
	}
}

