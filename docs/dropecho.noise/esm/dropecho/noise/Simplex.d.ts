import {I32, F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Simplex noise generator. `value()` uses a native 2D simplex (3 corners, 1 branch) for speed.
* The static `noise()` 3D function is kept for Turbulence/FractalWarp which need independent
* per-axis displacements via different z slices.
* Supports multiple octaves for fractal detail.
*/
export declare class Simplex implements IModule2D {
	constructor(octaves?: I32, frequency?: F32, lacunarity?: F32, persistence?: F32)
	value(x: F32, y: F32): F32
	
	/**
	The number of octaves in the noise (how many "layers").
	Default: 1
	*/
	protected octaves: I32
	
	/**
	The frequency of the base noise layer.
	Default: 1
	*/
	protected frequency: F32
	
	/**
	The multiplier of the frequency per octave.
	Default: 2
	*/
	protected lacunarity: F32
	
	/**
	The multiplier of the amplitude per octave.
	Default: 0.5
	*/
	protected persistence: F32
	protected static uvec: F32
	protected static grad3: F32[]
	protected static p: number[]
	protected static perm: number[]
	protected static perm12: number[]
	protected static dot3(g: number, x: F32, y: F32, z: F32): F32
	protected static F3: F32
	protected static G3: F32
	static noise(xin: F32, yin: F32, zin: F32): F32
}
