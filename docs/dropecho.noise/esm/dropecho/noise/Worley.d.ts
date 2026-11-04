import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Worley (F1 cellular) noise generator. Returns the Euclidean distance to the nearest
* jittered cell center, scaled to approximately [-1, 1]. Produces a bubbly or cobblestone look.
*/
export declare class Worley implements IModule2D {
	constructor(frequency: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected frequency: F32
	protected static halfUnitVec: F32
}
