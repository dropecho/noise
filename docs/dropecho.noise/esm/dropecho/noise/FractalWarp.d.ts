import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Domain warp: iteratively displaces the sample coordinates through Simplex noise before
* evaluating the source module. Each octave feeds the warped position into the next warp,
* producing increasingly complex, swirling distortion.
*/
export declare class FractalWarp implements IModule2D {
	constructor(input: IModule2D, warpStrength?: F32, warpFrequency?: F32, octaves?: number)
	protected input: IModule2D
	protected warpStrength: F32
	protected warpFrequency: F32
	protected octaves: number
	value(x: F32, y: F32): F32
}
