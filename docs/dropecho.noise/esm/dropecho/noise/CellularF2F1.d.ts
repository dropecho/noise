import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Cellular noise returning sqrt(F2) - sqrt(F1) — the difference between the distance to
* the 2nd nearest cell center and the nearest cell center. Produces cracked, rocky, or
* dried-mud surface patterns distinct from standard Worley F1 output.
*/
export declare class CellularF2F1 implements IModule2D {
	constructor(frequency: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected frequency: F32
	protected static halfUnitVec: F32
}
