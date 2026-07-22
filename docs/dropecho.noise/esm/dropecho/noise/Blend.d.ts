import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Linearly interpolates between two source modules using a third module as the blend factor. The blender output is used directly as the lerp alpha.
*/
export declare class Blend implements IModule2D {
	constructor(from: IModule2D, to: IModule2D, blender: IModule2D)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected from: IModule2D
	
	/**
	
	*/
	protected to: IModule2D
	
	/**
	
	*/
	protected blender: IModule2D
}
