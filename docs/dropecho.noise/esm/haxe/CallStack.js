import {NativeStackTrace} from "./NativeStackTrace.js"
import {Register} from "../genes/Register.js"
import {StringBuf} from "../StringBuf.js"
import {Std} from "../Std.js"

const $global = Register.$global

/**
Elements return by `CallStack` methods.
*/
export const StackItem = 
Register.global("$hxEnums")["haxe.StackItem"] = 
{
	__ename__: "haxe.StackItem",
	
	CFunction: {_hx_name: "CFunction", _hx_index: 0, __enum__: "haxe.StackItem"},
	Module: Object.assign((m) => ({_hx_index: 1, __enum__: "haxe.StackItem", "m": m}), {_hx_name: "Module", __params__: ["m"]}),
	FilePos: Object.assign((s, file, line, column) => ({_hx_index: 2, __enum__: "haxe.StackItem", "s": s, "file": file, "line": line, "column": column}), {_hx_name: "FilePos", __params__: ["s", "file", "line", "column"]}),
	Method: Object.assign((classname, method) => ({_hx_index: 3, __enum__: "haxe.StackItem", "classname": classname, "method": method}), {_hx_name: "Method", __params__: ["classname", "method"]}),
	LocalFunction: Object.assign((v) => ({_hx_index: 4, __enum__: "haxe.StackItem", "v": v}), {_hx_name: "LocalFunction", __params__: ["v"]})
}
StackItem.__constructs__ = [StackItem.CFunction, StackItem.Module, StackItem.FilePos, StackItem.Method, StackItem.LocalFunction]
StackItem.__empty_constructs__ = [StackItem.CFunction]

export const CallStack = Register.global("$hxClasses")["haxe._CallStack.CallStack"] = 
class CallStack {
	static get length() {
		return this.get_length()
	}
	static get_length(this1) {
		return this1.length;
	}
	
	/**
	Return the call stack elements, or an empty array if not available.
	*/
	static callStack() {
		return NativeStackTrace.toHaxe(NativeStackTrace.callStack());
	}
	
	/**
	Return the exception stack : this is the stack elements between
	the place the last exception was thrown and the place it was
	caught, or an empty array if not available.
	Set `fullStack` parameter to true in order to return the full exception stack.
	
	May not work if catch type was a derivative from `haxe.Exception`.
	*/
	static exceptionStack(fullStack) {
		if (fullStack == null) {
			fullStack = false;
		};
		var eStack = NativeStackTrace.toHaxe(NativeStackTrace.exceptionStack());
		return (fullStack) ? eStack : CallStack.subtract(eStack, CallStack.callStack());
	}
	
	/**
	Returns a representation of the stack as a printable string.
	*/
	static toString(stack) {
		var b = new StringBuf();
		var _g = 0;
		var _g1 = stack;
		while (_g < _g1.length) {
			var s = _g1[_g++];
			b.b += "\nCalled from ";
			CallStack.itemToString(b, s);
		};
		return b.b;
	}
	
	/**
	Returns a range of entries of current stack from the beginning to the the
	common part of this and `stack`.
	*/
	static subtract(this1, stack) {
		var startIndex = -1;
		var i = -1;
		while (++i < this1.length) {
			var _g = 0;
			var _g1 = stack.length;
			while (_g < _g1) if (CallStack.equalItems(this1[i], stack[_g++])) {
				if (startIndex < 0) {
					startIndex = i;
				};
				++i;
				if (i >= this1.length) {
					break;
				};
			} else {
				startIndex = -1;
			};
			if (startIndex >= 0) {
				break;
			};
		};
		if (startIndex >= 0) {
			return this1.slice(0, startIndex);
		} else {
			return this1;
		};
	}
	
	/**
	Make a copy of the stack.
	*/
	static copy(this1) {
		return this1.slice();
	}
	static get(this1, index) {
		return this1[index];
	}
	static asArray(this1) {
		return this1;
	}
	static equalItems(item1, item2) {
		if (item1 == null) {
			if (item2 == null) {
				return true;
			} else {
				return false;
			};
		} else {
			switch (item1._hx_index) {
				case 0:
					if (item2 == null) {
						return false;
					} else if (item2._hx_index == 0) {
						return true;
					} else {
						return false;
					};
					break
				case 1:
					if (item2 == null) {
						return false;
					} else if (item2._hx_index == 1) {
						return item1.m == item2.m;
					} else {
						return false;
					};
					break
				case 2:
					if (item2 == null) {
						return false;
					} else if (item2._hx_index == 2) {
						if (item1.file == item2.file && item1.line == item2.line && item1.column == item2.column) {
							return CallStack.equalItems(item1.s, item2.s);
						} else {
							return false;
						};
					} else {
						return false;
					};
					break
				case 3:
					if (item2 == null) {
						return false;
					} else if (item2._hx_index == 3) {
						if (item1.classname == item2.classname) {
							return item1.method == item2.method;
						} else {
							return false;
						};
					} else {
						return false;
					};
					break
				case 4:
					if (item2 == null) {
						return false;
					} else if (item2._hx_index == 4) {
						return item1.v == item2.v;
					} else {
						return false;
					};
					break
				
			};
		};
	}
	static exceptionToString(e) {
		if (e.get_previous() == null) {
			var tmp = "Exception: " + e.toString();
			var tmp1 = e.get_stack();
			return tmp + ((tmp1 == null) ? "null" : CallStack.toString(tmp1));
		};
		var result = "";
		var e1 = e;
		var prev = null;
		while (e1 != null) {
			if (prev == null) {
				var result1 = "Exception: " + e1.get_message();
				var tmp = e1.get_stack();
				result = result1 + ((tmp == null) ? "null" : CallStack.toString(tmp)) + result;
			} else {
				var prevStack = CallStack.subtract(e1.get_stack(), prev.get_stack());
				result = "Exception: " + e1.get_message() + ((prevStack == null) ? "null" : CallStack.toString(prevStack)) + "\n\nNext " + result;
			};
			prev = e1;
			e1 = e1.get_previous();
		};
		return result;
	}
	static itemToString(b, s) {
		switch (s._hx_index) {
			case 0:
				b.b += "a C function";
				break
			case 1:
				var _g = s.m;
				b.b = (b.b += "module ") + ((_g == null) ? "null" : "" + _g);
				break
			case 2:
				var _g = s.s;
				var _g1 = s.file;
				var _g2 = s.line;
				var _g3 = s.column;
				if (_g != null) {
					CallStack.itemToString(b, _g);
					b.b += " (";
				};
				b.b = (b.b += (_g1 == null) ? "null" : "" + _g1) + " line ";
				b.b += (_g2 == null) ? "null" : "" + _g2;
				if (_g3 != null) {
					b.b = (b.b += " column ") + ((_g3 == null) ? "null" : "" + _g3);
				};
				if (_g != null) {
					b.b += ")";
				};
				break
			case 3:
				var _g = s.classname;
				var _g1 = s.method;
				b.b = (b.b += Std.string((_g == null) ? "<unknown>" : _g)) + ".";
				b.b += (_g1 == null) ? "null" : "" + _g1;
				break
			case 4:
				var _g = s.v;
				b.b = (b.b += "local function #") + ((_g == null) ? "null" : "" + _g);
				break
			
		};
	}
	static get __name__() {
		return "haxe._CallStack.CallStack_Impl_"
	}
	get __class__() {
		return CallStack
	}
}

