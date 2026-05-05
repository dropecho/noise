import {Printer} from "./Printer.js"
import {ExprDef} from "./Expr.js"
import {Exception} from "../Exception.js"
import {Register} from "../../genes/Register.js"
import {Std} from "../../Std.js"

const $global = Register.$global

/**
This class provides some utility methods to work with expressions. It is
best used through 'using haxe.macro.ExprTools' syntax and then provides
additional methods on haxe.macro.Expr instances.

While mainly intended to be used in macros, it works in non-macro code as
well.
*/
export const ExprTools = Register.global("$hxClasses")["haxe.macro.ExprTools"] = 
class ExprTools {
	
	/**
	Converts expression `e` to a human-readable String representation.
	
	The result is guaranteed to be valid Haxe code, but there may be
	differences from the original lexical syntax.
	*/
	static toString(e) {
		return new Printer().printExpr(e);
	}
	
	/**
	Calls function `f` on each sub-expression of `e`.
	
	If `e` has no sub-expressions, this operation has no effect.
	
	Otherwise `f` is called once per sub-expression of `e`, with the
	sub-expression as argument. These calls are done in order of the
	sub-expression declarations.
	
	This method does not call itself recursively. It should instead be used
	in a recursive function which handles the expression nodes of interest.
	
	Usage example:
	```haxe
	function findStrings(e:Expr) {
	switch(e.expr) {
	case EConst(CString(s)):
	// handle s
	case _:
	ExprTools.iter(e, findStrings);
	}
	}
	```
	*/
	static iter(e, f) {
		var _g = e.expr;
		switch (_g._hx_index) {
			case 0:
				break
			case 1:
				f(_g.e1);
				f(_g.e2);
				break
			case 2:
				f(_g.e1);
				f(_g.e2);
				break
			case 3:
				f(_g.e);
				break
			case 4:
				f(_g.e);
				break
			case 5:
				var _g1 = _g.fields;
				var _g2 = 0;
				while (_g2 < _g1.length) f(_g1[_g2++].expr);
				break
			case 6:
				ExprArrayTools.iter(_g.values, f);
				break
			case 7:
				f(_g.e);
				ExprArrayTools.iter(_g.params, f);
				break
			case 8:
				ExprArrayTools.iter(_g.params, f);
				break
			case 9:
				f(_g.e);
				break
			case 10:
				var _g1 = _g.vars;
				var _g2 = 0;
				while (_g2 < _g1.length) {
					var e = _g1[_g2++].expr;
					if (e != null) {
						f(e);
					};
				};
				break
			case 11:
				var _g1 = _g.f;
				var _g2 = 0;
				var _g3 = _g1.args;
				while (_g2 < _g3.length) {
					var e = _g3[_g2++].value;
					if (e != null) {
						f(e);
					};
				};
				var e = _g1.expr;
				if (e != null) {
					f(e);
				};
				break
			case 12:
				ExprArrayTools.iter(_g.exprs, f);
				break
			case 13:
				f(_g.it);
				f(_g.expr);
				break
			case 14:
				var _g1 = _g.eelse;
				f(_g.econd);
				f(_g.eif);
				if (_g1 != null) {
					f(_g1);
				};
				break
			case 15:
				f(_g.econd);
				f(_g.e);
				break
			case 16:
				var _g1 = _g.cases;
				var _g2 = _g.edef;
				f(_g.e);
				var _g3 = 0;
				while (_g3 < _g1.length) {
					var c = _g1[_g3];
					++_g3;
					ExprArrayTools.iter(c.values, f);
					var e = c.guard;
					if (e != null) {
						f(e);
					};
					var e1 = c.expr;
					if (e1 != null) {
						f(e1);
					};
				};
				if (_g2 != null && _g2.expr != null) {
					f(_g2);
				};
				break
			case 17:
				var _g1 = _g.catches;
				f(_g.e);
				var _g2 = 0;
				while (_g2 < _g1.length) f(_g1[_g2++].expr);
				break
			case 18:
				var _g1 = _g.e;
				if (_g1 != null) {
					f(_g1);
				};
				break
			case 19:case 20:
				break
			case 21:
				f(_g.e);
				break
			case 22:
				f(_g.e);
				break
			case 23:
				f(_g.e);
				break
			case 24:
				f(_g.e);
				break
			case 25:
				var _g1 = _g.eelse;
				f(_g.econd);
				f(_g.eif);
				if (_g1 != null) {
					f(_g1);
				};
				break
			case 26:
				f(_g.e);
				break
			case 27:
				f(_g.e);
				break
			case 28:
				f(_g.e);
				break
			
		};
	}
	
	/**
	Transforms the sub-expressions of `e` by calling `f` on each of them.
	
	If `e` has no sub-expressions, this operation returns `e` unchanged.
	
	Otherwise `f` is called once per sub-expression of `e`, with the
	sub-expression as argument. These calls are done in order of the
	sub-expression declarations.
	
	This method does not call itself recursively. It should instead be used
	in a recursive function which handles the expression nodes of interest.
	
	Usage example:
	```haxe
	function capitalizeStrings(e:Expr) {
	return switch(e.expr) {
	case EConst(CString(s)):
	{ expr: EConst(CString(s.toUpperCase())), pos: e.pos };
	case _:
	ExprTools.map(e, capitalizeStrings);
	}
	}
	```
	*/
	static map(e, f) {
		var e1 = e.pos;
		var _g = e.expr;
		var tmp;
		switch (_g._hx_index) {
			case 0:
				tmp = e.expr;
				break
			case 1:
				tmp = ExprDef.EArray(f(_g.e1), f(_g.e2));
				break
			case 2:
				tmp = ExprDef.EBinop(_g.op, f(_g.e1), f(_g.e2));
				break
			case 3:
				tmp = ExprDef.EField(f(_g.e), _g.field, _g.kind);
				break
			case 4:
				tmp = ExprDef.EParenthesis(f(_g.e));
				break
			case 5:
				var _g1 = _g.fields;
				var ret = [];
				var _g2 = 0;
				while (_g2 < _g1.length) {
					var field = _g1[_g2];
					++_g2;
					ret.push({"field": field.field, "expr": f(field.expr), "quotes": field.quotes});
				};
				tmp = ExprDef.EObjectDecl(ret);
				break
			case 6:
				tmp = ExprDef.EArrayDecl(ExprArrayTools.map(_g.values, f));
				break
			case 7:
				tmp = ExprDef.ECall(f(_g.e), ExprArrayTools.map(_g.params, f));
				break
			case 8:
				tmp = ExprDef.ENew(_g.t, ExprArrayTools.map(_g.params, f));
				break
			case 9:
				tmp = ExprDef.EUnop(_g.op, _g.postFix, f(_g.e));
				break
			case 10:
				var _g1 = _g.vars;
				var ret = [];
				var _g2 = 0;
				while (_g2 < _g1.length) {
					var v = _g1[_g2];
					++_g2;
					var e2 = v.expr;
					var v2 = {"name": v.name, "type": v.type, "expr": (e2 == null) ? null : f(e2)};
					if (v.isFinal != null) {
						v2.isFinal = v.isFinal;
					};
					ret.push(v2);
				};
				tmp = ExprDef.EVars(ret);
				break
			case 11:
				var _g1 = _g.kind;
				var _g2 = _g.f;
				var ret = [];
				var _g3 = 0;
				var _g4 = _g2.args;
				while (_g3 < _g4.length) {
					var arg = _g4[_g3];
					++_g3;
					var e2 = arg.value;
					ret.push({"name": arg.name, "opt": arg.opt, "type": arg.type, "value": (e2 == null) ? null : f(e2)});
				};
				tmp = ExprDef.EFunction(_g1, {"args": ret, "ret": _g2.ret, "params": _g2.params, "expr": f(_g2.expr)});
				break
			case 12:
				tmp = ExprDef.EBlock(ExprArrayTools.map(_g.exprs, f));
				break
			case 13:
				tmp = ExprDef.EFor(f(_g.it), f(_g.expr));
				break
			case 14:
				var _g1 = _g.eelse;
				tmp = ExprDef.EIf(f(_g.econd), f(_g.eif), (_g1 == null) ? null : f(_g1));
				break
			case 15:
				tmp = ExprDef.EWhile(f(_g.econd), f(_g.e), _g.normalWhile);
				break
			case 16:
				var _g1 = _g.e;
				var _g2 = _g.cases;
				var _g3 = _g.edef;
				var ret = [];
				var _g4 = 0;
				while (_g4 < _g2.length) {
					var c = _g2[_g4];
					++_g4;
					var e2 = c.expr;
					var tmp1 = (e2 == null) ? null : f(e2);
					var e3 = c.guard;
					ret.push({"expr": tmp1, "guard": (e3 == null) ? null : f(e3), "values": ExprArrayTools.map(c.values, f)});
				};
				tmp = ExprDef.ESwitch(f(_g1), ret, (_g3 == null || _g3.expr == null) ? _g3 : f(_g3));
				break
			case 17:
				var _g1 = _g.e;
				var _g2 = _g.catches;
				var ret = [];
				var _g3 = 0;
				while (_g3 < _g2.length) {
					var c = _g2[_g3];
					++_g3;
					ret.push({"name": c.name, "type": c.type, "expr": f(c.expr)});
				};
				tmp = ExprDef.ETry(f(_g1), ret);
				break
			case 18:
				var _g1 = _g.e;
				tmp = ExprDef.EReturn((_g1 == null) ? null : f(_g1));
				break
			case 19:case 20:
				tmp = e.expr;
				break
			case 21:
				tmp = ExprDef.EUntyped(f(_g.e));
				break
			case 22:
				tmp = ExprDef.EThrow(f(_g.e));
				break
			case 23:
				tmp = ExprDef.ECast(f(_g.e), _g.t);
				break
			case 24:
				tmp = ExprDef.EDisplay(f(_g.e), _g.displayKind);
				break
			case 25:
				tmp = ExprDef.ETernary(f(_g.econd), f(_g.eif), f(_g.eelse));
				break
			case 26:
				tmp = ExprDef.ECheckType(f(_g.e), _g.t);
				break
			case 27:
				tmp = ExprDef.EMeta(_g.s, f(_g.e));
				break
			case 28:
				tmp = ExprDef.EIs(f(_g.e), _g.t);
				break
			
		};
		return {"pos": e1, "expr": tmp};
	}
	
	/**
	Returns the value `e` represents.
	
	Supported expressions are:
	
	- `Int`, `Float` and `String` literals
	- identifiers `true`, `false` and `null`
	- structure declarations if all their fields are values
	- array declarations if all their elements are values
	- unary operators `-`, `!` and `~` if the operand is a value
	- binary operators except `=>`, `...` and assignments
	
	Parentheses, metadata and the `untyped` keyword are ignored.
	
	If any non-value is encountered, an exception of type `String` is
	thrown.
	
	If `e` is null, the result is unspecified.
	*/
	static getValue(e) {
		while (true) {
			var _g = e.expr;
			switch (_g._hx_index) {
				case 0:
					var _g1 = _g.c;
					switch (_g1._hx_index) {
						case 0:
							return Std.parseInt(_g1.v);
							break
						case 1:
							return parseFloat(_g1.f);
							break
						case 2:
							return _g1.s;
							break
						case 3:
							switch (_g1.s) {
								case "false":
									return false;
									break
								case "null":
									return null;
									break
								case "true":
									return true;
									break
								default:
								throw Exception.thrown("Unsupported expression: " + Std.string(e));
								
							};
							break
						default:
						throw Exception.thrown("Unsupported expression: " + Std.string(e));
						
					};
					break
				case 2:
					var e1 = ExprTools.getValue(_g.e1);
					var e2 = ExprTools.getValue(_g.e2);
					switch (_g.op._hx_index) {
						case 0:
							return e1 + e2;
							break
						case 1:
							return e1 * e2;
							break
						case 2:
							return e1 / e2;
							break
						case 3:
							return e1 - e2;
							break
						case 5:
							return e1 == e2;
							break
						case 6:
							return e1 != e2;
							break
						case 7:
							return e1 > e2;
							break
						case 8:
							return e1 >= e2;
							break
						case 9:
							return e1 < e2;
							break
						case 10:
							return e1 <= e2;
							break
						case 11:
							return e1 & e2;
							break
						case 12:
							return e1 | e2;
							break
						case 13:
							return e1 ^ e2;
							break
						case 14:
							if (e1) {
								return e2;
							} else {
								return false;
							};
							break
						case 15:
							if (!e1) {
								return e2;
							} else {
								return true;
							};
							break
						case 16:
							return e1 << e2;
							break
						case 17:
							return e1 >> e2;
							break
						case 18:
							return e1 >>> e2;
							break
						case 19:
							return e1 % e2;
							break
						default:
						throw Exception.thrown("Unsupported expression: " + Std.string(e));
						
					};
					break
				case 4:
					e = _g.e;
					continue;
					break
				case 5:
					var _g2 = _g.fields;
					var obj = {};
					var _g3 = 0;
					while (_g3 < _g2.length) {
						var field = _g2[_g3];
						++_g3;
						obj[field.field] = ExprTools.getValue(field.expr);
					};
					return obj;
					break
				case 6:
					var _g4 = _g.values;
					var f = ExprTools.getValue;
					var result = new Array(_g4.length);
					var _g5 = 0;
					var _g6 = _g4.length;
					while (_g5 < _g6) {
						var i = _g5++;
						result[i] = f(_g4[i]);
					};
					return result;
					break
				case 9:
					if (_g.postFix == false) {
						var e11 = ExprTools.getValue(_g.e);
						switch (_g.op._hx_index) {
							case 2:
								return !e11;
								break
							case 3:
								return -e11;
								break
							case 4:
								return ~e11;
								break
							default:
							throw Exception.thrown("Unsupported expression: " + Std.string(e));
							
						};
					} else {
						throw Exception.thrown("Unsupported expression: " + Std.string(e));
					};
					break
				case 14:
					var _g7 = _g.eelse;
					if (_g7 == null) {
						throw Exception.thrown("If statements only have a value if the else clause is defined");
					} else if (ExprTools.getValue(_g.econd)) {
						e = _g.eif;
						continue;
					} else {
						e = _g7;
						continue;
					};
					break
				case 21:
					e = _g.e;
					continue;
					break
				case 25:
					var _g8 = _g.eelse;
					if (_g8 == null) {
						throw Exception.thrown("If statements only have a value if the else clause is defined");
					} else if (ExprTools.getValue(_g.econd)) {
						e = _g.eif;
						continue;
					} else {
						e = _g8;
						continue;
					};
					break
				case 27:
					e = _g.e;
					continue;
					break
				default:
				throw Exception.thrown("Unsupported expression: " + Std.string(e));
				
			};
		};
	}
	static opt(e, f) {
		if (e == null) {
			return null;
		} else {
			return f(e);
		};
	}
	static opt2(e, f) {
		if (e != null) {
			f(e);
		};
	}
	static get __name__() {
		return "haxe.macro.ExprTools"
	}
	get __class__() {
		return ExprTools
	}
}


/**
This class provides functions on expression arrays for convenience. For a
detailed reference on each method, see the documentation of ExprTools.
*/
export const ExprArrayTools = Register.global("$hxClasses")["haxe.macro.ExprArrayTools"] = 
class ExprArrayTools {
	static map(el, f) {
		var ret = [];
		var _g = 0;
		while (_g < el.length) ret.push(f(el[_g++]));
		return ret;
	}
	static iter(el, f) {
		var _g = 0;
		while (_g < el.length) f(el[_g++]);
	}
	static get __name__() {
		return "haxe.macro.ExprArrayTools"
	}
	get __class__() {
		return ExprArrayTools
	}
}

