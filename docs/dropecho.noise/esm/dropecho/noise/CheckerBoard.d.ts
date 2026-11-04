import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Checkerboard pattern generator. Returns 1 and -1 in alternating grid squares.
*/
export declare class CheckerBoard implements IModule2D {
	constructor(frequency?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected frequency: F32
}
