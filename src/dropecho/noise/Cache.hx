package dropecho.noise;

import dropecho.utils.FastMath;

/** Caches source module output to avoid redundant computation when the same coordinates are queried repeatedly by multiple consumers. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Cache implements IModule2D {
	private var cache:haxe.ds.IntMap<haxe.ds.IntMap<F32>> = new haxe.ds.IntMap<haxe.ds.IntMap<F32>>();

	/**
	 * @param input The IModule2D to get a value from.
	 */
	public function new(input:IModule2D);

	public function value(x:F32, y:F32):F32 {
		var ix = haxe.io.FPHelper.floatToI32(x);
		var iy = haxe.io.FPHelper.floatToI32(y);
		var row = cache.get(ix);
		if (row == null) {
			row = new haxe.ds.IntMap<F32>();
			cache.set(ix, row);
		}
		var cached = row.get(iy);
		if (cached == null) {
			cached = input.value(x, y);
			row.set(iy, cached);
		}
		return cached;
	}
}
