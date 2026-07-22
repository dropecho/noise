import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Offsets input coordinates by (dx, dy) before sampling the source module. Useful for shifting the origin of any noise pattern.
*/
export declare class TranslatePoint implements IModule2D {
	constructor(input: IModule2D, dx?: F32, dy?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected input: IModule2D
	
	/**
	
	*/
	protected dx: F32
	
	/**
	
	*/
	protected dy: F32
}
