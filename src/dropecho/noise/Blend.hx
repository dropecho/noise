package dropecho.noise;

import haxe.ds.Vector;
import dropecho.utils.FastMath;
import dropecho.utils.MathUtils;

/** Linearly interpolates between two source modules using a third module as the blend factor. The blender output is used directly as the lerp alpha. */
@:build(dropecho.macros.Constructor.fromArgs())
class Blend implements IGridModule2D {
	public function new(from:IModule2D, to:IModule2D, blender:IModule2D);

	public function value(x:F32, y:F32):F32 {
		var blendValue = blender.value(x, y);
		if (blendValue <= 0) return from.value(x, y);
		if (blendValue >= 1) return to.value(x, y);
		return MathUtils.lerp(from.value(x, y), to.value(x, y), blendValue);
	}

	public function values(out:Vector<F32>, xs:Vector<F32>, ys:Vector<F32>, count:Int):Void {
		var weights = new Vector<F32>(count);
		Batch.values(blender, weights, xs, ys, count);
		Batch.lerpByWeight(from, to, weights, out, xs, ys, count);
	}

	public function grid(out:Vector<F32>, xs:Vector<F32>, width:Int, ys:Vector<F32>, height:Int):Void {
		var weights = new Vector<F32>(width * height);
		Batch.gridValues(blender, weights, xs, width, ys, height);
		Batch.lerpByWeightGrid(from, to, weights, out, xs, width, ys, height);
	}
}
