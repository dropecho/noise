import {Xorshift128Plus} from "./Xorshift128Plus.js"
import {GeneratorInterface} from "./GeneratorInterface.js"
import {Bytes} from "../haxe/io/Bytes.js"
import {Sha1} from "../haxe/crypto/Sha1.js"
import {___Int64} from "../haxe/Int64.js"
import {Register} from "../genes/Register.js"
import {UInt} from "../UInt.js"
import {Std} from "../Std.js"

const $global = Register.$global

/**
General featured interface to a pseudorandom number generator.
*/
export const Random = Register.global("$hxClasses")["seedyrng.Random"] = 
class Random extends Register.inherits() {
	new(seed, generator) {
		if (seed == null) {
			seed = new ___Int64(Random.randomSystemInt(), Random.randomSystemInt());
		};
		if (generator == null) {
			generator = new Xorshift128Plus();
		};
		this.generator = generator;
		this.set_seed(seed);
	}
	get seed() {
		return this.get_seed()
	}
	set seed(v) {
		this.set_seed(v)
	}
	get state() {
		return this.get_state()
	}
	set state(v) {
		this.set_state(v)
	}
	get usesAllBits() {
		return this.get_usesAllBits()
	}
	get_seed() {
		return this.generator.get_seed();
	}
	set_seed(value) {
		return this.generator.set_seed(value);
	}
	get_state() {
		return this.generator.get_state();
	}
	set_state(value) {
		return this.generator.set_state(value);
	}
	get_usesAllBits() {
		return this.generator.get_usesAllBits();
	}
	nextInt() {
		return this.generator.nextInt();
	}
	
	/**
	Returns an integer where all bits are uniformly distributed.
	*/
	nextFullInt() {
		if (this.generator.get_usesAllBits()) {
			return this.generator.nextInt();
		} else {
			var num1 = this.generator.nextInt();
			var num2 = this.generator.nextInt();
			num2 = num2 >>> 16 | num2 << 16;
			return num1 ^ num2;
		};
	}
	
	/**
	Derives and sets a seed using the given string.
	
	This method encodes the string (supposedly UTF-8 all on targets) and
	derives a seed using `setBytesSeed`.
	*/
	setStringSeed(seed) {
		this.setBytesSeed(Bytes.ofString(seed));
	}
	
	/**
	Derives and sets a seed using the given bytes.
	
	This method works by using the SHA-1 hashing algorithm. A 64-bit
	integer is obtained from the first 64 bits of the digest with the order
	of bytes in little endian encoding.
	*/
	setBytesSeed(seed) {
		this.set_seed(Sha1.make(seed).getInt64(0));
	}
	
	/**
	Returns a floating point number in the range [0, 1), That is, a number
	greater or equal to 0 and less than 1.
	
	The distribution is approximately uniform.
	*/
	random() {
		var upper = this.nextFullInt() & 2097151;
		return (UInt.toFloat(this.nextFullInt()) + upper * Math.pow(2, 32)) * Math.pow(2, -53);
	}
	
	/**
	Returns an integer within the given range [`lower`, `upper`]. That is,
	a number within `lower` inclusive and `upper` inclusive.
	
	This method uses `random()` which the distribution approximately
	uniform. For large ranges greater than 2^53, the distribution will
	be noticeably biased.
	*/
	randomInt(lower, upper) {
		return Math.floor(this.random() * (upper - lower + 1)) + lower;
	}
	
	/**
	Returns a uniformly distributed floating point number within the
	given range [`lower`, `upper`). That is, a number within `lower`
	inclusive and `upper` exclusive.
	
	Note when `lower` or `upper` approach precision limits, the
	returned number may equal `upper` due to rounding.
	*/
	uniform(lower, upper) {
		return this.random() * (upper - lower) + lower;
	}
	
	/**
	Returns an element from the given array.
	*/
	choice(array) {
		return array[this.randomInt(0, array.length - 1)];
	}
	
	/**
	Shuffles the elements, in-place, in the given array.
	
	The shuffle algorithm is modern Fisher-Yates. The underlying number
	generator limits the number of permutations possible.
	This means that using this method alone to shuffle a deck of 52 cards
	will not result in all possible outcomes.
	*/
	shuffle(array) {
		var _g = 0;
		var _g1 = array.length - 1;
		while (_g < _g1) {
			var index = _g++;
			var randIndex = this.randomInt(index, array.length - 1);
			var tempA = array[index];
			array[index] = array[randIndex];
			array[randIndex] = tempA;
		};
	}
	
	/**
	Returns a (non-secure) random integer from the system.
	
	This method can be used construct and obtain a seed. Unlike
	regular `Sys.random`, all bits are usable.
	
	For high-quality (cryptographic) random numbers, see the
	trandom library (https://lib.haxe.org/p/trandom).
	*/
	static randomSystemInt() {
		return Std.random(255) << 24 | Std.random(255) << 16 | Std.random(255) << 8 | Std.random(255);
	}
	static get __name__() {
		return "seedyrng.Random"
	}
	static get __interfaces__() {
		return [GeneratorInterface]
	}
	get __class__() {
		return Random
	}
}

