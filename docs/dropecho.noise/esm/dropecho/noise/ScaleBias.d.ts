import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Applies a linear transform (output * scale + bias) to the source module's output. Use to remap value ranges or adjust contrast.
*/
export declare class ScaleBias implements IModule2D {
	constructor(input: IModule2D, scale?: F32, bias?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected input: IModule2D
	
	/**
	
	*/
	protected scale: F32
	
	/**
	
	*/
	protected bias: F32
}
