import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Scales input coordinates by a scalar before sampling the source module. Equivalent to multiplying the source module's frequency.
*/
export declare class Scale implements IModule2D {
	constructor(input: IModule2D, s: F32)
	protected _input: IModule2D
	protected _scalar: F32
	value(x: F32, y: F32): F32
}
