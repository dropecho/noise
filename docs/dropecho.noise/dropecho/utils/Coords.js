import {Register} from "../../genes/Register.js"

const $global = Register.$global

export const Coords = Register.global("$hxClasses")["dropecho.utils.Coords"] = 
class Coords {
	static MercatorXYtoLatLong(x, y, R) {
		var latitude = 2 * Math.atan(Math.exp(y / R)) - Math.PI / 2;
		return {"longitude": x / R, "latitude": latitude};
	}
	static MercatorLatLongToXY(lat, $long, R) {
		var y = R * Math.log(Math.tan((lat + Math.PI / 2) / 2));
		return {"x": R * $long, "y": y};
	}
	static get __name__() {
		return "dropecho.utils.Coords"
	}
	get __class__() {
		return Coords
	}
}

