/**
 * Implementation of the Park Miller (1988) "minimal standard" linear 
 * congruential pseudo-random number generator.
 * 
 * For a full explanation visit: http://www.firstpr.com.au/dsp/rand31/
 * 
 * The generator uses a modulus constant (m) of 2^31 - 1 which is a
 * Mersenne Prime number and a full-period-multiplier of 16807.
 * Output is a 31 bit unsigned integer. The range of values output is
 * 1 to 2,147,483,646 (2^31-1) and the seed must be in this range too.
 * 
 * David G. Carta's optimisation which needs only 32 bit integer math,
 * and no division is actually *slower* in flash (both AS2 & AS3) so
 * it's better to use the double-precision floating point version.
 * 
 * @author Michael Baczynski, www.polygonal.de
 * @author Alexander Veenendaal, opendoorgonorth.com
 */

package dropecho.utils;

class NoiseGen {
	var seed:Int;

	function new() {
		this.seed = 1;
	}

	/**
	 * provides the next pseudorandom number
	 * as an unsigned integer (31 bits)
	 */
	inline public function nextInt() {
		return this.gen();
	}

	/**
	 * provides the next pseudorandom number
	 * as a float between nearly 0 and nearly 1.0.
	 */
	inline public function nextDouble() {
		return (this.gen() / 2147483647);
	}

	/**
	 * provides the next pseudorandom number
	 * as a boolean
	 */
	inline public function nextBoolean() {
		return (this.gen() % 2) == 0;
	}

	/**
	 * provides the next pseudorandom number
	 * as an unsigned integer (31 bits) betweeen
	 * a given range.
	 */
	inline public function nextIntRange(min, max) {
		// min -= .4999;
		// max += .4999;
		return Math.round(min + ((max - min) * this.nextDouble()));
	}

	/**
	 * provides the next pseudorandom number
	 * as a float between a given range.
	 */
	inline public function nextDoubleRange(min, max) {
		return min + ((max - min) * this.nextDouble());
	}

	inline public function gen() {
		// integer version 1, for max int 2^46 - 1 or larger.
		return this.seed = (this.seed * 16807) % 2147483647;
	}
}
