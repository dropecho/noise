package dropecho.utils;

import dropecho.utils.FastMath;

@:nativeGen
class Coords {
	// The inverse mapping of a given map location (x,y)
	public static function MercatorXYtoLatLong(x:F32, y:F32, R:F32) {
		var longitude = x / R;
		var latitude = 2 * Math.atan(Math.exp(y / R)) - Math.PI / 2;

		return {
			longitude: longitude,
			latitude: latitude,
		};
	}

	public static function MercatorLatLongToXY(lat:F32, long:F32, R:F32) {
		var x = R * long;
		var y = R * Math.log(Math.tan((lat + Math.PI / 2) / 2));

		return {x: x, y: y};
	}
}
