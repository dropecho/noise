import {IModule2D} from "./IModule2D"

export declare class Multiply implements IModule2D {
	constructor(input: IModule2D, input2: IModule2D)
	value(x: number, y: number): number
	
	/**
	The IModule2D to get a value from.
	Default: null
	*/
	protected input: IModule2D
	
	/**
	
	*/
	protected input2: IModule2D
}
