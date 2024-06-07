package dropecho.noise;

import dropecho.utils.MathUtils;
import dropecho.utils.Vector;
import dropecho.utils.FastMath;

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Worley implements IModule2D {
	// Prevents noise from exiting unit cell size.
	private static inline final halfUnitVec:F32 = 0.353553;

	public function new(frequency:F32);

	public function value(x:F32, y:F32):F32 {
		x *= frequency;
		y *= frequency;

		var intX = Std.int(x);
		var intY = Std.int(y);

		var cell = new Vector3(x, y, 0.0);
		var minDistToCandidate = MAX_F32;

		for (cx in -1...2) {
			for (cy in -1...2) {
				var cellX = cx + intX;
				var cellY = cy + intY;

				var noiseX = Simplex.noise(cellX, cellY, 0);
				//         var noiseX = Perlin.noise(cellX, cellY);

				var xpos = cellX + MathUtils.clamp(noiseX, -halfUnitVec, halfUnitVec);
				var ypos = cellY + MathUtils.clamp(-noiseX, -halfUnitVec, halfUnitVec);
				var candidate = new Vector3(xpos, ypos, 0.0);
				var distToCandidate = (cell - candidate).lengthsq();

				if (distToCandidate < minDistToCandidate) {
					minDistToCandidate = distToCandidate;
				}
			}
		}

		return (FastMath.sqrt(minDistToCandidate) * 2) - 1;
	}
}
