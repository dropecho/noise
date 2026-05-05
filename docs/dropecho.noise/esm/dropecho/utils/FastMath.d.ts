
export type F32 = number

export type I32 = number

export declare class FastMath {
	static ipow(a: F32, b: I32): F32
	static pow(v: F32, exp: F32): F32
	static min(a: F32, b: F32): F32
	static max(a: F32, b: F32): F32
	static abs(f: F32): F32
	static sqrt(f: F32): F32
	static floor(f: F32): I32
	static ceil(f: F32): I32
	static round(f: F32): I32
}

export const MAX_I32: I32
export const MIN_I32: I32
export const MAX_F32: F32
export const MIN_F32: F32
