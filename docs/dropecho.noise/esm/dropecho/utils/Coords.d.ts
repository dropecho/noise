import {F32} from "./FastMath"

export type LatLong = {
	latitude: F32, 
	longitude: F32
}

export type XY = {
	x: F32, 
	y: F32
}

export declare class Coords {
	static mercatorXYToLatLong(x: F32, y: F32, r: F32): LatLong
	static mercatorLatLongToXY(lat: F32, lon: F32, r: F32): XY
}
