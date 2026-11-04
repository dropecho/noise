package dropecho.noise;

import dropecho.utils.VectorMath;
import dropecho.utils.FastMath;

/**
 * Cellular noise returning sqrt(F2) - sqrt(F1) — the difference between the distance to
 * the 2nd nearest cell center and the nearest cell center. Produces cracked, rocky, or
 * dried-mud surface patterns distinct from standard Worley F1 output.
 */
@:build(dropecho.macros.Constructor.fromArgs())
class CellularF2F1 implements IModule2D {
	private static inline final halfUnitVec:F32 = 0.353553;

	public function new(frequency:F32);

	public function value(x:F32, y:F32):F32 {
		x *= frequency;
		y *= frequency;

		var ix = FastMath.floor(x);
		var iy = FastMath.floor(y);

		var f1:F32 = MAX_F32;
		var f2:F32 = MAX_F32;

		// Nearest columns and rows first, so cells that cannot beat the second-nearest
		// point are usually skipped before hashing.
		for (i in 0...3) {
			var cellX = ix + VectorMath.searchOffset(i);
			var gapX:F32 = VectorMath.cellGap(x - cellX);
			if (gapX * gapX >= f2) continue;

			for (j in 0...3) {
				var cellY = iy + VectorMath.searchOffset(j);
				var gapY:F32 = VectorMath.cellGap(y - cellY);
				if (gapX * gapX + gapY * gapY >= f2) continue;

				var base = VectorMath.cellBase(cellX, cellY);
				var jx:F32 = halfUnitVec * VectorMath.toSigned(VectorMath.cellHash(base, VectorMath.JITTER_X));
				var jy:F32 = halfUnitVec * VectorMath.toSigned(VectorMath.cellHash(base, VectorMath.JITTER_Y));
				var dx:F32 = x - (cellX + jx);
				var dy:F32 = y - (cellY + jy);
				var dist:F32 = dx * dx + dy * dy;

				if (dist < f1) {
					f2 = f1;
					f1 = dist;
				} else if (dist < f2) {
					f2 = dist;
				}
			}
		}

		return FastMath.sqrt(f2) - FastMath.sqrt(f1);
	}
}
