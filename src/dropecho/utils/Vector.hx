package dropecho.utils;

import haxe.ds.Either;

#if (!cs || !cpp || !java || !hl)
typedef Single = Float;
#end

// @:forward
// abstract Number(Float) from Float to Float from Int {
//   public function new(f:Float) {
//     this = f;
//   }
//
//   @:to inline function toInt() {
//     return Std.int(this);
//   }
//
//   @:op(A + B) private inline static function addf(a:Number, b:Float) {
//     return cast(a, Float) + b;
//   };
//
//   @:op(A - B) private inline static function subf(a:Number, b:Float) {
//     return cast(a, Float) - b;
//   };
//
//   @:op(A * B) private inline static function divf(a:Number, b:Float) {
//     return cast(a, Float) * b;
//   };
//
//   @:op(A / B) private inline static function mulf(a:Number, b:Float) {
//     return cast(a, Float) / b;
//   };
// }
typedef Vector2_struct = {
	var x:Single;
	var y:Single;
}

typedef Vector3_struct = {
	var x:Single;
	var y:Single;
	var z:Single;
}

@:forward
abstract Vector3(Vector3_struct) from Vector3_struct to Vector3_struct {
	inline public function new(i:Vector3_struct) {
		this = i;
	}

	@:from inline static function fromIntVec1(b:{x:Int, y:Int, z:Int}):Vector3 {
		return new Vector3({x: b.x, y: b.y, z: b.z});
	}

	@:from inline static function fromIntVec2(b:{x:Float, y:Int, z:Int}):Vector3 {
		return new Vector3({x: b.x, y: b.y, z: b.z});
	}

	@:from inline static function fromIntVec3(b:{x:Int, y:Float, z:Int}):Vector3 {
		return new Vector3({x: b.x, y: b.y, z: b.z});
	}

	@:from inline static function fromIntVec4(b:{x:Int, y:Int, z:Float}):Vector3 {
		return new Vector3({x: b.x, y: b.y, z: b.z});
	}

	@:from inline static function fromIntVec5(b:{x:Float, y:Float, z:Int}):Vector3 {
		return new Vector3({x: b.x, y: b.y, z: b.z});
	}

	@:from inline static function fromIntVec6(b:{x:Int, y:Float, z:Float}):Vector3 {
		return new Vector3({x: b.x, y: b.y, z: b.z});
	}

	@:op(A + B)
	public inline function add(rhs:Vector3):Vector3 {
		return VectorMath.add(this, rhs);
	}

	@:op(A - B)
	public inline function sub(rhs:Vector3):Vector3 {
		return VectorMath.sub(this, rhs);
	}

	@:op(A * B)
	public inline function scale(rhs:Single):Vector3 {
		return VectorMath.scale(this, rhs);
	}

	public inline function length():Float {
		return VectorMath.length(this);
	}

	public inline function lengthsq():Float {
		return VectorMath.lengthsq(this);
	}

	public inline function floor():Vector3 {
		return VectorMath.floor(this);
	}
}

class VectorMath {
	//   public static inline function rand3dTo3d(a:Vector3_struct):Vector3_struct {
	//     return {x: a.x + Math.random(), y: a.y + Math.random(), z: a.z};
	//   }
	static var magicX:Int = 9167;
	static var magicY:Int = 41179;
	static var magicZ:Int = 9167;
	static var magicS:Int = 4819;

	static public inline function rand3(a:Vector3_struct, seed:Int):Float {
		return 1.0 - (rand3Int(Std.int(a.x), Std.int(a.y), Std.int(a.z), seed) / 1073741824.0);
	}

	static public inline function rand3Int(x:Int, y:Int, z:Int, seed:Int):Int {
		var n = (x * magicX + y * magicY + z * magicZ + seed * magicS) & 0x7fffffff;
		n = (n >> 13) ^ n;
		return (n * (n * n)) & 0x7fffffff;
	}

	public static inline function rand3dTo3d(a:Vector3_struct):Vector3_struct {
		var rx:Float = rand3(a, 0);
		var ry:Float = rand3(a, 1);
		return {
			x: rx - Math.floor(rx),
			y: ry - Math.floor(ry),
			z: 0
		}
	}

	public static inline function add(a:Vector3_struct, b:Vector3_struct):Vector3_struct {
		return {x: a.x + b.x, y: a.y + b.y, z: a.z + b.z};
	}

	public static inline function sub(a:Vector3_struct, b:Vector3_struct):Vector3_struct {
		return {x: a.x - b.x, y: a.y - b.y, z: a.z - b.z};
	}

	public static inline function abs(a:Vector3_struct):Vector3_struct {
		return {x: Math.abs(a.x), y: Math.abs(a.y), z: Math.abs(a.z)};
	}

	public static inline function distance(a:Vector3_struct, b:Vector3_struct):Float {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return FastMath.sqrt((dx * dx) + (dy * dy) + (dz * dz));
	}

	public static inline function distanceSq(a:Vector3_struct, b:Vector3_struct):Float {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return (dx * dx) + (dy * dy) + (dz * dz);
	}

	public static inline function chebyshevDistance(a:Vector3_struct, b:Vector3_struct):Float {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return Math.max(Math.max(dx, dy), dz);
	}

	public static inline function manhattanDistance(a:Vector3_struct, b:Vector3_struct):Float {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var dz = b.z - a.z;
		return Math.abs(dx) + Math.abs(dy) + Math.abs(dz);
	}

	public static inline function length(a:Vector3_struct):Float {
		return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
	}

	public static inline function lengthsq(a:Vector3_struct):Float {
		return a.x * a.x + a.y * a.y + a.z * a.z;
	}

	public static inline function scale(a:Vector3_struct, scalar:Float):Vector3_struct {
		return {x: a.x * scalar, y: a.y * scalar, z: a.z * scalar};
	}

	// Fast inverseSqrt from id people.
	public static inline function inverseSqrt(a:Vector3_struct) {
		var number = a.x * a.x + a.y * a.y + a.z * a.z;
		var x2:Float;
		var y:Float;
		var threehalfs:Float = 1.5;

		x2 = number * 0.5;
		y = number;
		y = 0x5f3759df - (Std.int(y) >> 1);
		y = y * (threehalfs - (x2 * y * y));

		return y;
	}

	public static inline function normalize(a:Vector3_struct):Vector3_struct {
		return scale(a, inverseSqrt(a));
	}

	public static inline function dot(a:Vector3_struct, b:Vector3_struct):Float {
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}

	public static inline function floor(a:Vector3_struct):Vector3_struct {
		return {x: Math.floor(a.x), y: Math.floor(a.y), z: Math.floor(a.z)};
	}
}
