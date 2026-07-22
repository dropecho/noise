import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Remaps the source module's output from [inputMin, inputMax] to [outputMin, outputMax] via linear interpolation. Useful for converting noise ranges (e.g. [-1,1] to [0,1]).
*/
export declare class Normalize implements IModule2D {
	constructor(input: IModule2D, inputMin?: F32, inputMax?: F32, outputMin?: F32, outputMax?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected input: IModule2D
	
	/**
	
	*/
	protected inputMin: F32
	
	/**
	
	*/
	protected inputMax: F32
	
	/**
	
	*/
	protected outputMin: F32
	
	/**
	
	*/
	protected outputMax: F32
}
