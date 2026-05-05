import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

export declare class Worley implements IModule2D {
	constructor(frequency: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected frequency: F32
	protected static halfUnitVec: F32
}
