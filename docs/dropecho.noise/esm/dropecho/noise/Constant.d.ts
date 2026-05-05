import {IModule2D} from "./IModule2D"

export declare class Constant implements IModule2D {
	constructor(constant: number)
	value(x: number, y: number): number
	
	/**
	
	*/
	protected constant: number
}
