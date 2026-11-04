package dropecho.noise;

import haxe.ds.Vector;
import seedyrng.Random;
import dropecho.noise.IModule2D;
import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/**
 * Classic Perlin gradient noise generator. Uses a seeded permutation table for 256-unit tiling
 * and unit-circle gradient vectors. Supports multiple octaves for fractal detail, controlled by
 * lacunarity (frequency multiplier per octave) and persistence (amplitude multiplier per octave).
 */
@:build(dropecho.macros.Constructor.fromArgs())
class Perlin implements IBatchModule2D {
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

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		fractal(out, xs, ys, count, octaves, frequency, lacunarity, persistence);
	}

	/**
	 * Fills out[i] with the same octave sum as Perlin.value at (xs[i], ys[i]).
	 * Shared by Perlin, Billow and Ridged, which differ only in how they map the sum.
	 */
	@:allow(dropecho.noise)
	static function fractal(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int, octaves:I32, frequency:F32, lacunarity:F32,
			persistence:F32):Void {
		for (i in 0...count) {
			out[i] = 0;
		}
		var row = Batch.isRow(ys, count);
		var f:F32 = frequency;
		var p:F32 = 1;

		for (_ in 0...octaves) {
			if (row) {
				addRow(out, xs, ys[0] * f, count, f, p);
			} else {
				for (i in 0...count) {
					out[i] += noise2d(xs[i] * f, ys[i] * f) * p;
				}
			}
			f *= lacunarity;
			p *= persistence;
		}
	}

	/**
	 * Adds one octave along a row: out[i] += noise2d(xs[i] * f, y) * p.
	 * Same arithmetic as noise2d, but the row's terms are computed once per row
	 * and the corner gradients once per cell instead of once per point.
	 */
	static function addRow(out:Vector<F32>, xs:Vector<F32>, y:F32, count:Int, f:F32, p:F32):Void {
		final Y:I32 = FastMath.floor(y);
		final dy:F32 = y - Y;
		final dy1:F32 = y - (Y + 1);
		final top = Y & 255;
		final bottom = (Y + 1) & 255;
		final v = MathUtils.fade(dy);

		var cellX:I32 = 0;
		var haveCell = false;
		var tl = 0, bl = 0, tr = 0, br = 0;

		for (i in 0...count) {
			final x:F32 = xs[i] * f;
			final X:I32 = FastMath.floor(x);
			if (!haveCell || X != cellX) {
				haveCell = true;
				cellX = X;
				final left = perm[X & 255];
				final right = perm[(X + 1) & 255];
				tl = perm[left + top];
				bl = perm[left + bottom];
				tr = perm[right + top];
				br = perm[right + bottom];
			}
			final dx:F32 = x - X;
			final dx1:F32 = x - (X + 1);

			var top_left     = corner(tl, dx,  dy);
			var bottom_left  = corner(bl, dx,  dy1);
			var top_right    = corner(tr, dx1, dy);
			var bottom_right = corner(br, dx1, dy1);

			var u = MathUtils.fade(dx);
			out[i] += MathUtils.lerp(MathUtils.lerp(top_left, top_right, u), MathUtils.lerp(bottom_left, bottom_right, u), v) * p;
		}
	}

	// haxe.ds.Vector compiles to a native array on C# (no Array wrapper indirection)
	// and to a plain array on JS/Python.
	private static final _gradAngles:Array<Float> = [for (_ in 0...256) random.random() * 2 * Math.PI];
	private static final gradients_x:Vector<F32> = Vector.fromArrayCopy([for (a in _gradAngles) (Math.cos(a) : F32)]);
	private static final gradients_y:Vector<F32> = Vector.fromArrayCopy([for (a in _gradAngles) (Math.sin(a) : F32)]);

	private static final perm:Vector<Int> = {
		var arr = [for (i in 0...256) i];
		var i = 255;
		while (i > 0) {
			var j = Std.int(random.random() * (i + 1));
			var tmp = arr[i];
			arr[i] = arr[j];
			arr[j] = tmp;
			i--;
		}
		Vector.fromArrayCopy(arr.concat(arr));
	};

	// Dot product of a corner's gradient with the offset (dx, dy) from that corner.
	private static inline function corner(gradient:Int, dx:F32, dy:F32):F32 {
		return dx * gradients_x[gradient] + dy * gradients_y[gradient];
	}

	public static inline function noise2d(x:F32, y:F32):F32 {
		final X:I32 = FastMath.floor(x);
		final Y:I32 = FastMath.floor(y);

		// Offsets from the corners. Not dx - 1: x - X rounds for negative x.
		final dx:F32 = x - X;
		final dy:F32 = y - Y;
		final dx1:F32 = x - (X + 1);
		final dy1:F32 = y - (Y + 1);

		// Each column's permutation is shared by its two corners.
		final left = perm[X & 255];
		final right = perm[(X + 1) & 255];
		final top = Y & 255;
		final bottom = (Y + 1) & 255;

		var top_left     = corner(perm[left + top],     dx,  dy);
		var bottom_left  = corner(perm[left + bottom],  dx,  dy1);
		var top_right    = corner(perm[right + top],    dx1, dy);
		var bottom_right = corner(perm[right + bottom], dx1, dy1);

		var u = MathUtils.fade(dx);
		var v = MathUtils.fade(dy);

		// @formatter:off
		return MathUtils.lerp(
			MathUtils.lerp(top_left,    top_right,    u),
			MathUtils.lerp(bottom_left, bottom_right, u),
			v
		);
	}
}
