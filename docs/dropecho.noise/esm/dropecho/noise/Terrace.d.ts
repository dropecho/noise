import {IModule2D} from "./IModule2D"

export type ControlPoint = {
	max: number, 
	min: number, 
	val: number
}

export declare class Terrace implements IModule2D {
	constructor(input: IModule2D, points: ControlPoint[])
	value(x: number, y: number): number
	
	/**
	
	*/
	protected input: IModule2D
	
	/**
	The list of control points.
	Default: null
	*/
	protected points: ControlPoint[]
}
