import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Outputs the smaller of two source modules' values at each point.
*/
export declare class Min implements IModule2D {
	constructor(input: IModule2D, input2: IModule2D)
	value(x: F32, y: F32): F32
	
	/**
	The IModule2D to get a value from.
	Default: null
	*/
	protected input: IModule2D
	
	/**
	
	*/
	protected input2: IModule2D
}
