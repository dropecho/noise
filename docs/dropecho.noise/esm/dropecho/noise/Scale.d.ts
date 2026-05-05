import {IModule2D} from "./IModule2D"

export declare class Scale implements IModule2D {
	constructor(input: IModule2D, s: number)
	protected _input: IModule2D
	protected _scalar: number
	value(x: number, y: number): number
}
