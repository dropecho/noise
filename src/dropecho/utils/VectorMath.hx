package dropecho.utils;

import dropecho.utils.FastMath.F32;
import dropecho.utils.FastMath.I32;
import dropecho.utils.Vector;

class VectorMath {
	static inline final magicX:I32 = 9167;
	static inline final magicY:I32 = 41179;
	static inline final magicZ:I32 = 9167;
	static inline final magicS:I32 = 4819;

	static public inline function rand3(a:Vector3s, seed:I32):F32 {
		return 1.0 - (rand3I32(Std.int(a.x), Std.int(a.y), Std.int(a.z), seed) / 1073741824.0);
	}

	static public inline function rand3I32(x:I32, y:I32, z:I32, seed:I32):I32 {
		return mixI32(x * magicX + y * magicY + z * magicZ + seed * magicS);
	}

	static inline function mixI32(sum:I32):I32 {
		var n = sum & 0x7fffffff;
		n = (n >> 13) ^ n;
		return (n * (n * n)) & 0x7fffffff;
	}

	// Cell hashing for Voronoi, Worley and CellularF2F1. cellHash(cellBase(x, y), offset)
	// equals rand3I32(x, y, z, seed) for the offset naming that z and seed, but computes
	// the shared x and y terms once per cell instead of once per hash.

	/** Offset for rand3I32(x, y, 0, 0): a cell's x jitter. */
	@:allow(dropecho.noise) static inline final JITTER_X:I32 = 0;

	/** Offset for rand3I32(x, y, 1, 0): a cell's y jitter. */
	@:allow(dropecho.noise) static inline final JITTER_Y:I32 = magicZ;

	/** Offset for rand3I32(x, y, 0, 1): a cell's own value. */
	@:allow(dropecho.noise) static inline final CELL_VALUE:I32 = magicS;

	@:allow(dropecho.noise) static inline function cellBase(x:I32, y:I32):I32 {
		return x * magicX + y * magicY;
	}

	@:allow(dropecho.noise) static inline function cellHash(base:I32, offset:I32):I32 {
		return mixI32(base + offset);
	}

	/**
	 * Maps a hash in [0, 2^31) to [-1, 1). Multiplying by 2^-30 is exact, like dividing by 2^30.
	 * @param hash A hash from cellHash or rand3I32.
	 * @return The hash scaled to [-1, 1).
	 */
	@:allow(dropecho.noise) static inline function toSigned(hash:I32):Float {
		return hash * (1 / 1073741824.0) - 1.0;
	}

	public static inline function rand3dTo3d(a:Vector3):Vector3 {
		var rx:F32 = rand3(a, 0);
		var ry:F32 = rand3(a, 1);
		return new Vector3(rx - FastMath.floor(rx), ry - FastMath.floor(ry), 0);
	}

	public static inline function add(a:Vector3, b:Vector3):Vector3 {
		return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
	}

	public static inline function sub(a:Vector3, b:Vector3):Vector3 {
		return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
	}

	public static inline function abs(a:Vector3):Vector3 {
		return new Vector3(FastMath.abs(a.x), FastMath.abs(a.y), FastMath.abs(a.z));
	}

	public static inline function distance(a:Vector3, b:Vector3):F32 {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return FastMath.sqrt((dx * dx) + (dy * dy) + (dz * dz));
	}

	public static inline function distanceSq(a:Vector3, b:Vector3):F32 {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return (dx * dx) + (dy * dy) + (dz * dz);
	}

	public static inline function chebyshevDistance(a:Vector3, b:Vector3):F32 {
		var dx = FastMath.abs(b.x - a.x);
		var dy = FastMath.abs(b.y - a.y);
		var dz = FastMath.abs(b.z - a.z);
		return FastMath.max(FastMath.max(dx, dy), dz);
	}

	public static inline function manhattanDistance(a:Vector3, b:Vector3):F32 {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return FastMath.abs(dx) + FastMath.abs(dy) + FastMath.abs(dz);
	}

	public static inline function length(a:Vector3):F32 {
		return FastMath.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
	}

	public static inline function lengthsq(a:Vector3):F32 {
		return a.x * a.x + a.y * a.y + a.z * a.z;
	}

	public static inline function scale(a:Vector3, scalar:F32):Vector3 {
		return new Vector3(a.x * scalar, a.y * scalar, a.z * scalar);
	}

	public static inline function inverseSqrt(a:Vector3):F32 {
		return 1.0 / FastMath.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
	}

	public static inline function normalize(a:Vector3):Vector3 {
		return scale(a, inverseSqrt(a));
	}

	public static inline function dot(a:Vector3, b:Vector3):F32 {
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}

	public static inline function floor(a:Vector3):Vector3 {
		return new Vector3(FastMath.floor(a.x), FastMath.floor(a.y), FastMath.floor(a.z));
	}

	public static inline function randomUnitVector2():Vector2s {
		var theta:F32 = Math.random() * 2 * Math.PI;
		return new Vector2s(Math.cos(theta), Math.sin(theta));
	}

}
