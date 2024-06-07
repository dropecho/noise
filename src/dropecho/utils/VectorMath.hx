package dropecho.utils;

import dropecho.utils.FastMath.F32;
import dropecho.utils.FastMath.I32;
import dropecho.utils.Vector;

class VectorMath {
	//   public static inline function rand3dTo3d(a:Vector3_struct):Vector3_struct {
	//     return {x: a.x + Math.random(), y: a.y + Math.random(), z: a.z};
	//   }
	static var magicX:I32 = 9167;
	static var magicY:I32 = 41179;
	static var magicZ:I32 = 9167;
	static var magicS:I32 = 4819;

	static public inline function rand3(a:Vector3s, seed:I32):F32 {
		return 1.0 - (rand3I32(Std.int(a.x), Std.int(a.y), Std.int(a.z), seed) / 1073741824.0);
	}

	static public inline function rand3I32(x:I32, y:I32, z:I32, seed:I32):I32 {
		var n = (x * magicX + y * magicY + z * magicZ + seed * magicS) & 0x7fffffff;
		n = (n >> 13) ^ n;
		return (n * (n * n)) & 0x7fffffff;
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
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
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

	// Fast inverseSqrt from id people.
	public static inline function inverseSqrt(a:Vector3) {
		var number = a.x * a.x + a.y * a.y + a.z * a.z;
		var x2:F32;
		var y:F32;
		var threehalfs:F32 = 1.5;

		x2 = number * 0.5;
		y = number;
		y = 0x5f3759df - (Std.int(y) >> 1);
		y = y * (threehalfs - (x2 * y * y));

		return y;
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

	//   private static inline function randomUnitVector3():Vector3 {
	//     var theta:F32 = Math.random() * 2 * Math.PI;
	//     return new Vector2s(Math.cos(theta), Math.sin(theta));
	//   }
}
