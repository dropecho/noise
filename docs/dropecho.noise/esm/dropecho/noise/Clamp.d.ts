import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Clamps the source module's output to a [min, max] range. Values outside the range are pinned to the nearest bound.
*/
export declare class Clamp implements IModule2D {
	constructor(input: IModule2D, min?: F32, max?: F32)
	value(x: F32, y: F32): F32
	
	/**
	The IModule2D to get a value from.
	Default: null
	*/
	protected input: IModule2D
	
	/**
	The minimum value to clamp to.
	Default: -1
	*/
	protected min: F32
	
	/**
	The maximum value to clamp to.
	Default: 1
	*/
	protected max: F32
}
