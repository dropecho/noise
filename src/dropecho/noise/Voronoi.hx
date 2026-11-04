package dropecho.noise;

import haxe.ds.Vector;
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
class Voronoi implements IGridModule2D {
	private static inline final halfUnitVec:F32 = 0.353;

	public function new(frequency:F32, ?distanceType:DistanceType);

	public function value(x:F32, y:F32):F32 {
		x *= frequency;
		y *= frequency;

		var ix = FastMath.floor(x);
		var iy = FastMath.floor(y);

		var minDist:F32 = MAX_F32;
		var closestBase:I32 = 0;

		// Nearest columns and rows first, so cells that cannot hold a closer point
		// are usually skipped before hashing.
		for (i in 0...3) {
			var cellX = ix + VectorMath.searchOffset(i);
			var gapX:F32 = VectorMath.cellGap(x - cellX);
			if (bound(gapX, 0) >= minDist) continue;

			for (j in 0...3) {
				var cellY = iy + VectorMath.searchOffset(j);
				if (bound(gapX, VectorMath.cellGap(y - cellY)) >= minDist) continue;

				var base = VectorMath.cellBase(cellX, cellY);
				var jx:F32 = halfUnitVec * VectorMath.toSigned(VectorMath.cellHash(base, VectorMath.JITTER_X));
				var jy:F32 = halfUnitVec * VectorMath.toSigned(VectorMath.cellHash(base, VectorMath.JITTER_Y));
				var dx:F32 = x - (cellX + jx);
				var dy:F32 = y - (cellY + jy);
				var dist:F32 = switch (distanceType) {
					case Manhattan: FastMath.abs(dx) + FastMath.abs(dy);
					case Chebyshev: FastMath.max(FastMath.abs(dx), FastMath.abs(dy));
					case Euclidian | _: dx * dx + dy * dy;
				};
				if (dist < minDist) {
					minDist = dist;
					closestBase = base;
				}
			}
		}

		return VectorMath.toSigned(VectorMath.cellHash(closestBase, VectorMath.CELL_VALUE));
	}

	// The smallest distance, in this module's metric, that per-axis gaps allow.
	private inline function bound(gapX:F32, gapY:F32):F32 {
		return switch (distanceType) {
			case Manhattan: gapX + gapY;
			case Chebyshev: gapX < gapY ? gapY : gapX;
			case Euclidian | _: gapX * gapX + gapY * gapY;
		};
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
