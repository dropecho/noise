package dropecho.noise;

import dropecho.utils.VectorMath;
import dropecho.utils.FastMath;

enum abstract DistanceType(Int) {
	var Euclidian = 0;
	var Manhattan = 1;
	var Chebyshev = 2;
}

/**
 * Voronoi (cellular) noise generator. Divides space into cells seeded by a fast integer hash,
 * then outputs a hash value of the nearest cell center. Supports Euclidean, Manhattan, and
 * Chebyshev distance metrics via the DistanceType enum.
 */
@:build(dropecho.macros.Constructor.fromArgs())
class Voronoi implements IModule2D {
	private static inline final halfUnitVec:F32 = 0.353;

	public function new(frequency:F32, ?distanceType:DistanceType);

	public function value(x:F32, y:F32):F32 {
		x *= frequency;
		y *= frequency;

		var ix = FastMath.floor(x);
		var iy = FastMath.floor(y);

		var minDist:F32 = MAX_F32;
		var closestCX = 0;
		var closestCY = 0;

		for (cx in -1...2) {
			for (cy in -1...2) {
				var cellX = cx + ix;
				var cellY = cy + iy;
				var jx:F32 = halfUnitVec * ((VectorMath.rand3I32(cellX, cellY, 0, 0) / 1073741824.0) - 1.0);
				var jy:F32 = halfUnitVec * ((VectorMath.rand3I32(cellX, cellY, 1, 0) / 1073741824.0) - 1.0);
				var dx:F32 = x - (cellX + jx);
				var dy:F32 = y - (cellY + jy);
				var dist:F32 = switch (distanceType) {
					case Manhattan: FastMath.abs(dx) + FastMath.abs(dy);
					case Chebyshev: FastMath.max(FastMath.abs(dx), FastMath.abs(dy));
					case Euclidian | _: dx * dx + dy * dy;
				};
				if (dist < minDist) {
					minDist = dist;
					closestCX = cellX;
					closestCY = cellY;
				}
			}
		}

		return (VectorMath.rand3I32(closestCX, closestCY, 0, 1) / 1073741824.0) - 1.0;
	}
}
