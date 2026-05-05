import {Register} from "../../genes/Register.js"

const $global = Register.$global

export const MathUtils = Register.global("$hxClasses")["dropecho.utils.MathUtils"] = 
class MathUtils {
	
	/**
	* Calculate a parametric bezier curve with control points p0,p1,p2,p3.
	* @param t The distance along the curve to get the value for.
	*/
	static easeBezier(t, p0, p1, p2, p3) {
		var b = (t < 1) ? t : 1;
		var t = (0 < b) ? b : 0;
		var a = 1 - t;
		var a1 = 1 - t;
		var val = a * a * a * p0 + 3 * (a1 * a1) * (t * t) * p1 + 3 * (1 - t) * (t * t) * p2 + t * t * t * p3;
		var b = (val < 1) ? val : 1;
		if (0 < b) {
			return b;
		} else {
			return 0;
		};
	}
	static fade(t) {
		return t * t * t * (t * (t * 6 - 15) + 10);
	}
	static lerp(from, to, alpha) {
		return from + (to - from) * alpha;
	}
	static easeOutCirc(x) {
		var a = x - 1;
		return Math.sqrt(1 - a * a);
	}
	static easeOutSine(x) {
		return Math.sin(x * Math.PI / 2);
	}
	static easeInSine(x) {
		return 1 - Math.cos(x * Math.PI / 2);
	}
	static sine(k) {
		return Math.sin(k);
	}
	static mapEasing(val, fromMin, fromMax, toMin, toMax, easing) {
		return easing(1 + (val - fromMin) / (fromMax - fromMin)) * (toMax - toMin);
	}
	static map(val, fromMin, fromMax, toMin, toMax) {
		return (1 + (val - fromMin) / (fromMax - fromMin)) * (toMax - toMin);
	}
	static inverseLerp(t, a, b) {
		return (t - a) / (b - a);
	}
	static clamp(val, min, max) {
		var b = (val < max) ? val : max;
		if (min < b) {
			return b;
		} else {
			return min;
		};
	}
	static get __name__() {
		return "dropecho.utils.MathUtils"
	}
	get __class__() {
		return MathUtils
	}
}

