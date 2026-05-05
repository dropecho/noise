import {Map as Map__1} from "../../haxe/ds/Map"
import {IModule2D} from "./IModule2D"

export type Point = {
	x: number, 
	y: number
}

export declare class Cache implements IModule2D {
	constructor(input: IModule2D)
	protected cache: HaxeMap<Point, number>
	value(x: number, y: number): number
	
	/**
	The IModule2D to get a value from.
	Default: null
	*/
	protected input: IModule2D
}
