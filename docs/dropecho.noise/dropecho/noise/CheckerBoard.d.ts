import {IModule2D} from "./IModule2D"

export declare class CheckerBoard implements IModule2D {
	constructor(frequency?: number)
	value(x: number, y: number): number
	
	/**
	
	*/
	protected frequency: number
}
