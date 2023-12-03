package dropecho.utils;

typedef Easing = Float->Float;

class MathUtils {
	/**
	 * Calculate a parametric bezier curve with control points p0,p1,p2,p3.
	 * @param t The distance along the curve to get the value for. 
	 */
	public static inline function easeBezier(t:Float, p0:Float, p1:Float, p2:Float, p3:Float) {
		var t = clamp(t, 0, 1);
		var t0 = Math.pow((1 - t), 3) * p0;
		var t1 = 3 * Math.pow((1 - t), 2) * Math.pow(t, 2) * p1;
		var t2 = 3 * (1 - t) * Math.pow(t, 2) * p2;
		var t3 = Math.pow(t, 3) * p3;

		return clamp(t0 + t1 + t2 + t3, 0, 1);
	}

	public static inline function lerp(t:Float, a:Float, b:Float):Float {
		return a + t * (b - a);
	}

	public static inline function easeOutCirc(x:Float):Float {
		return Math.sqrt(1 - Math.pow(x - 1, 2));
	}

	public static inline function easeOutSine(x:Float):Float {
		return Math.sin((x * Math.PI) / 2);
	}

	public static inline function easeInSine(x:Float):Float {
		return 1 - Math.cos((x * Math.PI) / 2);
	}

	static inline public function sine(k:Float) {
		return Math.sin(k);
	}

	static public function mapEasing(val:Float, fromMin:Float, fromMax:Float, toMin:Float, toMax:Float, easing:Easing):Float {
		return easing(1 + inverseLerp(val, fromMin, fromMax)) * (toMax - toMin);
	}

	static public function map(val:Float, fromMin:Float, fromMax:Float, toMin:Float, toMax:Float):Float {
		return mapEasing(val, fromMin, fromMax, toMin, toMax, k -> k);
	}

	static public function inverseLerp(t:Float, a:Float, b:Float):Float {
    return (t - a) / (b - a);
	}

	static public function clamp(val:Float, min:Float, max:Float) {
		return Math.max(min, Math.min(val, max));
	}
}
