import {F32} from "./FastMath"

export declare class Coords {
	static MercatorXYtoLatLong(x: F32, y: F32, R: F32): {
		latitude: number, 
		longitude: number
	}
	static MercatorLatLongToXY(lat: F32, $long: F32, R: F32): {
		x: number, 
		y: number
	}
}
