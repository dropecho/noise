import {F32} from "../utils/FastMath"

/**
* Standalone 2D simplex noise. Kept separate from the 3D Simplex class so that adding
* noise2d does not alter the property-shape of the Simplex class object, which would
* invalidate V8's inline caches for the perm/grad3 lookups inside Simplex.noise().
*/
export declare class Simplex2D {
	protected static F2: F32
	protected static G2: F32
	protected static G2x2: F32
	protected static dot2(gi: number, x: F32, y: F32): F32
	static noise(xin: F32, yin: F32): F32
	protected static p: number[]
	protected static perm: number[]
}
