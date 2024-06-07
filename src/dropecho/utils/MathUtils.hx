package dropecho.utils;

import dropecho.utils.FastMath;

typedef Easing = F32->F32;

class MathUtils {
	/**
	 * Calculate a parametric bezier curve with control points p0,p1,p2,p3.
	 * @param t The distance along the curve to get the value for. 
	 */
	public static inline function easeBezier(t:F32, p0:F32, p1:F32, p2:F32, p3:F32) {
		var t = clamp(t, 0, 1);
		var t0 = FastMath.ipow((1 - t), 3) * p0;
		var t1 = 3 * FastMath.ipow((1 - t), 2) * FastMath.ipow(t, 2) * p1;
		var t2 = 3 * (1 - t) * FastMath.ipow(t, 2) * p2;
		var t3 = FastMath.ipow(t, 3) * p3;

		return clamp(t0 + t1 + t2 + t3, 0, 1);
	}

	public static inline function fade(t:F32):F32 {
		return t * t * t * (t * (t * 6 - 15) + 10);
	}

	public static inline function lerp(t:F32, a:F32, b:F32):F32 {
		return (1 - t) * a + t * b;
		//     return a + t * (b - a);
	}

	public static inline function easeOutCirc(x:F32):F32 {
		return FastMath.sqrt(1 - FastMath.ipow(x - 1, 2));
	}

	public static inline function easeOutSine(x:F32):F32 {
		return Math.sin((x * Math.PI) / 2);
	}

	public static inline function easeInSine(x:F32):F32 {
		return 1 - Math.cos((x * Math.PI) / 2);
	}

	static inline public function sine(k:F32) {
		return Math.sin(k);
	}

	static inline public function mapEasing(val:F32, fromMin:F32, fromMax:F32, toMin:F32, toMax:F32, easing:Easing):F32 {
		return easing(1 + inverseLerp(val, fromMin, fromMax)) * (toMax - toMin);
	}

	static inline public function map(val:F32, fromMin:F32, fromMax:F32, toMin:F32, toMax:F32):F32 {
		return mapEasing(val, fromMin, fromMax, toMin, toMax, k -> k);
	}

	static inline public function inverseLerp(t:F32, a:F32, b:F32):F32 {
		return (t - a) / (b - a);
	}

	static inline public function clamp(val:F32, min:F32, max:F32) {
		return FastMath.max(min, FastMath.min(val, max));
	}
}
