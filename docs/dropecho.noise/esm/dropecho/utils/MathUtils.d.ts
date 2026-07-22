import {F32} from "./FastMath"

export type Easing = ((arg0: F32) => F32)

export declare class MathUtils {
	
	/**
	* Calculate a parametric bezier curve with control points p0,p1,p2,p3.
	* @param t The distance along the curve to get the value for.
	*/
	static easeBezier(t: F32, p0: F32, p1: F32, p2: F32, p3: F32): F32
	static fade(t: F32): F32
	static lerp(from: F32, to: F32, alpha: F32): F32
	static easeOutCirc(x: F32): F32
	static easeOutSine(x: F32): F32
	static easeInSine(x: F32): F32
	static sine(k: F32): number
	static mapEasing(val: F32, fromMin: F32, fromMax: F32, toMin: F32, toMax: F32, easing: Easing): F32
	static map(val: F32, fromMin: F32, fromMax: F32, toMin: F32, toMax: F32): F32
	static inverseLerp(t: F32, a: F32, b: F32): F32
	static clamp(val: F32, min: F32, max: F32): F32
	static lowerBound(lo: number, hi: number, pred: ((arg0: number) => boolean)): number
}
