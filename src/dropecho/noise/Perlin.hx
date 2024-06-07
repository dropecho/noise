package dropecho.noise;

import seedyrng.Random;
import dropecho.noise.IModule2D;
import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Perlin implements IModule2D {
	static var random:Random = new Random();

	public function new(octaves:I32 = 1, frequency:F32 = 1, lacunarity:F32 = 2, persistence:F32 = 0.5);

	public function value(x:F32, y:F32):F32 {
		var val:F32 = 0;
		var freq:F32 = this.frequency;
		var cur_persistence:F32 = 1.0;

		for (_ in 0...this.octaves) {
			val += noise(x * freq, y * freq) * cur_persistence;
			freq *= this.lacunarity;
			cur_persistence *= this.persistence;
		}

		return val;
	}

	private static final gradientsx = [
		for (_ in 0...256)
			Math.cos(random.random() * 2 * Math.PI) //       Math.cos(Math.random() * 2 * Math.PI)
	];
	private static final gradientsy = [
		for (_ in 0...256)
			Math.sin(random.random() * 2 * Math.PI) //       Math.sin(Math.random() * 2 * Math.PI)
	];

	private static inline function dot_prod_grid(x:F32, y:F32, vx:I32, vy:I32):F32 {
		var size:Int = 16;
		var i = (vy % size) * size + (vx % size);
		var g_vectx = gradientsx[i];
		var g_vecty = gradientsy[i];
		return (x - vx) * g_vectx + (y - vy) * g_vecty;
	}

	public static inline function noise(x:F32, y:F32):F32 {
		var xf:I32 = FastMath.floor(x);
		var yf:I32 = FastMath.floor(y);
		var xf1:I32 = xf + 1;
		var yf1:I32 = yf + 1;
		var df:F32 = x - xf;

		// Get gradient grid point dot products.
		var top_left = dot_prod_grid(x, y, xf, yf);
		var top_right = dot_prod_grid(x, y, xf1, yf);
		var bottom_left = dot_prod_grid(x, y, xf, yf1);
		var bottom_right = dot_prod_grid(x, y, xf1, yf1);

		var u = MathUtils.fade(df);

		// interpolate
		var xt = MathUtils.lerp(u, top_left, top_right);
		var xb = MathUtils.lerp(u, bottom_left, bottom_right);
		return MathUtils.lerp(MathUtils.fade(y - yf), xt, xb);
	}
}
