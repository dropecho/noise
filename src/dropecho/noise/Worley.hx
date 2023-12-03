package dropecho.noise;

import dropecho.utils.MathUtils;
import dropecho.utils.Vector;

// @:build(dropecho.macros.Constructor.fromParams())
class Worley implements IModule2D {
	// Prevents noise from exiting unit cell size.
	private var halfUnitVec:Float = 0.35;
	private var frequency:Float = 0.35;

	public function new(frequency:Float) {
		this.frequency = frequency;
	}

	private var xCells = [0, 0, 0];
	private var yCells = [0, 0, 0];

	public function value(x:Float, y:Float):Float {
		x *= frequency;
		y *= frequency;

		var intX = Std.int(x);
		var intY = Std.int(y);

		var cell:Vector3 = {x: x, y: y, z: 0.0};
		//     var closest:Vector3 = {x: 0, y: 0, z: 0};
		var minDistToCandidate:Float = Math.POSITIVE_INFINITY;
		xCells[0] = intX - 1;
		xCells[1] = intX;
		xCells[2] = intX + 1;

		yCells[0] = intY - 1;
		yCells[1] = intY;
		yCells[2] = intY + 1;

		for (cellX in xCells) {
			for (cellY in yCells) {
				var noiseX = Simplex.noise(cellX, cellY, 0);

				var xpos = cellX + MathUtils.clamp(noiseX, -halfUnitVec, halfUnitVec);
				var ypos = cellY + MathUtils.clamp(-noiseX, -halfUnitVec, halfUnitVec);
				var candidate = {x: xpos, y: ypos, z: 0.0};
				var distToCandidate = (cell - candidate).lengthsq();

				if (distToCandidate < minDistToCandidate) {
					//           closest = candidate;
					minDistToCandidate = distToCandidate;
				}
			}
		}

		return (Math.sqrt(minDistToCandidate) * 2) - 1;
	}
}
