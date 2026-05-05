import {F32} from "./FastMath"

export declare class Vector2s {
	constructor(x: F32, y: F32)
	x: F32
	y: F32
}

export declare class Vector3s {
	constructor(x: F32, y: F32, z: F32)
	x: F32
	y: F32
	z: F32
}

export declare class Vector3 {
	static _new(x: F32, y: F32, z: F32): Vector3s
	protected static fromF32Vec(b: {
		x: F32, 
		y: F32, 
		z: F32
	}): Vector3s
	protected static fromIntVec1(b: {
		x: number, 
		y: number, 
		z: number
	}): Vector3s
	protected static fromIntVec2(b: {
		x: F32, 
		y: number, 
		z: number
	}): Vector3s
	protected static fromIntVec3(b: {
		x: number, 
		y: F32, 
		z: number
	}): Vector3s
	protected static fromIntVec4(b: {
		x: number, 
		y: number, 
		z: F32
	}): Vector3s
	protected static fromIntVec5(b: {
		x: F32, 
		y: F32, 
		z: number
	}): Vector3s
	protected static fromIntVec6(b: {
		x: number, 
		y: F32, 
		z: F32
	}): Vector3s
	static add($this: Vector3s, rhs: Vector3s): Vector3s
	static sub($this: Vector3s, rhs: Vector3s): Vector3s
	static scale($this: Vector3s, rhs: F32): Vector3s
	static length($this: Vector3s): F32
	static lengthsq($this: Vector3s): F32
	static floor($this: Vector3s): Vector3s
}
