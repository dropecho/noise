package dropecho.noise;

import dropecho.utils.MathUtils;
import dropecho.utils.Vector;

enum abstract DistanceType(Int) {
	var Euclidian = 0;
	var Manhattan = 1;
	var Chebyshev = 2;
}

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Voronoi implements IModule2D {
	// Prevents noise from exiting unit cell size.
	private var halfUnitVec:Float = 0.353;

	public function new(frequency:Float, ?distanceType:DistanceType) {};

	public function value(x:Float, y:Float):Float {
		x *= frequency;
		y *= frequency;

		var intX = Std.int(x);
		var intY = Std.int(y);

		var cell:Vector3 = {x: x, y: y, z: 0.0};
		var closest:Vector3 = {x: 0, y: 0, z: 0};
		var minDistToCandidate:Float = Math.POSITIVE_INFINITY;

		for (cellX in intX - 1...intX + 2) {
			for (cellY in intY - 1...intY + 2) {
				var noiseX = Simplex.noise(cellX, cellY, 0);
				noiseX = MathUtils.clamp(noiseX, -halfUnitVec, halfUnitVec);
				var noiseY = Simplex.noise(cellY, cellX, cellX * cellY);
				noiseY = MathUtils.clamp(noiseY, -halfUnitVec, halfUnitVec);
				var xpos = cellX + noiseX;
				var ypos = cellY + noiseY;

				var candidate = {x: xpos, y: ypos, z: 0.0};
				var distToCandidate = distance(cell, candidate);

				if (distToCandidate < minDistToCandidate) {
					closest = candidate;
					minDistToCandidate = distToCandidate;
				}
			}
		}

		return Simplex.noise(closest.x, closest.y, closest.x * closest.y);
	}

	private inline function distance(a, b):Float {
		switch (distanceType) {
			case Manhattan:
				return VectorMath.manhattanDistance(a, b);
			case Chebyshev:
				return VectorMath.chebyshevDistance(a, b);
			case _: // default to euclidian
				return VectorMath.distanceSq(a, b);
		}
	}
}
