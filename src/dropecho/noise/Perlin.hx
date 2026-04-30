package dropecho.noise;

import seedyrng.Random;
import dropecho.noise.IModule2D;
import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/**
 * Classic Perlin gradient noise generator. Uses a seeded permutation table for 256-unit tiling
 * and unit-circle gradient vectors. Supports multiple octaves for fractal detail, controlled by
 * lacunarity (frequency multiplier per octave) and persistence (amplitude multiplier per octave).
 */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Perlin implements IModule2D {
	static var random:Random = new Random(69420);

	public function new(octaves:I32 = 1, frequency:F32 = 1, lacunarity:F32 = 2, persistence:F32 = 0.5);

	public function value(x:F32, y:F32):F32 {
		var val:F32 = 0;
		var f:F32 = this.frequency;
		var p:F32 = 1;

		for (_ in 0...this.octaves) {
			val += noise2d(x * f, y * f) * p;
			f *= this.lacunarity;
			p *= this.persistence;
		}

		return val;
	}

	private static final _gradAngles:Array<Float> = [for (_ in 0...256) random.random() * 2 * Math.PI];
	private static final gradients_x:Array<F32> = [for (a in _gradAngles) Math.cos(a)];
	private static final gradients_y:Array<F32> = [for (a in _gradAngles) Math.sin(a)];

	private static final perm:Array<Int> = {
		var arr = [for (i in 0...256) i];
		var i = 255;
		while (i > 0) {
			var j = Std.int(random.random() * (i + 1));
			var tmp = arr[i];
			arr[i] = arr[j];
			arr[j] = tmp;
			i--;
		}
		arr.concat(arr);
	};

	private static inline function dot_prod_grid(x:F32, y:F32, ux:I32, uy:I32):F32 {
		final i = perm[perm[ux & 255] + (uy & 255)];
		final gx = gradients_x[i];
		final gy = gradients_y[i];
		return (x - ux) * gx + (y - uy) * gy;
	}

	public static inline function noise2d(x:F32, y:F32):F32 {
		final X:I32 = FastMath.floor(x);
		final Y:I32 = FastMath.floor(y);

		var top_left = dot_prod_grid(x, y, X, Y);
		var bottom_left = dot_prod_grid(x, y, X, Y + 1);
		var top_right = dot_prod_grid(x, y, X + 1, Y);
		var bottom_right = dot_prod_grid(x, y, X + 1, Y + 1);

		var u = MathUtils.fade(x - X);
		var v = MathUtils.fade(y - Y);

		// @formatter:off
		return MathUtils.lerp(
			MathUtils.lerp(top_left, top_right, u),
			MathUtils.lerp(bottom_left, bottom_right, u),
			v
		);
	}
}
