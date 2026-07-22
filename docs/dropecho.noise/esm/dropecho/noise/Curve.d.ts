import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

export type CurvePoint = {
	input: F32, 
	output: F32
}

/**
* Maps source module output through a piecewise Catmull-Rom spline defined by
* (input, output) control point pairs. Control points must be sorted by input value.
* Values outside the range of the control points are clamped to the nearest endpoint.
*/
export declare class Curve implements IModule2D {
	constructor(input: IModule2D, points: CurvePoint[])
	protected input: IModule2D
	protected inputs: F32[]
	protected outputs: F32[]
	protected n: number
	value(x: F32, y: F32): F32
	protected catmullRom(p0: F32, p1: F32, p2: F32, p3: F32, t: F32): F32
}
