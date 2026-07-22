import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Outputs the product of two source modules' values. Useful for masking one noise pattern with another.
*/
export declare class Multiply implements IModule2D {
	constructor(input: IModule2D, input2: IModule2D)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected input: IModule2D
	
	/**
	
	*/
	protected input2: IModule2D
}
