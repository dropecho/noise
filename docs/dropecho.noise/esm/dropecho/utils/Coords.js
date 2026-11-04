import {Register} from "../../genes/Register.js"

const $global = Register.$global

export const Coords = Register.global("$hxClasses")["dropecho.utils.Coords"] = 
class Coords {
	static mercatorXYToLatLong(x, y, r) {
		return {"longitude": x / r, "latitude": 2 * Math.atan(Math.exp(y / r)) - Math.PI / 2};
	}
	static mercatorLatLongToXY(lat, lon, r) {
		return {"x": r * lon, "y": r * Math.log(Math.tan((lat + Math.PI / 2) / 2))};
	}
	static get __name__() {
		return "dropecho.utils.Coords"
	}
	get __class__() {
		return Coords
	}
}

