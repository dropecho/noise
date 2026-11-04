import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Outputs concentric ring patterns based on radial distance from the origin. Output peaks (+1) at half-integer distances and troughs (-1) at integer distances.
*/
export declare class Spheres implements IModule2D {
	constructor(frequency?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected frequency: F32
}
