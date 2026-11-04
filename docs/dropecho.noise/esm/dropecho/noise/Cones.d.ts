import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Outputs a concentric cone cross-section pattern — radial distance from each cell center mapped to a tent-shaped peak.
*/
export declare class Cones implements IModule2D {
	constructor(frequency?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected frequency: F32
}
