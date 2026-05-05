import {Vector3s, Vector2s} from "./Vector"
import {I32, F32} from "./FastMath"

export declare class VectorMath {
	protected static magicX: I32
	protected static magicY: I32
	protected static magicZ: I32
	protected static magicS: I32
	static rand3(a: Vector3s, seed: I32): F32
	static rand3I32(x: I32, y: I32, z: I32, seed: I32): I32
	static rand3dTo3d(a: Vector3s): Vector3s
	static add(a: Vector3s, b: Vector3s): Vector3s
	static sub(a: Vector3s, b: Vector3s): Vector3s
	static abs(a: Vector3s): Vector3s
	static distance(a: Vector3s, b: Vector3s): F32
	static distanceSq(a: Vector3s, b: Vector3s): F32
	static chebyshevDistance(a: Vector3s, b: Vector3s): F32
	static manhattanDistance(a: Vector3s, b: Vector3s): F32
	static length(a: Vector3s): F32
	static lengthsq(a: Vector3s): F32
	static scale(a: Vector3s, scalar: F32): Vector3s
	static inverseSqrt(a: Vector3s): F32
	static normalize(a: Vector3s): Vector3s
	static dot(a: Vector3s, b: Vector3s): F32
	static floor(a: Vector3s): Vector3s
	static randomUnitVector2(): Vector2s
}
