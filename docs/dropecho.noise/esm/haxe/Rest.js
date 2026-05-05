import {RestKeyValueIterator} from "./iterators/RestKeyValueIterator.js"
import {RestIterator} from "./iterators/RestIterator.js"
import {Register} from "../genes/Register.js"

const $global = Register.$global

export const Rest = Register.global("$hxClasses")["haxe._Rest.Rest"] = 
class Rest {
	static get length() {
		return this.get_length()
	}
	static get_length(this1) {
		return this1.length;
	}
	
	/**
	Create rest arguments using contents of `array`.
	
	WARNING:
	Depending on a target platform modifying `array` after using this method
	may affect the created `Rest` instance.
	Use `Rest.of(array.copy())` to avoid that.
	*/
	static of(array) {
		return array;
	}
	static _new(array) {
		return array;
	}
	static get(this1, index) {
		return this1[index];
	}
	
	/**
	Creates an array containing all the values of rest arguments.
	*/
	static toArray(this1) {
		return this1.slice();
	}
	static iterator(this1) {
		return new RestIterator(this1);
	}
	static keyValueIterator(this1) {
		return new RestKeyValueIterator(this1);
	}
	
	/**
	Create a new rest arguments collection by appending `item` to this one.
	*/
	static append(this1, item) {
		var result = this1.slice();
		result.push(item);
		return result;
	}
	
	/**
	Create a new rest arguments collection by prepending this one with `item`.
	*/
	static prepend(this1, item) {
		var result = this1.slice();
		result.unshift(item);
		return result;
	}
	static toString(this1) {
		return "[" + this1.toString() + "]";
	}
	static get __name__() {
		return "haxe._Rest.Rest_Impl_"
	}
	get __class__() {
		return Rest
	}
}

