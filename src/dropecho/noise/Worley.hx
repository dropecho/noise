package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.VectorMath;
import dropecho.utils.FastMath;

/**
 * Worley (F1 cellular) noise generator. Returns the Euclidean distance to the nearest
 * jittered cell center, scaled to approximately [-1, 1]. Produces a bubbly or cobblestone look.
 */
@:build(dropecho.macros.Constructor.fromArgs())
class Worley implements IGridModule2D {
	private static inline final halfUnitVec:F32 = 0.353553;

	public function new(frequency:F32);

	public function value(x:F32, y:F32):F32 {
		x *= frequency;
		y *= frequency;

		var ix = FastMath.floor(x);
		var iy = FastMath.floor(y);

		var minDistSq:F32 = MAX_F32;

		// Nearest columns and rows first, so cells that cannot hold a closer point
		// are usually skipped before hashing.
		for (i in 0...3) {
			var cellX = ix + VectorMath.searchOffset(i);
			var gapX:F32 = VectorMath.cellGap(x - cellX);
			if (gapX * gapX >= minDistSq) continue;

			for (j in 0...3) {
				var cellY = iy + VectorMath.searchOffset(j);
				var gapY:F32 = VectorMath.cellGap(y - cellY);
				if (gapX * gapX + gapY * gapY >= minDistSq) continue;

				var base = VectorMath.cellBase(cellX, cellY);
				var jx:F32 = halfUnitVec * VectorMath.toSigned(VectorMath.cellHash(base, VectorMath.JITTER_X));
				var jy:F32 = halfUnitVec * VectorMath.toSigned(VectorMath.cellHash(base, VectorMath.JITTER_Y));
				var dx:F32 = x - (cellX + jx);
				var dy:F32 = y - (cellY + jy);
				var distSq:F32 = dx * dx + dy * dy;
				if (distSq < minDistSq) {
					minDistSq = distSq;
				}
			}
		}

		return (FastMath.sqrt(minDistSq) * 2) - 1;
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		// A direct call per point, so the JIT can inline it; no shared per-row work here.
		for (i in 0...count) {
			out[i] = value(xs[i], ys[i]);
		}
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		for (j in 0...height) {
			var y = ys[j];
			var base = j * width;
			for (i in 0...width) {
				out[base + i] = value(xs[i], y);
			}
		}
	}
}
