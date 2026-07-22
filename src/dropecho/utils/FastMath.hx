package dropecho.utils;

import haxe.Int32;

#if (cs || java || hl || cpp)
typedef F32 = Single;
#else
typedef F32 = Float;
#end
typedef I32 = Int32;

// Constants
inline final MAX_I32:I32 = 2_147_483_647;
inline final MIN_I32:I32 = -2_147_483_648;
inline final MAX_F32:F32 = 3.40282347e+38;
inline final MIN_F32:F32 = -3.40282347e+38;

@:nativeGen
class FastMath {
	inline public static function ipow(a:F32, b:I32):F32 {
		// Written as a switch expression (single return) rather than a return in
		// each arm: the GDScript target only appends a fallback return when the
		// whole body is unreachable, so a switch whose default throws would emit
		// a match with no trailing return and fail "not all code paths return".
		return switch (b) {
			case 1: a;
			case 2: a * a;
			case 3: a * a * a;
			case 4: a * a * a * a;
			case 5: a * a * a * a * a;
			case _: throw 'ipow can only do 1-5 for exp.';
		}
	}

	inline public static function pow(v:F32, exp:F32):F32 {
		return Math.pow(v, exp);
	}

	inline public static function min(a:F32, b:F32):F32 {
		#if cs
		return Math.min(a, b);
		#else
		return a < b ? a : b;
		#end
	}

	inline public static function max(a:F32, b:F32):F32 {
		#if cs
		return Math.max(a, b);
		#else
		return a < b ? b : a;
		#end
	}

	inline public static function abs(f:F32):F32 {
		#if cs
		return Math.abs(f);
		#else
		return f >= 0 ? f : -f;
		#end
	}

	inline public static function sqrt(f:F32):F32 {
		return Math.sqrt(f);
	}

	inline public static function floor(f:F32):I32 {
		#if cs
		return Math.floor(f);
		#else
		var t = Std.int(f);
		return f < t ? t - 1 : t;
		#end
	}

	inline public static function ceil(f:F32):I32 {
		#if cs
		return Math.ceil(f);
		#else
		var t = Std.int(f);
		return f > t ? t + 1 : t;
		#end
	}

	inline public static function round(f:F32):I32 {
		return f >= 0 ? Std.int(f + 0.5) : Std.int(f - 0.5);
	}
}
