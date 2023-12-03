package dropecho.noise;

import dropecho.utils.Vector.Vector2_struct;
import dropecho.noise.IModule2D;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Perlin implements IModule2D {
	private static var gradients = new Array<Vector2_struct>();

	public function new(octaves:Int = 1, frequency:Float = 1, amplitude:Float = 1, lacunarity:Float = 2, persistence:Float = 1);

	public function value(x:Float, y:Float):Float {
		var max:Float = 0; // sum all amplitudes for normalization.
		var val:Float = 0;

		var amp = this.amplitude;
		var freq = this.frequency;

		for (_ in 0...this.octaves) {
			val += noise(x * freq, y * freq) * amp;

			max += amp;
			amp *= this.persistence;
			freq *= this.lacunarity;
		}

		return val;
	}

	private static inline function randomVector():Vector2_struct {
		var theta = Math.random() * 2 * Math.PI;
		return {x: Math.cos(theta), y: Math.sin(theta)};
	}

	private static inline function dot_prod_grid(x:Float, y:Float, vx:Int, vy:Int) {
		var size = 16;
		var i = (vy % size) * size + (vx % size);
		var g_vect = gradients[i] != null ? gradients[i] : gradients[i] = randomVector();
		return (x - vx) * g_vect.x + (y - vy) * g_vect.y;
	}

	private static inline function interpolate(w:Float, a0:Float, a1:Float):Float {
		// return (a1 - a0) * w + a0;
		// Use this cubic interpolation [[Smoothstep]] instead, for a smooth appearance:
		return (a1 - a0) * (3.0 - w * 2.0) * w * w + a0;
		// Use [[Smootherstep]] for an even smoother result with a second derivative equal to zero on boundaries:
		// return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10.0) * w * w * w) + a0;
	}

	public static inline function noise(x:Float, y:Float) {
		var xf = Std.int(x);
		var yf = Std.int(y);
		var xf1 = xf + 1;
		var yf1 = yf + 1;
		var df = x - xf;

		// Get gradient grid point dot products.
		var top_left = dot_prod_grid(x, y, xf, yf);
		var top_right = dot_prod_grid(x, y, xf1, yf);
		var bottom_left = dot_prod_grid(x, y, xf, yf1);
		var bottom_right = dot_prod_grid(x, y, xf1, yf1);

		// interpolate
		var xt = interpolate(df, top_left, top_right);
		var xb = interpolate(df, bottom_left, bottom_right);
		return interpolate(y - yf, xt, xb);
	}
}
