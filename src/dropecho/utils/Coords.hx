package dropecho.utils;

import dropecho.utils.FastMath;

typedef LatLong = {longitude:F32, latitude:F32};
typedef XY = {x:F32, y:F32};

@:nativeGen
class Coords {
	public static inline function mercatorXYToLatLong(x:F32, y:F32, r:F32):LatLong {
		return {
			longitude: x / r,
			latitude: 2 * Math.atan(Math.exp(y / r)) - Math.PI / 2,
		};
	}

	public static inline function mercatorLatLongToXY(lat:F32, lon:F32, r:F32):XY {
		return {x: r * lon, y: r * Math.log(Math.tan((lat + Math.PI / 2) / 2))};
	}
}
