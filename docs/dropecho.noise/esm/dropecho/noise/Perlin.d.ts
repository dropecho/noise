import {Random} from "../../seedyrng/Random"
import {I32, F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Classic Perlin gradient noise generator. Uses a seeded permutation table for 256-unit tiling
* and unit-circle gradient vectors. Supports multiple octaves for fractal detail, controlled by
* lacunarity (frequency multiplier per octave) and persistence (amplitude multiplier per octave).
*/
export declare class Perlin implements IModule2D {
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
	protected static random: Random
	protected static _gradAngles: number[]
	protected static gradients_x: F32[]
	protected static gradients_y: F32[]
	protected static perm: number[]
	protected static dot_prod_grid(x: F32, y: F32, ux: I32, uy: I32): F32
	static noise2d(x: F32, y: F32): F32
}
