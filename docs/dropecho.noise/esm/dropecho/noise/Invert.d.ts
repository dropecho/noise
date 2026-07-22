import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Negates the source module's output (multiplies by -1). Peaks become valleys and vice versa.
*/
export declare class Invert implements IModule2D {
	constructor(input: IModule2D)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected input: IModule2D
}
