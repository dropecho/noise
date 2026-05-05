package dropecho.noise;

import dropecho.utils.VectorMath;
import dropecho.utils.FastMath;

/**
 * Worley (F1 cellular) noise generator. Returns the Euclidean distance to the nearest
 * jittered cell center, scaled to approximately [-1, 1]. Produces a bubbly or cobblestone look.
 */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Worley implements IModule2D {
	private static inline final halfUnitVec:F32 = 0.353553;

	public function new(frequency:F32);

	public function value(x:F32, y:F32):F32 {
		x *= frequency;
		y *= frequency;

		var ix = FastMath.floor(x);
		var iy = FastMath.floor(y);

		var minDistSq:F32 = MAX_F32;

		for (cx in -1...2) {
			for (cy in -1...2) {
				var cellX = cx + ix;
				var cellY = cy + iy;
				var jx:F32 = halfUnitVec * ((VectorMath.rand3I32(cellX, cellY, 0, 0) / 1073741824.0) - 1.0);
				var jy:F32 = halfUnitVec * ((VectorMath.rand3I32(cellX, cellY, 1, 0) / 1073741824.0) - 1.0);
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
}
