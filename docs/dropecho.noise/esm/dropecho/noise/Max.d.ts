import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Outputs the larger of two source modules' values at each point.
*/
export declare class Max implements IModule2D {
	constructor(input: IModule2D, input2: IModule2D)
	value(x: F32, y: F32): F32
	
	/**
	The IModule2D to get a value from.
	Default: null
	*/
	protected input: IModule2D
	
	/**
	The IModule2D to get a value from.
	Default: null
	*/
	protected input2: IModule2D
}
