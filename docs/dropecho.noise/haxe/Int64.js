import {Int64Helper} from "./Int64Helper.js"
import {Int32} from "./Int32.js"
import {Exception} from "./Exception.js"
import {Register} from "../genes/Register.js"

const $global = Register.$global

export const ___Int64 = Register.global("$hxClasses")["haxe._Int64.___Int64"] = 
class ___Int64 extends Register.inherits() {
	new(high, low) {
		this.high = high;
		this.low = low;
	}
	
	/**
	We also define toString here to ensure we always get a pretty string
	when tracing or calling `Std.string`. This tends not to happen when
	`toString` is only in the abstract.
	*/
	toString() {
		return Int64.toString(this);
	}
	static get __name__() {
		return "haxe._Int64.___Int64"
	}
	get __class__() {
		return ___Int64
	}
}


export const Int64 = Register.global("$hxClasses")["haxe._Int64.Int64"] = 
class Int64 {
	static _new(x) {
		return x;
	}
	
	/**
	Makes a copy of `this` Int64.
	*/
	static copy(this1) {
		return new ___Int64(this1.high, this1.low);
	}
	
	/**
	Construct an Int64 from two 32-bit words `high` and `low`.
	*/
	static make(high, low) {
		return new ___Int64(high, low);
	}
	
	/**
	Returns an Int64 with the value of the Int `x`.
	`x` is sign-extended to fill 64 bits.
	*/
	static ofInt(x) {
		return new ___Int64(x >> 31, x);
	}
	
	/**
	Returns an Int with the value of the Int64 `x`.
	Throws an exception  if `x` cannot be represented in 32 bits.
	*/
	static toInt(x) {
		if (x.high != x.low >> 31) {
			throw Exception.thrown("Overflow");
		};
		return x.low;
	}
	static is(val) {
		return ((val) instanceof ___Int64);
	}
	
	/**
	Returns whether the value `val` is of type `haxe.Int64`
	*/
	static isInt64(val) {
		return ((val) instanceof ___Int64);
	}
	
	/**
	Returns the high 32-bit word of `x`.
	*/
	static getHigh(x) {
		return x.high;
	}
	
	/**
	Returns the low 32-bit word of `x`.
	*/
	static getLow(x) {
		return x.low;
	}
	
	/**
	Returns `true` if `x` is less than zero.
	*/
	static isNeg(x) {
		return x.high < 0;
	}
	
	/**
	Returns `true` if `x` is exactly zero.
	*/
	static isZero(x) {
		if (x.high == 0) {
			return x.low == 0;
		} else {
			return false;
		};
	}
	
	/**
	Compares `a` and `b` in signed mode.
	Returns a negative value if `a < b`, positive if `a > b`,
	or 0 if `a == b`.
	*/
	static compare(a, b) {
		var v = a.high - b.high | 0;
		if (v == 0) {
			v = Int32.ucompare(a.low, b.low);
		};
		if (a.high < 0) {
			if (b.high < 0) {
				return v;
			} else {
				return -1;
			};
		} else if (b.high >= 0) {
			return v;
		} else {
			return 1;
		};
	}
	
	/**
	Compares `a` and `b` in unsigned mode.
	Returns a negative value if `a < b`, positive if `a > b`,
	or 0 if `a == b`.
	*/
	static ucompare(a, b) {
		var v = Int32.ucompare(a.high, b.high);
		if (v != 0) {
			return v;
		} else {
			return Int32.ucompare(a.low, b.low);
		};
	}
	
	/**
	Returns a signed decimal `String` representation of `x`.
	*/
	static toStr(x) {
		return Int64.toString(x);
	}
	static toString(this1) {
		var i = this1;
		if (i.high == 0 && i.low == 0) {
			return "0";
		};
		var str = "";
		var neg = false;
		if (i.high < 0) {
			neg = true;
		};
		var ten = new ___Int64(0, 10);
		while (i.high != 0 || i.low != 0) {
			var r = Int64.divMod(i, ten);
			if (r.modulus.high < 0) {
				str = (~r.modulus.low + 1 | 0) + str;
				var x = r.quotient;
				var high = ~x.high;
				var low = ~x.low + 1 | 0;
				if (low == 0) {
					++high;
					high = high | 0;
				};
				i = new ___Int64(high, low);
			} else {
				str = r.modulus.low + str;
				i = r.quotient;
			};
		};
		if (neg) {
			str = "-" + str;
		};
		return str;
	}
	static parseString(sParam) {
		return Int64Helper.parseString(sParam);
	}
	static fromFloat(f) {
		return Int64Helper.fromFloat(f);
	}
	
	/**
	Performs signed integer divison of `dividend` by `divisor`.
	Returns `{ quotient : Int64, modulus : Int64 }`.
	*/
	static divMod(dividend, divisor) {
		if (divisor.high == 0) {
			switch (divisor.low) {
				case 0:
					throw Exception.thrown("divide by zero");
					break
				case 1:
					return {"quotient": new ___Int64(dividend.high, dividend.low), "modulus": new ___Int64(0, 0)};
					break
				
			};
		};
		var divSign = dividend.high < 0 != divisor.high < 0;
		var modulus;
		if (dividend.high < 0) {
			var high = ~dividend.high;
			var low = ~dividend.low + 1 | 0;
			if (low == 0) {
				++high;
				high = high | 0;
			};
			modulus = new ___Int64(high, low);
		} else {
			modulus = new ___Int64(dividend.high, dividend.low);
		};
		if (divisor.high < 0) {
			var high = ~divisor.high;
			var low = ~divisor.low + 1 | 0;
			if (low == 0) {
				++high;
				high = high | 0;
			};
			divisor = new ___Int64(high, low);
		};
		var quotient = new ___Int64(0, 0);
		var mask = new ___Int64(0, 1);
		while (!(divisor.high < 0)) {
			var v = Int32.ucompare(divisor.high, modulus.high);
			var cmp = (v != 0) ? v : Int32.ucompare(divisor.low, modulus.low);
			divisor = new ___Int64(divisor.high << 1 | divisor.low >>> 31, divisor.low << 1);
			mask = new ___Int64(mask.high << 1 | mask.low >>> 31, mask.low << 1);
			if (cmp >= 0) {
				break;
			};
		};
		while (mask.high != 0 || mask.low != 0) {
			var v = Int32.ucompare(modulus.high, divisor.high);
			if (((v != 0) ? v : Int32.ucompare(modulus.low, divisor.low)) >= 0) {
				quotient = new ___Int64(quotient.high | mask.high, quotient.low | mask.low);
				var high = modulus.high - divisor.high | 0;
				if (Int32.ucompare(modulus.low, divisor.low) < 0) {
					--high;
					high = high | 0;
				};
				modulus = new ___Int64(high, modulus.low - divisor.low | 0);
			};
			mask = new ___Int64(mask.high >>> 1, mask.high << 31 | mask.low >>> 1);
			divisor = new ___Int64(divisor.high >>> 1, divisor.high << 31 | divisor.low >>> 1);
		};
		if (divSign) {
			var high = ~quotient.high;
			var low = ~quotient.low + 1 | 0;
			if (low == 0) {
				++high;
				high = high | 0;
			};
			quotient = new ___Int64(high, low);
		};
		if (dividend.high < 0) {
			var high = ~modulus.high;
			var low = ~modulus.low + 1 | 0;
			if (low == 0) {
				++high;
				high = high | 0;
			};
			modulus = new ___Int64(high, low);
		};
		return {"quotient": quotient, "modulus": modulus};
	}
	
	/**
	Returns the negative of `x`.
	*/
	static neg(x) {
		var high = ~x.high;
		var low = ~x.low + 1 | 0;
		if (low == 0) {
			++high;
			high = high | 0;
		};
		return new ___Int64(high, low);
	}
	static preIncrement(this1) {
		var x = new ___Int64(this1.high, this1.low);
		this1 = x;
		x.low++;
		x.low = x.low | 0;
		if (x.low == 0) {
			x.high++;
			x.high = x.high | 0;
		};
		return x;
	}
	static postIncrement(this1) {
		var ret = this1;
		var x = new ___Int64(this1.high, this1.low);
		this1 = x;
		x.low++;
		x.low = x.low | 0;
		if (x.low == 0) {
			x.high++;
			x.high = x.high | 0;
		};
		return ret;
	}
	static preDecrement(this1) {
		var x = new ___Int64(this1.high, this1.low);
		this1 = x;
		if (x.low == 0) {
			x.high--;
			x.high = x.high | 0;
		};
		x.low--;
		x.low = x.low | 0;
		return x;
	}
	static postDecrement(this1) {
		var ret = this1;
		var x = new ___Int64(this1.high, this1.low);
		this1 = x;
		if (x.low == 0) {
			x.high--;
			x.high = x.high | 0;
		};
		x.low--;
		x.low = x.low | 0;
		return ret;
	}
	
	/**
	Returns the sum of `a` and `b`.
	*/
	static add(a, b) {
		var high = a.high + b.high | 0;
		var low = a.low + b.low | 0;
		if (Int32.ucompare(low, a.low) < 0) {
			++high;
			high = high | 0;
		};
		return new ___Int64(high, low);
	}
	static addInt(a, b) {
		var high = a.high + (b >> 31) | 0;
		var low = a.low + b | 0;
		if (Int32.ucompare(low, a.low) < 0) {
			++high;
			high = high | 0;
		};
		return new ___Int64(high, low);
	}
	
	/**
	Returns `a` minus `b`.
	*/
	static sub(a, b) {
		var high = a.high - b.high | 0;
		if (Int32.ucompare(a.low, b.low) < 0) {
			--high;
			high = high | 0;
		};
		return new ___Int64(high, a.low - b.low | 0);
	}
	static subInt(a, b) {
		var b_low = b;
		var high = a.high - (b >> 31) | 0;
		if (Int32.ucompare(a.low, b_low) < 0) {
			--high;
			high = high | 0;
		};
		return new ___Int64(high, a.low - b_low | 0);
	}
	static intSub(a, b) {
		var a_low = a;
		var high = (a >> 31) - b.high | 0;
		if (Int32.ucompare(a_low, b.low) < 0) {
			--high;
			high = high | 0;
		};
		return new ___Int64(high, a_low - b.low | 0);
	}
	
	/**
	Returns the product of `a` and `b`.
	*/
	static mul(a, b) {
		var al = a.low & 65535;
		var ah = a.low >>> 16;
		var bl = b.low & 65535;
		var bh = b.low >>> 16;
		var p00 = Int32._mul(al, bl);
		var p10 = Int32._mul(ah, bl);
		var p01 = Int32._mul(al, bh);
		var low = p00;
		var high = (Int32._mul(ah, bh) + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
		p01 <<= 16;
		low = p00 + p01 | 0;
		if (Int32.ucompare(low, p01) < 0) {
			++high;
			high = high | 0;
		};
		p10 <<= 16;
		low = low + p10 | 0;
		if (Int32.ucompare(low, p10) < 0) {
			++high;
			high = high | 0;
		};
		high = high + (Int32._mul(a.low, b.high) + Int32._mul(a.high, b.low) | 0) | 0;
		return new ___Int64(high, low);
	}
	static mulInt(a, b) {
		var b_low = b;
		var al = a.low & 65535;
		var ah = a.low >>> 16;
		var bl = b_low & 65535;
		var bh = b_low >>> 16;
		var p00 = Int32._mul(al, bl);
		var p10 = Int32._mul(ah, bl);
		var p01 = Int32._mul(al, bh);
		var low = p00;
		var high = (Int32._mul(ah, bh) + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
		p01 <<= 16;
		low = p00 + p01 | 0;
		if (Int32.ucompare(low, p01) < 0) {
			++high;
			high = high | 0;
		};
		p10 <<= 16;
		low = low + p10 | 0;
		if (Int32.ucompare(low, p10) < 0) {
			++high;
			high = high | 0;
		};
		high = high + (Int32._mul(a.low, b >> 31) + Int32._mul(a.high, b_low) | 0) | 0;
		return new ___Int64(high, low);
	}
	
	/**
	Returns the quotient of `a` divided by `b`.
	*/
	static div(a, b) {
		return Int64.divMod(a, b).quotient;
	}
	static divInt(a, b) {
		return Int64.divMod(a, new ___Int64(b >> 31, b)).quotient;
	}
	static intDiv(a, b) {
		var x = Int64.divMod(new ___Int64(a >> 31, a), b).quotient;
		if (x.high != x.low >> 31) {
			throw Exception.thrown("Overflow");
		};
		var x1 = x.low;
		return new ___Int64(x1 >> 31, x1);
	}
	
	/**
	Returns the modulus of `a` divided by `b`.
	*/
	static mod(a, b) {
		return Int64.divMod(a, b).modulus;
	}
	static modInt(a, b) {
		var x = Int64.divMod(a, new ___Int64(b >> 31, b)).modulus;
		if (x.high != x.low >> 31) {
			throw Exception.thrown("Overflow");
		};
		var x1 = x.low;
		return new ___Int64(x1 >> 31, x1);
	}
	static intMod(a, b) {
		var x = Int64.divMod(new ___Int64(a >> 31, a), b).modulus;
		if (x.high != x.low >> 31) {
			throw Exception.thrown("Overflow");
		};
		var x1 = x.low;
		return new ___Int64(x1 >> 31, x1);
	}
	
	/**
	Returns `true` if `a` is equal to `b`.
	*/
	static eq(a, b) {
		if (a.high == b.high) {
			return a.low == b.low;
		} else {
			return false;
		};
	}
	static eqInt(a, b) {
		if (a.high == b >> 31) {
			return a.low == b;
		} else {
			return false;
		};
	}
	
	/**
	Returns `true` if `a` is not equal to `b`.
	*/
	static neq(a, b) {
		if (a.high == b.high) {
			return a.low != b.low;
		} else {
			return true;
		};
	}
	static neqInt(a, b) {
		if (a.high == b >> 31) {
			return a.low != b;
		} else {
			return true;
		};
	}
	static lt(a, b) {
		var v = a.high - b.high | 0;
		if (v == 0) {
			v = Int32.ucompare(a.low, b.low);
		};
		return ((a.high < 0) ? (b.high < 0) ? v : -1 : (b.high >= 0) ? v : 1) < 0;
	}
	static ltInt(a, b) {
		var b_high = b >> 31;
		var v = a.high - b_high | 0;
		if (v == 0) {
			v = Int32.ucompare(a.low, b);
		};
		return ((a.high < 0) ? (b_high < 0) ? v : -1 : (b_high >= 0) ? v : 1) < 0;
	}
	static intLt(a, b) {
		var a_high = a >> 31;
		var v = a_high - b.high | 0;
		if (v == 0) {
			v = Int32.ucompare(a, b.low);
		};
		return ((a_high < 0) ? (b.high < 0) ? v : -1 : (b.high >= 0) ? v : 1) < 0;
	}
	static lte(a, b) {
		var v = a.high - b.high | 0;
		if (v == 0) {
			v = Int32.ucompare(a.low, b.low);
		};
		return ((a.high < 0) ? (b.high < 0) ? v : -1 : (b.high >= 0) ? v : 1) <= 0;
	}
	static lteInt(a, b) {
		var b_high = b >> 31;
		var v = a.high - b_high | 0;
		if (v == 0) {
			v = Int32.ucompare(a.low, b);
		};
		return ((a.high < 0) ? (b_high < 0) ? v : -1 : (b_high >= 0) ? v : 1) <= 0;
	}
	static intLte(a, b) {
		var a_high = a >> 31;
		var v = a_high - b.high | 0;
		if (v == 0) {
			v = Int32.ucompare(a, b.low);
		};
		return ((a_high < 0) ? (b.high < 0) ? v : -1 : (b.high >= 0) ? v : 1) <= 0;
	}
	static gt(a, b) {
		var v = a.high - b.high | 0;
		if (v == 0) {
			v = Int32.ucompare(a.low, b.low);
		};
		return ((a.high < 0) ? (b.high < 0) ? v : -1 : (b.high >= 0) ? v : 1) > 0;
	}
	static gtInt(a, b) {
		var b_high = b >> 31;
		var v = a.high - b_high | 0;
		if (v == 0) {
			v = Int32.ucompare(a.low, b);
		};
		return ((a.high < 0) ? (b_high < 0) ? v : -1 : (b_high >= 0) ? v : 1) > 0;
	}
	static intGt(a, b) {
		var a_high = a >> 31;
		var v = a_high - b.high | 0;
		if (v == 0) {
			v = Int32.ucompare(a, b.low);
		};
		return ((a_high < 0) ? (b.high < 0) ? v : -1 : (b.high >= 0) ? v : 1) > 0;
	}
	static gte(a, b) {
		var v = a.high - b.high | 0;
		if (v == 0) {
			v = Int32.ucompare(a.low, b.low);
		};
		return ((a.high < 0) ? (b.high < 0) ? v : -1 : (b.high >= 0) ? v : 1) >= 0;
	}
	static gteInt(a, b) {
		var b_high = b >> 31;
		var v = a.high - b_high | 0;
		if (v == 0) {
			v = Int32.ucompare(a.low, b);
		};
		return ((a.high < 0) ? (b_high < 0) ? v : -1 : (b_high >= 0) ? v : 1) >= 0;
	}
	static intGte(a, b) {
		var a_high = a >> 31;
		var v = a_high - b.high | 0;
		if (v == 0) {
			v = Int32.ucompare(a, b.low);
		};
		return ((a_high < 0) ? (b.high < 0) ? v : -1 : (b.high >= 0) ? v : 1) >= 0;
	}
	
	/**
	Returns the bitwise NOT of `a`.
	*/
	static complement(a) {
		return new ___Int64(~a.high, ~a.low);
	}
	
	/**
	Returns the bitwise AND of `a` and `b`.
	*/
	static and(a, b) {
		return new ___Int64(a.high & b.high, a.low & b.low);
	}
	
	/**
	Returns the bitwise OR of `a` and `b`.
	*/
	static or(a, b) {
		return new ___Int64(a.high | b.high, a.low | b.low);
	}
	
	/**
	Returns the bitwise XOR of `a` and `b`.
	*/
	static xor(a, b) {
		return new ___Int64(a.high ^ b.high, a.low ^ b.low);
	}
	
	/**
	Returns `a` left-shifted by `b` bits.
	*/
	static shl(a, b) {
		b &= 63;
		if (b == 0) {
			return new ___Int64(a.high, a.low);
		} else if (b < 32) {
			return new ___Int64(a.high << b | a.low >>> 32 - b, a.low << b);
		} else {
			return new ___Int64(a.low << b - 32, 0);
		};
	}
	
	/**
	Returns `a` right-shifted by `b` bits in signed mode.
	`a` is sign-extended.
	*/
	static shr(a, b) {
		b &= 63;
		if (b == 0) {
			return new ___Int64(a.high, a.low);
		} else if (b < 32) {
			return new ___Int64(a.high >> b, a.high << 32 - b | a.low >>> b);
		} else {
			return new ___Int64(a.high >> 31, a.high >> b - 32);
		};
	}
	
	/**
	Returns `a` right-shifted by `b` bits in unsigned mode.
	`a` is padded with zeroes.
	*/
	static ushr(a, b) {
		b &= 63;
		if (b == 0) {
			return new ___Int64(a.high, a.low);
		} else if (b < 32) {
			return new ___Int64(a.high >>> b, a.high << 32 - b | a.low >>> b);
		} else {
			return new ___Int64(0, a.high >>> b - 32);
		};
	}
	static get high() {
		return this.get_high()
	}
	static get_high(this1) {
		return this1.high;
	}
	static set_high(this1, x) {
		return this1.high = x;
	}
	static get low() {
		return this.get_low()
	}
	static get_low(this1) {
		return this1.low;
	}
	static set_low(this1, x) {
		return this1.low = x;
	}
	static get __name__() {
		return "haxe._Int64.Int64_Impl_"
	}
	get __class__() {
		return Int64
	}
}

