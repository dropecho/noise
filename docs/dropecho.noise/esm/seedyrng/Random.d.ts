import {GeneratorInterface} from "./GeneratorInterface"
import {Bytes} from "../haxe/io/Bytes"
import {__Int64} from "../haxe/Int64"

/**
General featured interface to a pseudorandom number generator.
*/
export declare class Random implements GeneratorInterface {
	constructor(seed?: null | __Int64, generator?: null | GeneratorInterface)
	seed: __Int64
	state: Bytes
	readonly usesAllBits: boolean
	protected generator: GeneratorInterface
	protected get_seed(): __Int64
	protected set_seed(value: __Int64): __Int64
	protected get_state(): Bytes
	protected set_state(value: Bytes): Bytes
	protected get_usesAllBits(): boolean
	nextInt(): number
	
	/**
	Returns an integer where all bits are uniformly distributed.
	*/
	nextFullInt(): number
	
	/**
	Derives and sets a seed using the given string.
	
	This method encodes the string (supposedly UTF-8 all on targets) and
	derives a seed using `setBytesSeed`.
	*/
	setStringSeed(seed: string): void
	
	/**
	Derives and sets a seed using the given bytes.
	
	This method works by using the SHA-1 hashing algorithm. A 64-bit
	integer is obtained from the first 64 bits of the digest with the order
	of bytes in little endian encoding.
	*/
	setBytesSeed(seed: Bytes): void
	
	/**
	Returns a floating point number in the range [0, 1), That is, a number
	greater or equal to 0 and less than 1.
	
	The distribution is approximately uniform.
	*/
	random(): number
	
	/**
	Returns an integer within the given range [`lower`, `upper`]. That is,
	a number within `lower` inclusive and `upper` inclusive.
	
	This method uses `random()` which the distribution approximately
	uniform. For large ranges greater than 2^53, the distribution will
	be noticeably biased.
	*/
	randomInt(lower: number, upper: number): number
	
	/**
	Returns a uniformly distributed floating point number within the
	given range [`lower`, `upper`). That is, a number within `lower`
	inclusive and `upper` exclusive.
	
	Note when `lower` or `upper` approach precision limits, the
	returned number may equal `upper` due to rounding.
	*/
	uniform(lower: number, upper: number): number
	
	/**
	Returns an element from the given array.
	*/
	choice<T>(array: T[]): T
	
	/**
	Shuffles the elements, in-place, in the given array.
	
	The shuffle algorithm is modern Fisher-Yates. The underlying number
	generator limits the number of permutations possible.
	This means that using this method alone to shuffle a deck of 52 cards
	will not result in all possible outcomes.
	*/
	shuffle<T>(array: T[]): void
	
	/**
	Returns a (non-secure) random integer from the system.
	
	This method can be used construct and obtain a seed. Unlike
	regular `Sys.random`, all bits are usable.
	
	For high-quality (cryptographic) random numbers, see the
	trandom library (https://lib.haxe.org/p/trandom).
	*/
	static randomSystemInt(): number
}
