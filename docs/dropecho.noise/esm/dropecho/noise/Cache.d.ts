import {StringMap} from "../../haxe/ds/StringMap"
import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
Caches source module output to avoid redundant computation when the same coordinates are queried repeatedly by multiple consumers.
*/
export declare class Cache implements IModule2D {
	constructor(input: IModule2D)
	protected cache: StringMap<F32>
	value(x: F32, y: F32): F32
	
	/**
	The IModule2D to get a value from.
	Default: null
	*/
	protected input: IModule2D
	protected static keyOf(v: F32): string
}
