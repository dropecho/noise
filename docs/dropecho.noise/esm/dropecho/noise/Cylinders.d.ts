import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Outputs concentric cylinder cross-section rings aligned along the x-axis. Produces parallel band patterns.
*/
export declare class Cylinders implements IModule2D {
	constructor(frequency?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected frequency: F32
}
