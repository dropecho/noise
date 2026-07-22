import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

export type ControlPoint = {
	max: F32, 
	min: F32, 
	val: F32
}

/**
Maps source module output to discrete stepped values using [min, max, val] control points. Values that fall in a control point's range are snapped to its val; others pass through unchanged.
*/
export declare class Terrace implements IModule2D {
	constructor(input: IModule2D, points: ControlPoint[])
	protected input: IModule2D
	protected mins: F32[]
	protected maxs: F32[]
	protected vals: F32[]
	protected n: number
	value(x: F32, y: F32): F32
}
