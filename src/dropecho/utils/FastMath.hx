package dropecho.utils;

class FastMath {
	inline public static function min(a:Float, b:Float):Float {
		return a < b ? a : b;
	}

	inline public static function max(a:Float, b:Float):Float {
		return a > b ? a : b;
	}

	inline public static function abs(f:Float):Float {
		return f < 0 ? -f : f;
	}

	inline public static function sqrt(f:Float):Float {
		return Math.sqrt(f);
	}

	inline public static function floor(f:Float):Int {
		return f >= 0 ? Std.int(f) : Std.int(f - 1);
	}

	inline public static function round(f:Float):Int {
		return f >= 0 ? Std.int(f + 0.5) : Std.int(f - 0.5);
	}
}
