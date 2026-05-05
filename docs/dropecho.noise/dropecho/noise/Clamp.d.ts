import {IModule2D} from "./IModule2D"

export declare class Clamp implements IModule2D {
	constructor(input: IModule2D, min?: number, max?: number)
	value(x: number, y: number): number
	
	/**
	The IModule2D to get a value from.
	Default: null
	*/
	protected input: IModule2D
	
	/**
	The minimum value to clamp to.
	Default: -1
	*/
	protected min: number
	
	/**
	The maximum value to clamp to.
	Default: 1
	*/
	protected max: number
}
