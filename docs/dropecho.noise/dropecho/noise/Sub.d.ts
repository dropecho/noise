import {IModule2D} from "./IModule2D"

export declare class Sub implements IModule2D {
	constructor(input: IModule2D, input2: IModule2D)
	value(x: number, y: number): number
	
	/**
	
	*/
	protected input: IModule2D
	
	/**
	
	*/
	protected input2: IModule2D
}
