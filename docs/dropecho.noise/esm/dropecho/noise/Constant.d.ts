import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Always outputs the same constant value regardless of coordinates. Useful as a fixed input to combiners and selectors.
*/
export declare class Constant implements IModule2D {
	constructor(constant: F32)
	value(x: F32, y: F32): F32
	
	/**
	The constant value to return.
	Default: null
	*/
	protected constant: F32
}
