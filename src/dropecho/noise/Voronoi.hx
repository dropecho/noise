package dropecho.noise;

import dropecho.utils.Vector;
import dropecho.utils.VectorMath;
import dropecho.utils.FastMath;

enum abstract DistanceType(Int) {
	var Euclidian = 0;
	var Manhattan = 1;
	var Chebyshev = 2;
}

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Voronoi implements IModule2D {
	// Prevents noise from exiting unit cell size.
	private var unitVec:F32 = 0.76;
	private var halfUnitVec:F32 = 0.353;

	public function new(frequency:F32, ?distanceType:DistanceType);

	public function value(x:F32, y:F32):F32 {
		x *= frequency;
		y *= frequency;

		var intX = Std.int(x);
		var intY = Std.int(y);

		var cell = new Vector3(x, y, 0.0);
		var closest = new Vector3(0, 0, 0);
		var minDistToCandidate = MAX_F32;

		for (cx in -1...2) {
			for (cy in -1...2) {
				var cellX = cx + intX;
				var cellY = cy + intY;

				var noiseX = halfUnitVec * Simplex.noise(cellX, cellY, 0);
				var xpos = cellX - noiseX;
				var ypos = cellY + noiseX;

				var candidate = new Vector3(xpos, ypos, 0.0);
				var distToCandidate = distance(cell, candidate);

				if (distToCandidate < minDistToCandidate) {
					closest = candidate;
					minDistToCandidate = distToCandidate;
				}
			}
		}

		return Simplex.noise(closest.x, closest.y, closest.x * closest.y);
	}

	private inline function distance(a, b):F32 {
		switch (distanceType) {
			case Manhattan:
				return VectorMath.manhattanDistance(a, b);
			case Chebyshev:
				return VectorMath.chebyshevDistance(a, b);
			case Euclidian | _: // default to Euclidian.
				return VectorMath.distanceSq(a, b);
		}
	}
}
