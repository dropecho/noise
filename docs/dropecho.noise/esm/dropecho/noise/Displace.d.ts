import {IModule2D} from "./IModule2D"

export declare class Displace implements IModule2D {
	constructor(input: IModule2D, xModule: IModule2D, yModule?: null | IModule2D)
	power: number
	protected _input: IModule2D
	protected _xModule: IModule2D
	protected _yModule: IModule2D
	protected same_module: boolean
	value(x: number, y: number): number
}
