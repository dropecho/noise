package dropecho.noise;

import dropecho.utils.VectorMath;
import dropecho.utils.FastMath;

/**
 * Cellular noise returning sqrt(F2) - sqrt(F1) — the difference between the distance to
 * the 2nd nearest cell center and the nearest cell center. Produces cracked, rocky, or
 * dried-mud surface patterns distinct from standard Worley F1 output.
 */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
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

		for (cx in -1...2) {
			for (cy in -1...2) {
				var cellX = cx + ix;
				var cellY = cy + iy;
				var jx:F32 = halfUnitVec * ((VectorMath.rand3I32(cellX, cellY, 0, 0) / 1073741824.0) - 1.0);
				var jy:F32 = halfUnitVec * ((VectorMath.rand3I32(cellX, cellY, 1, 0) / 1073741824.0) - 1.0);
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
