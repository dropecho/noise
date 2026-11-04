import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Displaces input coordinates using separate x and y noise modules before sampling the source.
* If only one displacement module is provided, it is used for both axes.
*/
export declare class Displace implements IModule2D {
	constructor(input: IModule2D, xModule: IModule2D, yModule?: null | IModule2D, power?: F32)
	protected _input: IModule2D
	protected _xModule: IModule2D
	protected _yModule: IModule2D
	protected _sameModule: boolean
	protected _power: F32
	value(x: F32, y: F32): F32
}
