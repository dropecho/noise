import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Applies an exponential curve to the source module's output via pow((v+1)/2, exp)*2-1.
* exp > 1 sharpens peaks and pushes midtones toward -1; exp < 1 flattens and pushes toward +1.
*/
export declare class Exponent implements IModule2D {
	constructor(input: IModule2D, exp?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected input: IModule2D
	
	/**
	
	*/
	protected exp: F32
}
