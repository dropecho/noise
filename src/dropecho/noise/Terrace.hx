package dropecho.noise;

typedef ControlPoint = {
	var min:Float;
	var max:Float;
	var val:Float;
}

@:build(dropecho.utils.TypeBuildingMacros.autoConstruct())
class Terrace implements IModule2D {
	/**
	 * Use a list of control points to terrace the value.
	 * If the value if between min and max of a control point, it is set to the control
	 * points value, otherwise the original value is returned.
	 *
	 * @param v The value to terrace.
	 * @param points The list of control points. 
	 * @return The terraced value. 
	 */
	public function new(input:IModule2D, points:Array<ControlPoint>);

	public function value(x:Float, y:Float):Float {
		var v = input.value(x, y);

		if (points != null) {
			for (point in points) {
				if (v >= point.min && v < point.max) {
					return point.val;
				}
			}
		}

		return v;
	}
}
