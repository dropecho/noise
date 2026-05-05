import {IModule2D} from "./IModule2D"

export declare class Blend implements IModule2D {
	constructor(from: IModule2D, to: IModule2D, blender: IModule2D)
	value(x: number, y: number): number
	
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
