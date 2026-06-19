package dropecho.noise;

import dropecho.utils.FastMath;

/**
 * Contract for a 2D noise module.
 *
 * Modules are immutable after construction: all configuration is supplied to the
 * constructor and stored in private fields. Do not expose public mutable state or
 * setters — `value(x, y)` must be a pure function of the coordinates and the
 * values fixed at construction, so a module can be shared and sampled safely.
 */
interface IModule2D {
	public function value(x:F32, y:F32):F32;
}
