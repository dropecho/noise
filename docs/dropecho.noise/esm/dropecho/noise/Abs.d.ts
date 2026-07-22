import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Outputs the absolute value of the source module's output. Maps [-1, 0] to [0, 1], so all output is non-negative.
*/
export declare class Abs implements IModule2D {
	constructor(input: IModule2D)
	value(x: F32, y: F32): F32
	
	/**
	The IModule2D to get a value from.
	Default: null
	*/
	protected input: IModule2D
}
