import {GeneratorInterface} from "./GeneratorInterface"
import {Bytes} from "../haxe/io/Bytes"
import {__Int64} from "../haxe/Int64"

/**
xorshift128+ generator.

This is a very fast and high quality pseudorandom number generator.
It is a variant of the xorshift algorithm that is closely related to LFSRs.

On targets without 64-bit integers, the usage of haxe.Int64 may be very
slow. If this is a concern, use `Xorshift64Plus`.
*/
export declare class Xorshift128Plus implements GeneratorInterface {
	constructor()
	seed: __Int64
	state: Bytes
	readonly usesAllBits: boolean
	protected _seed: __Int64
	protected _state0: __Int64
	protected _state1: __Int64
	protected _current: __Int64
	protected _currentAvailable: boolean
	protected get_usesAllBits(): boolean
	protected get_seed(): __Int64
	protected set_seed(value: __Int64): __Int64
	protected get_state(): Bytes
	protected set_state(value: Bytes): Bytes
	protected stepNext(): void
	nextInt(): number
	protected static PARAMETER_A: number
	protected static PARAMETER_B: number
	protected static PARAMETER_C: number
	protected static SEED_1: __Int64
}
