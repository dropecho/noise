import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Outputs one of two source modules based on a control module's value relative to a threshold.
* When falloff > 0, a smooth fade is applied in the region [threshold - falloff, threshold + falloff]
* using a 5th-order fade curve. Outside that region the selection is hard.
*/
export declare class Select implements IModule2D {
	constructor(a: IModule2D, b: IModule2D, control: IModule2D, threshold?: F32, falloff?: F32)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected a: IModule2D
	
	/**
	
	*/
	protected b: IModule2D
	
	/**
	
	*/
	protected control: IModule2D
	
	/**
	
	*/
	protected threshold: F32
	
	/**
	
	*/
	protected falloff: F32
}
