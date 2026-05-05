package utils;

import utest.Assert;
import dropecho.utils.Coords;

class CoordsTests extends utest.Test {
	public function test_mercator_xy_to_latlong() {
		var x = 1.0;
		var y = 1.0;
		var r = 10.0;
		var latlong = Coords.mercatorXYToLatLong(x, y, r);
		var back = Coords.mercatorLatLongToXY(latlong.latitude, latlong.longitude, r);
		Assert.floatEquals(x, back.x);
		Assert.floatEquals(y, back.y);
	}

	public function test_mercator_latlong_to_xy() {
		var lat = 0.1;
		var lon = 0.1;
		var r = 10.0;
		var xy = Coords.mercatorLatLongToXY(lat, lon, r);
		var back = Coords.mercatorXYToLatLong(xy.x, xy.y, r);
		Assert.floatEquals(lat, back.latitude);
		Assert.floatEquals(lon, back.longitude);
	}
}
