package dropecho.noise;

import haxe.ds.Map as HaxeMap;

typedef Point = {x:Float, y:Float}

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Cache implements IModule2D {
	private var cache:HaxeMap<Point, Float> = new HaxeMap<Point, Float>();

	/**
	 * @param input The IModule2D to get a value from. 
	 */
	public function new(input:IModule2D);

	public function value(x:Float, y:Float):Float {
		var point = {x: x, y: y};
		if (!this.cache.exists(point)) {
			this.cache.set(point, input.value(x, y));
		}

		return this.cache.get(point);
	}
}
