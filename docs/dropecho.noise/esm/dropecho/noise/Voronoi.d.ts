import {F32} from "../utils/FastMath"
import {IModule2D} from "./IModule2D"

/**
* Voronoi (cellular) noise generator. Divides space into cells seeded by a fast integer hash,
* then outputs a hash value of the nearest cell center. Supports Euclidean, Manhattan, and
* Chebyshev distance metrics via the DistanceType enum.
*/
export declare class Voronoi implements IModule2D {
	constructor(frequency: F32, distanceType?: null | number)
	value(x: F32, y: F32): F32
	
	/**
	
	*/
	protected frequency: F32
	
	/**
	
	*/
	protected distanceType: number
	protected static halfUnitVec: F32
}
