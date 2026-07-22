import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Randomly displaces input coordinates using Simplex noise before sampling the source module.
* Independent x and y displacements are generated using different z-slice values of the same noise.
* Power controls displacement magnitude; frequency controls the scale of the distortion.
*/
export declare class Turbulence implements IModule2D {
	constructor(input: IModule2D, power?: F32, frequency?: F32)
	protected input: IModule2D
	protected power: F32
	protected frequency: F32
	value(x: F32, y: F32): F32
}
