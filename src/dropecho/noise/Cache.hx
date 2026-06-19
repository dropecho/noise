package dropecho.noise;

import dropecho.utils.FastMath;

/** Caches source module output to avoid redundant computation when the same coordinates are queried repeatedly by multiple consumers. */
@:build(dropecho.macros.Constructor.fromArgs())
class Cache implements IModule2D {
	private var cache:haxe.ds.StringMap<F32> = new haxe.ds.StringMap<F32>();

	/**
	 * @param input The IModule2D to get a value from.
	 */
	public function new(input:IModule2D);

	public function value(x:F32, y:F32):F32 {
		var key = keyOf(x) + ":" + keyOf(y);
		var cached = cache.get(key);
		if (cached == null) {
			cached = input.value(x, y);
			cache.set(key, cached);
		}
		return cached;
	}

	// Key on the full IEEE-754 bit pattern so distinct coordinates never collide.
	// Widening F32 -> double is lossless, so this is exact on every target — unlike
	// floatToI32, which truncates to float32 and would alias distinct doubles on
	// JS/Python (where F32 = Float, i.e. 64-bit double) onto one cache entry.
	static inline function keyOf(v:F32):String {
		return haxe.Int64.toStr(haxe.io.FPHelper.doubleToI64(v));
	}
}
