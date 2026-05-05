import {Random} from "../../seedyrng/Random.js"
import {___Int64} from "../../haxe/Int64.js"
import {Register} from "../../genes/Register.js"
import {IModule2D} from "./IModule2D.js"

const $global = Register.$global

export const Perlin = Register.global("$hxClasses")["dropecho.noise.Perlin"] = 
class Perlin extends Register.inherits() {
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
		var f = this.frequency;
		var p = 1;
		var _g = 0;
		var _g1 = this.octaves;
		while (_g < _g1) {
			++_g;
			var x1 = x * f;
			var y1 = y * f;
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
			val += (from + (bottom_left + ((x1 - ux1) * Perlin.gradients_x[i3] + (y1 - uy1) * Perlin.gradients_y[i3] - bottom_left) * u - from) * (t1 * t1 * t1 * (t1 * (t1 * 6 - 15) + 10))) * p;
			f *= this.lacunarity;
			p *= this.persistence;
		};
		return val;
	}
	static dot_prod_grid(x, y, ux, uy) {
		var i = Perlin.perm[Perlin.perm[ux & 255] + (uy & 255) | 0];
		return (x - ux) * Perlin.gradients_x[i] + (y - uy) * Perlin.gradients_y[i];
	}
	static noise2d(x, y) {
		var X = (x >= 0) ? x | 0 : x - 1 | 0;
		var Y = (y >= 0) ? y | 0 : y - 1 | 0;
		var i = Perlin.perm[Perlin.perm[X & 255] + (Y & 255) | 0];
		var top_left = (x - X) * Perlin.gradients_x[i] + (y - Y) * Perlin.gradients_y[i];
		var uy = Y + 1 | 0;
		var i = Perlin.perm[Perlin.perm[X & 255] + (uy & 255) | 0];
		var bottom_left = (x - X) * Perlin.gradients_x[i] + (y - uy) * Perlin.gradients_y[i];
		var ux = X + 1 | 0;
		var i = Perlin.perm[Perlin.perm[ux & 255] + (Y & 255) | 0];
		var ux1 = X + 1 | 0;
		var uy = Y + 1 | 0;
		var i1 = Perlin.perm[Perlin.perm[ux1 & 255] + (uy & 255) | 0];
		var t = x - X;
		var u = t * t * t * (t * (t * 6 - 15) + 10);
		var t = y - Y;
		var from = top_left + ((x - ux) * Perlin.gradients_x[i] + (y - Y) * Perlin.gradients_y[i] - top_left) * u;
		return from + (bottom_left + ((x - ux1) * Perlin.gradients_x[i1] + (y - uy) * Perlin.gradients_y[i1] - bottom_left) * u - from) * (t * t * t * (t * (t * 6 - 15) + 10));
	}
	static get __name__() {
		return "dropecho.noise.Perlin"
	}
	static get __interfaces__() {
		return [IModule2D]
	}
	get __class__() {
		return Perlin
	}
}


Perlin.random = new Random(new ___Int64(0, 69420))
Perlin._gradAngles = (function($this) {var $r0
	var _g = [];
	{
		var _g1 = 0;
		while (_g1 < 256) {
			++_g1;
			_g.push(Perlin.random.random() * 2 * Math.PI);
		};
	};
	
	$r0 = _g
	return $r0})(this)
Perlin.gradients_x = (function($this) {var $r0
	var _g = [];
	{
		var _g1 = 0;
		var _g2 = Perlin._gradAngles;
		while (_g1 < _g2.length) _g.push(Math.cos(_g2[_g1++]));
	};
	
	$r0 = _g
	return $r0})(this)
Perlin.gradients_y = (function($this) {var $r0
	var _g = [];
	{
		var _g1 = 0;
		var _g2 = Perlin._gradAngles;
		while (_g1 < _g2.length) _g.push(Math.sin(_g2[_g1++]));
	};
	
	$r0 = _g
	return $r0})(this)
Perlin.perm = (function($this) {var $r0
	var _g = [];
	{
		var _g1 = 0;
		while (_g1 < 256) _g.push(_g1++);
	};
	var i = 255;
	while (i > 0) {
		var j = Perlin.random.random() * (i + 1) | 0;
		var tmp = _g[i];
		_g[i] = _g[j];
		_g[j] = tmp;
		--i;
	};
	
	$r0 = _g.concat(_g)
	return $r0})(this)