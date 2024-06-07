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
		switch (b) {
			case 1:
				return a;
			case 2:
				return a * a;
			case 3:
				return a * a * a;
			case 4:
				return a * a * a * a;
			case 5:
				return a * a * a * a * a;
			case _:
				throw 'ipow can only do 1-5 for exp.';
		}
	}

	inline public static function pow(v:F32, exp:F32):F32 {
		return Math.pow(v, exp);
	}

	inline public static function min(a:F32, b:F32):F32 {
		return a < b ? a : b;
	}

	inline public static function max(a:F32, b:F32):F32 {
		return a > b ? a : b;
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
		return f >= 0 ? Std.int(f) : Std.int(f - 1);
	}

	inline public static function ceil(f:F32):I32 {
		return Math.ceil(f);
		//     return f >= 0 ? Std.int(f + 1) : Std.int(f);
	}

	inline public static function round(f:F32):I32 {
		return f >= 0 ? Std.int(f + 0.5) : Std.int(f - 0.5);
	}
}
