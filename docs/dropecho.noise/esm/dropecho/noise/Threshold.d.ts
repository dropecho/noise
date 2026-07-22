import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Returns 1.0 if the source module's output meets or exceeds the cutoff, else -1.0. Useful for generating binary land/sea or solid/empty masks.
*/
export declare class Threshold implements IModule2D {
	constructor(input: IModule2D, cutoff?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected input: IModule2D
	
	/**
	
	*/
	protected cutoff: F32
}
