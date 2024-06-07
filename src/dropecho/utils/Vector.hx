package dropecho.utils;

import dropecho.utils.FastMath.F32;
import dropecho.utils.FastMath.I32;

@:struct
@:structInit
class Vector2s {
	public var x:F32;
	public var y:F32;

	public function new(x:F32, y:F32) {
		this.x = x;
		this.y = y;
	}
}

@:struct
@:structInit
class Vector3s {
	public var x:F32;
	public var y:F32;
	public var z:F32;

	public function new(x:F32, y:F32, z:F32) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

@:forward
@:nativeGen
abstract Vector3(Vector3s) from Vector3s to Vector3s {
	inline public function new(x:F32, y:F32, z:F32) {
		this = new Vector3s(x, y, z);
	}

	@:from inline static function fromF32Vec(b:{x:F32, y:F32, z:F32}):Vector3 {
		return new Vector3(b.x, b.y, b.z);
	}

	@:from inline static function fromIntVec1(b:{x:Int, y:Int, z:Int}):Vector3 {
		return new Vector3(b.x, b.y, b.z);
	}

	@:from inline static function fromIntVec2(b:{x:F32, y:Int, z:Int}):Vector3 {
		return new Vector3(b.x, b.y, b.z);
	}

	@:from inline static function fromIntVec3(b:{x:Int, y:F32, z:Int}):Vector3 {
		return new Vector3(b.x, b.y, b.z);
	}

	@:from inline static function fromIntVec4(b:{x:Int, y:Int, z:F32}):Vector3 {
		return new Vector3(b.x, b.y, b.z);
	}

	@:from inline static function fromIntVec5(b:{x:F32, y:F32, z:Int}):Vector3 {
		return new Vector3(b.x, b.y, b.z);
	}

	@:from inline static function fromIntVec6(b:{x:Int, y:F32, z:F32}):Vector3 {
		return new Vector3(b.x, b.y, b.z);
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
	public inline function scale(rhs:F32):Vector3 {
		return VectorMath.scale(this, rhs);
	}

	public inline function length():F32 {
		return VectorMath.length(this);
	}

	public inline function lengthsq():F32 {
		return VectorMath.lengthsq(this);
	}

	public inline function floor():Vector3 {
		return VectorMath.floor(this);
	}
}
