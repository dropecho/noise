import {Exception} from "../../haxe/Exception.js"
import {Register} from "../../genes/Register.js"

const $global = Register.$global

export const FastMath = Register.global("$hxClasses")["dropecho.utils.FastMath"] = 
class FastMath {
	static ipow(a, b) {
		switch (b) {
			case 1:
				return a;
				break
			case 2:
				return a * a;
				break
			case 3:
				return a * a * a;
				break
			case 4:
				return a * a * a * a;
				break
			case 5:
				return a * a * a * a * a;
				break
			default:
			throw Exception.thrown("ipow can only do 1-5 for exp.");
			
		};
	}
	static pow(v, exp) {
		return Math.pow(v, exp);
	}
	static min(a, b) {
		if (a < b) {
			return a;
		} else {
			return b;
		};
	}
	static max(a, b) {
		if (a < b) {
			return b;
		} else {
			return a;
		};
	}
	static abs(f) {
		if (f >= 0) {
			return f;
		} else {
			return -f;
		};
	}
	static sqrt(f) {
		return Math.sqrt(f);
	}
	static floor(f) {
		var t = f | 0;
		if (f < t) {
			return t - 1;
		} else {
			return t;
		};
	}
	static ceil(f) {
		var t = f | 0;
		if (f > t) {
			return t + 1;
		} else {
			return t;
		};
	}
	static round(f) {
		if (f >= 0) {
			return f + 0.5 | 0;
		} else {
			return f - 0.5 | 0;
		};
	}
	static get __name__() {
		return "dropecho.utils.FastMath"
	}
	get __class__() {
		return FastMath
	}
}


export const FastMath_Fields_ = Register.global("$hxClasses")["dropecho.utils._FastMath.FastMath_Fields_"] = 
class FastMath_Fields_ {
	static get __name__() {
		return "dropecho.utils._FastMath.FastMath_Fields_"
	}
	get __class__() {
		return FastMath_Fields_
	}
}


FastMath_Fields_.MAX_I32 = 2147483647
FastMath_Fields_.MIN_I32 = -2147483648
FastMath_Fields_.MAX_F32 = 3.40282347e+38
FastMath_Fields_.MIN_F32 = -3.40282347e+38
export const MAX_I32 = FastMath_Fields_.MAX_I32
export const MIN_I32 = FastMath_Fields_.MIN_I32
export const MAX_F32 = FastMath_Fields_.MAX_F32
export const MIN_F32 = FastMath_Fields_.MIN_F32
