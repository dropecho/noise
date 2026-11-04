import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Rotates input coordinates by a fixed angle (in radians) around the origin before sampling the source module. Cos/sin are pre-computed at construction time.
*/
export declare class RotatePoint implements IModule2D {
	constructor(input: IModule2D, angle?: F32)
	protected input: IModule2D
	protected cosAngle: F32
	protected sinAngle: F32
	value(x: F32, y: F32): F32
}
