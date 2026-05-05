import {GeneratorInterface} from "./GeneratorInterface.js"
import {Bytes} from "../haxe/io/Bytes.js"
import {___Int64} from "../haxe/Int64.js"
import {Int32} from "../haxe/Int32.js"
import {Exception} from "../haxe/Exception.js"
import {Register} from "../genes/Register.js"

const $global = Register.$global

/**
xorshift128+ generator.

This is a very fast and high quality pseudorandom number generator.
It is a variant of the xorshift algorithm that is closely related to LFSRs.

On targets without 64-bit integers, the usage of haxe.Int64 may be very
slow. If this is a concern, use `Xorshift64Plus`.
*/
export const Xorshift128Plus = Register.global("$hxClasses")["seedyrng.Xorshift128Plus"] = 
class Xorshift128Plus extends Register.inherits() {
	new() {
		this._currentAvailable = false;
		this.set_seed(new ___Int64(0, 1));
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
	get_usesAllBits() {
		return false;
	}
	get_seed() {
		return this._seed;
	}
	set_seed(value) {
		if (!(value.high != 0 || value.low != 0)) {
			value = new ___Int64(0, 1);
		};
		this._seed = value;
		this._state0 = value;
		this._state1 = Xorshift128Plus.SEED_1;
		this._currentAvailable = false;
		return value;
	}
	get_state() {
		var bytes = new Bytes(new ArrayBuffer(33));
		bytes.setInt64(0, this._seed);
		bytes.setInt64(8, this._state0);
		bytes.setInt64(16, this._state1);
		bytes.b[24] = (this._currentAvailable) ? 1 : 0;
		if (this._currentAvailable) {
			bytes.setInt64(25, this._current);
		};
		return bytes;
	}
	set_state(value) {
		if (value.length != 33) {
			throw Exception.thrown("Wrong state size " + value.length);
		};
		this._seed = value.getInt64(0);
		this._state0 = value.getInt64(8);
		this._state1 = value.getInt64(16);
		this._currentAvailable = value.b[24] == 1;
		if (this._currentAvailable) {
			this._current = value.getInt64(25);
		};
		return value;
	}
	stepNext() {
		var x = this._state0;
		var y = this._state1;
		this._state0 = y;
		var b = new ___Int64(x.high << 23 | x.low >>> 9, x.low << 23);
		x = new ___Int64(x.high ^ b.high, x.low ^ b.low);
		var b = new ___Int64(x.high >> 17, x.high << 15 | x.low >>> 17);
		var b1 = new ___Int64(y.high >> 26, y.high << 6 | y.low >>> 26);
		this._state1 = new ___Int64(x.high ^ y.high ^ b.high ^ b1.high, x.low ^ y.low ^ b.low ^ b1.low);
		var a = this._state1;
		var high = a.high + y.high | 0;
		var low = a.low + y.low | 0;
		if (Int32.ucompare(low, a.low) < 0) {
			++high;
			high = high | 0;
		};
		this._current = new ___Int64(high, low);
	}
	nextInt() {
		if (this._currentAvailable) {
			this._currentAvailable = false;
			return this._current.low;
		} else {
			this.stepNext();
			this._currentAvailable = true;
			return this._current.high;
		};
	}
	static get __name__() {
		return "seedyrng.Xorshift128Plus"
	}
	static get __interfaces__() {
		return [GeneratorInterface]
	}
	get __class__() {
		return Xorshift128Plus
	}
}


Xorshift128Plus.PARAMETER_A = 23
Xorshift128Plus.PARAMETER_B = 17
Xorshift128Plus.PARAMETER_C = 26
Xorshift128Plus.SEED_1 = new ___Int64(842650776, 685298713)