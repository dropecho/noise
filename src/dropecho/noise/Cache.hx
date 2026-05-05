package dropecho.noise;

/** Caches source module output to avoid redundant computation when the same coordinates are queried repeatedly by multiple consumers. */
@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Cache implements IModule2D {
	private var cache:haxe.ds.StringMap<Float> = new haxe.ds.StringMap<Float>();

	/**
	 * @param input The IModule2D to get a value from.
	 */
	public function new(input:IModule2D);

	public function value(x:Float, y:Float):Float {
		var key = '$x:$y';
		var cached = cache.get(key);
		if (cached == null) {
			cached = input.value(x, y);
			cache.set(key, cached);
		}
		return cached;
	}
}
