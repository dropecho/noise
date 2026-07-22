import {Register} from "../../genes/Register.js"

const $global = Register.$global

export const Vector2s = Register.global("$hxClasses")["dropecho.utils.Vector2s"] = 
class Vector2s extends Register.inherits() {
	new(x, y) {
		this.x = x;
		this.y = y;
	}
	static get __name__() {
		return "dropecho.utils.Vector2s"
	}
	get __class__() {
		return Vector2s
	}
}


export const Vector3s = Register.global("$hxClasses")["dropecho.utils.Vector3s"] = 
class Vector3s extends Register.inherits() {
	new(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	static get __name__() {
		return "dropecho.utils.Vector3s"
	}
	get __class__() {
		return Vector3s
	}
}


export const Vector3 = Register.global("$hxClasses")["dropecho.utils._Vector.Vector3"] = 
class Vector3 {
	static _new(x, y, z) {
		return new Vector3s(x, y, z);
	}
	static fromF32Vec(b) {
		return new Vector3s(b.x, b.y, b.z);
	}
	static fromIntVec1(b) {
		return new Vector3s(b.x, b.y, b.z);
	}
	static fromIntVec2(b) {
		return new Vector3s(b.x, b.y, b.z);
	}
	static fromIntVec3(b) {
		return new Vector3s(b.x, b.y, b.z);
	}
	static fromIntVec4(b) {
		return new Vector3s(b.x, b.y, b.z);
	}
	static fromIntVec5(b) {
		return new Vector3s(b.x, b.y, b.z);
	}
	static fromIntVec6(b) {
		return new Vector3s(b.x, b.y, b.z);
	}
	static add(this1, rhs) {
		return new Vector3s(this1.x + rhs.x, this1.y + rhs.y, this1.z + rhs.z);
	}
	static sub(this1, rhs) {
		return new Vector3s(this1.x - rhs.x, this1.y - rhs.y, this1.z - rhs.z);
	}
	static scale(this1, rhs) {
		return new Vector3s(this1.x * rhs, this1.y * rhs, this1.z * rhs);
	}
	static $length(this1) {
		return Math.sqrt(this1.x * this1.x + this1.y * this1.y + this1.z * this1.z);
	}
	static lengthsq(this1) {
		return this1.x * this1.x + this1.y * this1.y + this1.z * this1.z;
	}
	static floor(this1) {
		var f = this1.x;
		var t = f | 0;
		var f1 = this1.y;
		var t1 = f1 | 0;
		var f2 = this1.z;
		var t2 = f2 | 0;
		return new Vector3s((f < t) ? t - 1 : t, (f1 < t1) ? t1 - 1 : t1, (f2 < t2) ? t2 - 1 : t2);
	}
	static get __name__() {
		return "dropecho.utils._Vector.Vector3_Impl_"
	}
	get __class__() {
		return Vector3
	}
}

