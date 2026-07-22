import {I32, F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Ridged multifractal noise for sharp mountain-ridge and canyon terrain features.
* Each octave of Perlin noise is inverted and its absolute value summed, producing
* characteristic sharp peaks and deep valleys.
*/
export declare class Ridged implements IModule2D {
	constructor(octaves?: I32, frequency?: F32, lacunarity?: F32, persistence?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected octaves: I32
	
	/**
	
	*/
	protected frequency: F32
	
	/**
	
	*/
	protected lacunarity: F32
	
	/**
	
	*/
	protected persistence: F32
	protected static weights: any[]
}
