import {Bytes} from "../haxe/io/Bytes"
import {__Int64} from "../haxe/Int64"

/**
Interface for pseudorandom number generators.
*/
export declare interface GeneratorInterface {
	get_seed(): __Int64
	set_seed(value: __Int64): __Int64
	get_state(): Bytes
	set_state(value: Bytes): Bytes
	get_usesAllBits(): boolean
	
	/**
	Initial starting state.
	
	Setting this value will reset the state.
	*/
	seed: __Int64
	
	/**
	Current generator state.
	
	The state can be saved and restored to allow resuming a generator.
	*/
	state: Bytes
	
	/**
	Whether `nextInt` returns an integer with a uniform distribution of
	bits.
	
	When `false` for example, the generator may output an integer that is
	never zero or the most significant bit is zero.
	*/
	readonly usesAllBits: boolean
	
	/**
	Advances the generator and returns an integer.
	
	The returned value is subject to notes in `usesAllBits`.
	*/
	nextInt(): number
}
