import {Access, FunctionKind, EFieldKind} from "./Expr.js"
import {Exception} from "../Exception.js"
import {Register} from "../../genes/Register.js"
import {StringTools} from "../../StringTools.js"
import {Std} from "../../Std.js"
import {Lambda} from "../../Lambda.js"

const $global = Register.$global

/**
This class provides some utility methods to convert elements from the
macro context to a human-readable String representation.
*/
export const Printer = Register.global("$hxClasses")["haxe.macro.Printer"] = 
class Printer extends Register.inherits() {
	new(tabString) {
		if (tabString == null) {
			tabString = "\t";
		};
		this.tabs = "";
		this.tabString = tabString;
	}
	printUnop(op) {
		switch (op._hx_index) {
			case 0:
				return "++";
				break
			case 1:
				return "--";
				break
			case 2:
				return "!";
				break
			case 3:
				return "-";
				break
			case 4:
				return "~";
				break
			case 5:
				return "...";
				break
			
		};
	}
	printBinop(op) {
		switch (op._hx_index) {
			case 0:
				return "+";
				break
			case 1:
				return "*";
				break
			case 2:
				return "/";
				break
			case 3:
				return "-";
				break
			case 4:
				return "=";
				break
			case 5:
				return "==";
				break
			case 6:
				return "!=";
				break
			case 7:
				return ">";
				break
			case 8:
				return ">=";
				break
			case 9:
				return "<";
				break
			case 10:
				return "<=";
				break
			case 11:
				return "&";
				break
			case 12:
				return "|";
				break
			case 13:
				return "^";
				break
			case 14:
				return "&&";
				break
			case 15:
				return "||";
				break
			case 16:
				return "<<";
				break
			case 17:
				return ">>";
				break
			case 18:
				return ">>>";
				break
			case 19:
				return "%";
				break
			case 20:
				return this.printBinop(op.op) + "=";
				break
			case 21:
				return "...";
				break
			case 22:
				return "=>";
				break
			case 23:
				return "in";
				break
			case 24:
				return "??";
				break
			
		};
	}
	escapeString(s, delim) {
		return delim + StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(s, "\\", "\\\\"), "\n", "\\n"), "\t", "\\t"), "\r", "\\r"), "'", "\\'"), "\"", "\\\"") + delim;
	}
	printFormatString(s) {
		return this.escapeString(s, "'");
	}
	printString(s) {
		return this.escapeString(s, "\"");
	}
	printConstant(c) {
		switch (c._hx_index) {
			case 0:
				var _g = c.v;
				var _g1 = c.s;
				if (_g1 == null) {
					return _g;
				} else {
					return _g + _g1;
				};
				break
			case 1:
				var _g = c.f;
				var _g1 = c.s;
				if (_g1 == null) {
					return _g;
				} else {
					return _g + _g1;
				};
				break
			case 2:
				var _g = c.s;
				var _g1 = c.kind;
				if (_g1 == null) {
					return this.printString(_g);
				} else if (_g1._hx_index == 1) {
					return this.printFormatString(_g);
				} else {
					return this.printString(_g);
				};
				break
			case 3:
				return c.s;
				break
			case 4:
				return "~/" + c.r + "/" + c.opt;
				break
			
		};
	}
	printTypeParam(param) {
		switch (param._hx_index) {
			case 0:
				return this.printComplexType(param.t);
				break
			case 1:
				return this.printExpr(param.e);
				break
			
		};
	}
	printTypePath(tp) {
		var tmp = ((tp.pack.length > 0) ? tp.pack.join(".") + "." : "") + tp.name + ((tp.sub != null) ? "." + tp.sub : "");
		var tmp1;
		if (tp.params == null) {
			tmp1 = "";
		} else if (tp.params.length > 0) {
			var _this = tp.params;
			var f = Register.bind(this, this.printTypeParam);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = f(_this[i]);
			};
			tmp1 = "<" + result.join(", ") + ">";
		} else {
			tmp1 = "";
		};
		return tmp + tmp1;
	}
	printComplexType(ct) {
		switch (ct._hx_index) {
			case 0:
				return this.printTypePath(ct.p);
				break
			case 1:
				var _g = ct.args;
				var _g1 = ct.ret;
				var wrapArgumentsInParentheses;
				if (_g.length == 1) {
					var _g2 = _g[0];
					switch (_g2._hx_index) {
						case 0:
							wrapArgumentsInParentheses = false;
							break
						case 3:
							wrapArgumentsInParentheses = false;
							break
						case 5:
							wrapArgumentsInParentheses = (_g2.t._hx_index == 0) ? false : true;
							break
						default:
						wrapArgumentsInParentheses = true;
						
					};
				} else {
					wrapArgumentsInParentheses = true;
				};
				var f = Register.bind(this, this.printComplexType);
				var result = new Array(_g.length);
				var _g2 = 0;
				var _g3 = _g.length;
				while (_g2 < _g3) {
					var i = _g2++;
					result[i] = f(_g[i]);
				};
				var argStr = result.join(", ");
				var tmp = (_g1._hx_index == 1) ? "(" + this.printComplexType(_g1) + ")" : this.printComplexType(_g1);
				return ((wrapArgumentsInParentheses) ? "(" + argStr + ")" : argStr) + " -> " + tmp;
				break
			case 2:
				var _g = ct.fields;
				var _g1 = [];
				var _g2 = 0;
				while (_g2 < _g.length) _g1.push(this.printField(_g[_g2++]) + "; ");
				return "{ " + _g1.join("") + "}";
				break
			case 3:
				return "(" + this.printComplexType(ct.t) + ")";
				break
			case 4:
				var _g = ct.p;
				var _g1 = ct.fields;
				var _g2 = [];
				var _g3 = 0;
				while (_g3 < _g.length) _g2.push("> " + this.printTypePath(_g[_g3++]) + ", ");
				var types = _g2.join("");
				var _g = [];
				var _g2 = 0;
				while (_g2 < _g1.length) _g.push(this.printField(_g1[_g2++]) + "; ");
				return "{" + types + _g.join("") + "}";
				break
			case 5:
				return "?" + this.printComplexType(ct.t);
				break
			case 6:
				return ct.n + ":" + this.printComplexType(ct.t);
				break
			case 7:
				var _g = ct.tl;
				var f = Register.bind(this, this.printComplexType);
				var result = new Array(_g.length);
				var _g1 = 0;
				var _g2 = _g.length;
				while (_g1 < _g2) {
					var i = _g1++;
					result[i] = f(_g[i]);
				};
				return result.join(" & ");
				break
			
		};
	}
	printMetadata(meta) {
		return "@" + meta.name + ((meta.params != null && meta.params.length > 0) ? "(" + this.printExprs(meta.params, ", ") + ")" : "");
	}
	printAccess(access) {
		switch (access._hx_index) {
			case 0:
				return "public";
				break
			case 1:
				return "private";
				break
			case 2:
				return "static";
				break
			case 3:
				return "override";
				break
			case 4:
				return "dynamic";
				break
			case 5:
				return "inline";
				break
			case 6:
				return "macro";
				break
			case 7:
				return "final";
				break
			case 8:
				return "extern";
				break
			case 9:
				return "abstract";
				break
			case 10:
				return "overload";
				break
			
		};
	}
	printField(field) {
		var tmp = (field.doc != null && field.doc != "") ? "/**\n" + this.tabs + this.tabString + StringTools.replace(field.doc, "\n", "\n" + this.tabs + this.tabString) + "\n" + this.tabs + "**/\n" + this.tabs : "";
		var tmp1;
		if (field.meta != null && field.meta.length > 0) {
			var _this = field.meta;
			var f = Register.bind(this, this.printMetadata);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = f(_this[i]);
			};
			tmp1 = result.join("\n" + this.tabs) + ("\n" + this.tabs);
		} else {
			tmp1 = "";
		};
		var tmp2 = tmp + tmp1;
		var tmp;
		if (field.access != null && field.access.length > 0) {
			var access = field.access;
			var _this;
			if (Lambda.has(access, Access.AFinal)) {
				var _g = [];
				var _g1 = 0;
				while (_g1 < access.length) {
					var v = access[_g1];
					++_g1;
					if (v._hx_index != 7) {
						_g.push(v);
					};
				};
				_this = _g.concat([Access.AFinal]);
			} else {
				_this = access;
			};
			var f = Register.bind(this, this.printAccess);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = f(_this[i]);
			};
			tmp = result.join(" ") + " ";
		} else {
			tmp = "";
		};
		var tmp1 = tmp2 + tmp;
		var _g = field.kind;
		var tmp;
		switch (_g._hx_index) {
			case 0:
				tmp = ((field.access != null && Lambda.has(field.access, Access.AFinal)) ? "" : "var ") + ("" + field.name) + this.opt(_g.t, Register.bind(this, this.printComplexType), " : ") + this.opt(_g.e, Register.bind(this, this.printExpr), " = ");
				break
			case 1:
				tmp = "function " + field.name + this.printFunction(_g.f);
				break
			case 2:
				tmp = "var " + field.name + "(" + _g.get + ", " + _g.set + ")" + this.opt(_g.t, Register.bind(this, this.printComplexType), " : ") + this.opt(_g.e, Register.bind(this, this.printExpr), " = ");
				break
			
		};
		return tmp1 + tmp;
	}
	printTypeParamDecl(tpd) {
		var tmp;
		if (tpd.meta != null && tpd.meta.length > 0) {
			var _this = tpd.meta;
			var f = Register.bind(this, this.printMetadata);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = f(_this[i]);
			};
			tmp = result.join(" ") + " ";
		} else {
			tmp = "";
		};
		var tmp1 = tmp + tpd.name;
		var tmp;
		if (tpd.params != null && tpd.params.length > 0) {
			var _this = tpd.params;
			var f = Register.bind(this, this.printTypeParamDecl);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = f(_this[i]);
			};
			tmp = "<" + result.join(", ") + ">";
		} else {
			tmp = "";
		};
		var tmp2 = tmp1 + tmp;
		var tmp;
		if (tpd.constraints != null && tpd.constraints.length > 0) {
			var _this = tpd.constraints;
			var f = Register.bind(this, this.printComplexType);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = f(_this[i]);
			};
			tmp = ":(" + result.join(", ") + ")";
		} else {
			tmp = "";
		};
		return tmp2 + tmp + ((tpd.defaultType != null) ? "=" + this.printComplexType(tpd.defaultType) : "");
	}
	printFunctionArg(arg) {
		return ((arg.opt) ? "?" : "") + arg.name + this.opt(arg.type, Register.bind(this, this.printComplexType), ":") + this.opt(arg.value, Register.bind(this, this.printExpr), " = ");
	}
	printFunction(func, kind) {
		var _g = func.args;
		var skipParentheses = _g.length == 1 && (_g[0].type == null && kind == FunctionKind.FArrow);
		var tmp;
		if (func.params == null) {
			tmp = "";
		} else if (func.params.length > 0) {
			var _this = func.params;
			var f = Register.bind(this, this.printTypeParamDecl);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = f(_this[i]);
			};
			tmp = "<" + result.join(", ") + ">";
		} else {
			tmp = "";
		};
		var tmp1 = tmp + ((skipParentheses) ? "" : "(");
		var _this = func.args;
		var f = Register.bind(this, this.printFunctionArg);
		var result = new Array(_this.length);
		var _g = 0;
		var _g1 = _this.length;
		while (_g < _g1) {
			var i = _g++;
			result[i] = f(_this[i]);
		};
		return tmp1 + result.join(", ") + ((skipParentheses) ? "" : ")") + ((kind == FunctionKind.FArrow) ? " ->" : "") + this.opt(func.ret, Register.bind(this, this.printComplexType), ":") + this.opt(func.expr, Register.bind(this, this.printExpr), " ");
	}
	printVar(v) {
		var s = v.name + this.opt(v.type, Register.bind(this, this.printComplexType), ":") + this.opt(v.expr, Register.bind(this, this.printExpr), " = ");
		var _g = v.meta;
		if (_g == null) {
			return s;
		} else if (_g.length == 0) {
			return s;
		} else {
			var f = Register.bind(this, this.printMetadata);
			var result = new Array(_g.length);
			var _g1 = 0;
			var _g2 = _g.length;
			while (_g1 < _g2) {
				var i = _g1++;
				result[i] = f(_g[i]);
			};
			return result.join(" ") + " " + s;
		};
	}
	printObjectFieldKey(of) {
		var _g = of.quotes;
		if (_g == null) {
			return of.field;
		} else {
			switch (_g._hx_index) {
				case 0:
					return of.field;
					break
				case 1:
					return "\"" + of.field + "\"";
					break
				
			};
		};
	}
	printObjectField(of) {
		return "" + this.printObjectFieldKey(of) + " : " + this.printExpr(of.expr);
	}
	printExpr(e) {
		if (e == null) {
			return "#NULL";
		} else {
			var _g = e.expr;
			switch (_g._hx_index) {
				case 0:
					return this.printConstant(_g.c);
					break
				case 1:
					return "" + this.printExpr(_g.e1) + "[" + this.printExpr(_g.e2) + "]";
					break
				case 2:
					return "" + this.printExpr(_g.e1) + " " + this.printBinop(_g.op) + " " + this.printExpr(_g.e2);
					break
				case 3:
					var _g1 = _g.e;
					var _g2 = _g.field;
					if (_g.kind == EFieldKind.Safe) {
						return "" + this.printExpr(_g1) + "?." + _g2;
					} else {
						return "" + this.printExpr(_g1) + "." + _g2;
					};
					break
				case 4:
					return "(" + this.printExpr(_g.e) + ")";
					break
				case 5:
					var _g1 = _g.fields;
					var result = new Array(_g1.length);
					var _g2 = 0;
					var _g3 = _g1.length;
					while (_g2 < _g3) {
						var i = _g2++;
						result[i] = this.printObjectField(_g1[i]);
					};
					return "{ " + result.join(", ") + " }";
					break
				case 6:
					return "[" + this.printExprs(_g.values, ", ") + "]";
					break
				case 7:
					return "" + this.printExpr(_g.e) + "(" + this.printExprs(_g.params, ", ") + ")";
					break
				case 8:
					return "new " + this.printTypePath(_g.t) + "(" + this.printExprs(_g.params, ", ") + ")";
					break
				case 9:
					var _g1 = _g.op;
					var _g2 = _g.e;
					if (_g.postFix) {
						return this.printExpr(_g2) + this.printUnop(_g1);
					} else {
						return this.printUnop(_g1) + this.printExpr(_g2);
					};
					break
				case 10:
					var _g1 = _g.vars;
					if (_g1.length == 0) {
						return "var ";
					} else {
						var tmp = ((_g1[0].isStatic) ? "static " : "") + ((_g1[0].isFinal) ? "final " : "var ");
						var f = Register.bind(this, this.printVar);
						var result = new Array(_g1.length);
						var _g2 = 0;
						var _g3 = _g1.length;
						while (_g2 < _g3) {
							var i = _g2++;
							result[i] = f(_g1[i]);
						};
						return tmp + result.join(", ");
					};
					break
				case 11:
					var _g1 = _g.kind;
					var _g2 = _g.f;
					if (_g1 == null) {
						return ((_g1 != FunctionKind.FArrow) ? "function" : "") + this.printFunction(_g2, _g1);
					} else if (_g1._hx_index == 1) {
						return ((_g1.inlined) ? "inline " : "") + ("function " + _g1.name) + this.printFunction(_g2);
					} else {
						return ((_g1 != FunctionKind.FArrow) ? "function" : "") + this.printFunction(_g2, _g1);
					};
					break
				case 12:
					var _g1 = _g.exprs;
					if (_g1.length == 0) {
						return "{ }";
					} else {
						var old = this.tabs;
						this.tabs += this.tabString;
						var s = "{\n" + this.tabs + this.printExprs(_g1, ";\n" + this.tabs);
						this.tabs = old;
						return s + (";\n" + this.tabs + "}");
					};
					break
				case 13:
					return "for (" + this.printExpr(_g.it) + ") " + this.printExpr(_g.expr);
					break
				case 14:
					var _g1 = _g.econd;
					var _g2 = _g.eif;
					var _g3 = _g.eelse;
					if (_g3 == null) {
						return "if (" + this.printExpr(_g1) + ") " + this.printExpr(_g2);
					} else {
						return "if (" + this.printExpr(_g1) + ") " + this.printExpr(_g2) + " else " + this.printExpr(_g3);
					};
					break
				case 15:
					var _g1 = _g.econd;
					var _g2 = _g.e;
					if (_g.normalWhile) {
						return "while (" + this.printExpr(_g1) + ") " + this.printExpr(_g2);
					} else {
						return "do " + this.printExpr(_g2) + " while (" + this.printExpr(_g1) + ")";
					};
					break
				case 16:
					var _g1 = _g.cases;
					var _g2 = _g.edef;
					var old = this.tabs;
					this.tabs += this.tabString;
					var s = "switch " + this.printExpr(_g.e) + " {\n" + this.tabs;
					var result = new Array(_g1.length);
					var _g3 = 0;
					var _g4 = _g1.length;
					while (_g3 < _g4) {
						var i = _g3++;
						var c = _g1[i];
						result[i] = "case " + this.printExprs(c.values, ", ") + ((c.guard != null) ? " if (" + this.printExpr(c.guard) + "):" : ":") + ((c.expr != null) ? this.opt(c.expr, Register.bind(this, this.printExpr)) + ";" : "");
					};
					var s1 = s + result.join("\n" + this.tabs);
					if (_g2 != null) {
						s1 += "\n" + this.tabs + "default:" + ((_g2.expr == null) ? "" : this.printExpr(_g2) + ";");
					};
					this.tabs = old;
					return s1 + ("\n" + this.tabs + "}");
					break
				case 17:
					var _g1 = _g.catches;
					var tmp = "try " + this.printExpr(_g.e);
					var result = new Array(_g1.length);
					var _g2 = 0;
					var _g3 = _g1.length;
					while (_g2 < _g3) {
						var i = _g2++;
						var c = _g1[i];
						result[i] = " catch(" + c.name + ((c.type == null) ? "" : ":" + this.printComplexType(c.type)) + ") " + this.printExpr(c.expr);
					};
					return tmp + result.join("");
					break
				case 18:
					return "return" + this.opt(_g.e, Register.bind(this, this.printExpr), " ");
					break
				case 19:
					return "break";
					break
				case 20:
					return "continue";
					break
				case 21:
					return "untyped " + this.printExpr(_g.e);
					break
				case 22:
					return "throw " + this.printExpr(_g.e);
					break
				case 23:
					var _g1 = _g.e;
					var _g2 = _g.t;
					if (_g2 != null) {
						return "cast(" + this.printExpr(_g1) + ", " + this.printComplexType(_g2) + ")";
					} else {
						return "cast " + this.printExpr(_g1);
					};
					break
				case 24:
					return "#DISPLAY(" + this.printExpr(_g.e) + ")";
					break
				case 25:
					return "" + this.printExpr(_g.econd) + " ? " + this.printExpr(_g.eif) + " : " + this.printExpr(_g.eelse);
					break
				case 26:
					return "(" + this.printExpr(_g.e) + " : " + this.printComplexType(_g.t) + ")";
					break
				case 27:
					var _g1 = _g.s;
					var _g2 = _g.e;
					if (_g1.name == ":implicitReturn") {
						var _g3 = _g2.expr;
						if (_g3._hx_index == 18) {
							return this.printExpr(_g3.e);
						} else {
							return this.printMetadata(_g1) + " " + this.printExpr(_g2);
						};
					} else {
						return this.printMetadata(_g1) + " " + this.printExpr(_g2);
					};
					break
				case 28:
					return "" + this.printExpr(_g.e) + " is " + this.printComplexType(_g.t);
					break
				
			};
		};
	}
	printExprs(el, sep) {
		var f = Register.bind(this, this.printExpr);
		var result = new Array(el.length);
		var _g = 0;
		var _g1 = el.length;
		while (_g < _g1) {
			var i = _g++;
			result[i] = f(el[i]);
		};
		return result.join(sep);
	}
	printExtension(tpl, fields) {
		var tmp = "{\n" + this.tabs + ">";
		var f = Register.bind(this, this.printTypePath);
		var result = new Array(tpl.length);
		var _g = 0;
		var _g1 = tpl.length;
		while (_g < _g1) {
			var i = _g++;
			result[i] = f(tpl[i]);
		};
		var tmp1 = tmp + result.join(",\n" + this.tabs + ">") + ",";
		var tmp;
		if (fields.length > 0) {
			var tmp2 = "\n" + this.tabs;
			var f = Register.bind(this, this.printField);
			var result = new Array(fields.length);
			var _g = 0;
			var _g1 = fields.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = f(fields[i]);
			};
			tmp = tmp2 + result.join(";\n" + this.tabs) + ";\n}";
		} else {
			tmp = "\n}";
		};
		return tmp1 + tmp;
	}
	printStructure(fields) {
		if (fields.length == 0) {
			return "{ }";
		} else {
			var tmp = "{\n" + this.tabs;
			var f = Register.bind(this, this.printField);
			var result = new Array(fields.length);
			var _g = 0;
			var _g1 = fields.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = f(fields[i]);
			};
			return tmp + result.join(";\n" + this.tabs) + ";\n}";
		};
	}
	printTypeDefinition(t, printPackage) {
		if (printPackage == null) {
			printPackage = true;
		};
		var old = this.tabs;
		this.tabs = this.tabString;
		var str;
		if (t == null) {
			str = "#NULL";
		} else {
			var str1 = ((printPackage && t.pack.length > 0 && t.pack[0] != "") ? "package " + t.pack.join(".") + ";\n" : "") + ((t.doc != null && t.doc != "") ? "/**\n" + this.tabString + StringTools.replace(t.doc, "\n", "\n" + this.tabString) + "\n**/\n" : "");
			var str2;
			if (t.meta != null && t.meta.length > 0) {
				var _this = t.meta;
				var f = Register.bind(this, this.printMetadata);
				var result = new Array(_this.length);
				var _g = 0;
				var _g1 = _this.length;
				while (_g < _g1) {
					var i = _g++;
					result[i] = f(_this[i]);
				};
				str2 = result.join(" ") + " ";
			} else {
				str2 = "";
			};
			var str3 = str1 + str2 + ((t.isExtern) ? "extern " : "");
			var _g = t.kind;
			var str1;
			switch (_g._hx_index) {
				case 0:
					var str2 = "enum " + t.name;
					var str4;
					if (t.params != null && t.params.length > 0) {
						var _this = t.params;
						var f = Register.bind(this, this.printTypeParamDecl);
						var result = new Array(_this.length);
						var _g1 = 0;
						var _g2 = _this.length;
						while (_g1 < _g2) {
							var i = _g1++;
							result[i] = f(_this[i]);
						};
						str4 = "<" + result.join(", ") + ">";
					} else {
						str4 = "";
					};
					var str5 = str2 + str4 + " {\n";
					var _g1 = [];
					var _g2 = 0;
					var _g3 = t.fields;
					while (_g2 < _g3.length) {
						var field = _g3[_g2];
						++_g2;
						var str2 = this.tabs + ((field.doc != null && field.doc != "") ? "/**\n" + this.tabs + this.tabString + StringTools.replace(field.doc, "\n", "\n" + this.tabs + this.tabString) + "\n" + this.tabs + "**/\n" + this.tabs : "");
						var str4;
						if (field.meta != null && field.meta.length > 0) {
							var _this = field.meta;
							var f = Register.bind(this, this.printMetadata);
							var result = new Array(_this.length);
							var _g4 = 0;
							var _g5 = _this.length;
							while (_g4 < _g5) {
								var i = _g4++;
								result[i] = f(_this[i]);
							};
							str4 = result.join(" ") + " ";
						} else {
							str4 = "";
						};
						var str6 = str2 + str4;
						var _g6 = field.kind;
						var str7;
						switch (_g6._hx_index) {
							case 0:
								str7 = field.name + this.opt(_g6.t, Register.bind(this, this.printComplexType), ":");
								break
							case 1:
								str7 = field.name + this.printFunction(_g6.f);
								break
							case 2:
								throw Exception.thrown("FProp is invalid for TDEnum.");
								break
							
						};
						_g1.push(str6 + str7 + ";");
					};
					str1 = str5 + _g1.join("\n") + "\n}";
					break
				case 1:
					var str2 = "typedef " + t.name;
					var str4;
					if (t.params != null && t.params.length > 0) {
						var _this = t.params;
						var f = Register.bind(this, this.printTypeParamDecl);
						var result = new Array(_this.length);
						var _g1 = 0;
						var _g2 = _this.length;
						while (_g1 < _g2) {
							var i = _g1++;
							result[i] = f(_this[i]);
						};
						str4 = "<" + result.join(", ") + ">";
					} else {
						str4 = "";
					};
					var str5 = str2 + str4 + " = {\n";
					var _g1 = [];
					var _g2 = 0;
					var _g3 = t.fields;
					while (_g2 < _g3.length) _g1.push(this.tabs + this.printField(_g3[_g2++]) + ";");
					str1 = str5 + _g1.join("\n") + "\n}";
					break
				case 2:
					var _g1 = _g.superClass;
					var _g2 = _g.interfaces;
					var _g3 = _g.isInterface;
					var str2 = ((_g.isFinal) ? "final " : "") + ((_g.isAbstract) ? "abstract " : "") + ((_g3) ? "interface " : "class ") + t.name;
					var str4;
					if (t.params != null && t.params.length > 0) {
						var _this = t.params;
						var f = Register.bind(this, this.printTypeParamDecl);
						var result = new Array(_this.length);
						var _g4 = 0;
						var _g5 = _this.length;
						while (_g4 < _g5) {
							var i = _g4++;
							result[i] = f(_this[i]);
						};
						str4 = "<" + result.join(", ") + ">";
					} else {
						str4 = "";
					};
					var str5 = str2 + str4 + ((_g1 != null) ? " extends " + this.printTypePath(_g1) : "");
					var str2;
					if (_g2 != null) {
						var str4;
						if (_g3) {
							var _g1 = [];
							var _g3 = 0;
							while (_g3 < _g2.length) _g1.push(" extends " + this.printTypePath(_g2[_g3++]));
							str4 = _g1;
						} else {
							var _g1 = [];
							var _g3 = 0;
							while (_g3 < _g2.length) _g1.push(" implements " + this.printTypePath(_g2[_g3++]));
							str4 = _g1;
						};
						str2 = str4.join("");
					} else {
						str2 = "";
					};
					var str4 = str5 + str2 + " {\n";
					var _g1 = [];
					var _g2 = 0;
					var _g3 = t.fields;
					while (_g2 < _g3.length) _g1.push(this.tabs + this.printFieldWithDelimiter(_g3[_g2++]));
					str1 = str4 + _g1.join("\n") + "\n}";
					break
				case 3:
					var _g1 = _g.t;
					var str2 = "typedef " + t.name;
					var str4;
					if (t.params != null && t.params.length > 0) {
						var _this = t.params;
						var f = Register.bind(this, this.printTypeParamDecl);
						var result = new Array(_this.length);
						var _g2 = 0;
						var _g3 = _this.length;
						while (_g2 < _g3) {
							var i = _g2++;
							result[i] = f(_this[i]);
						};
						str4 = "<" + result.join(", ") + ">";
					} else {
						str4 = "";
					};
					var str5 = str2 + str4 + " = ";
					var str2;
					switch (_g1._hx_index) {
						case 2:
							str2 = this.printStructure(_g1.fields);
							break
						case 4:
							str2 = this.printExtension(_g1.p, _g1.fields);
							break
						default:
						str2 = this.printComplexType(_g1);
						
					};
					str1 = str5 + str2 + ";";
					break
				case 4:
					var _g1 = _g.tthis;
					var _g2 = _g.flags;
					var _g3 = _g.from;
					var _g4 = _g.to;
					var from = (_g3 == null) ? [] : _g3.slice();
					var to = (_g4 == null) ? [] : _g4.slice();
					var isEnum = false;
					if (_g2 != null) {
						var _g3 = 0;
						while (_g3 < _g2.length) {
							var flag = _g2[_g3];
							++_g3;
							switch (flag._hx_index) {
								case 0:
									isEnum = true;
									break
								case 1:
									from.push(flag.ct);
									break
								case 2:
									to.push(flag.ct);
									break
								
							};
						};
					};
					var str2 = ((isEnum) ? "enum " : "") + "abstract " + t.name;
					var str4;
					if (t.params != null && t.params.length > 0) {
						var _this = t.params;
						var f = Register.bind(this, this.printTypeParamDecl);
						var result = new Array(_this.length);
						var _g2 = 0;
						var _g3 = _this.length;
						while (_g2 < _g3) {
							var i = _g2++;
							result[i] = f(_this[i]);
						};
						str4 = "<" + result.join(", ") + ">";
					} else {
						str4 = "";
					};
					var str5 = str2 + str4 + ((_g1 == null) ? "" : "(" + this.printComplexType(_g1) + ")");
					var _g1 = [];
					var _g2 = 0;
					while (_g2 < from.length) _g1.push(" from " + this.printComplexType(from[_g2++]));
					var str2 = str5 + _g1.join("");
					var _g1 = [];
					var _g2 = 0;
					while (_g2 < to.length) _g1.push(" to " + this.printComplexType(to[_g2++]));
					var str4 = str2 + _g1.join("") + " {\n";
					var _g1 = [];
					var _g2 = 0;
					var _g3 = t.fields;
					while (_g2 < _g3.length) _g1.push(this.tabs + this.printFieldWithDelimiter(_g3[_g2++]));
					str1 = str4 + _g1.join("\n") + "\n}";
					break
				case 5:
					var _g1 = _g.kind;
					var _g2 = _g.access;
					this.tabs = old;
					var str2;
					if (_g2 != null && _g2.length > 0) {
						var f = Register.bind(this, this.printAccess);
						var result = new Array(_g2.length);
						var _g = 0;
						var _g3 = _g2.length;
						while (_g < _g3) {
							var i = _g++;
							result[i] = f(_g2[i]);
						};
						str2 = result.join(" ") + " ";
					} else {
						str2 = "";
					};
					var str4;
					switch (_g1._hx_index) {
						case 0:
							str4 = ((_g2 != null && Lambda.has(_g2, Access.AFinal)) ? "" : "var ") + ("" + t.name) + this.opt(_g1.t, Register.bind(this, this.printComplexType), " : ") + this.opt(_g1.e, Register.bind(this, this.printExpr), " = ") + ";";
							break
						case 1:
							var _g = _g1.f;
							var str5 = "function " + t.name + this.printFunction(_g);
							var _g2 = _g.expr;
							str4 = str5 + ((_g2 == null) ? ";" : (_g2.expr._hx_index == 12) ? "" : ";");
							break
						case 2:
							str4 = "var " + t.name + "(" + _g1.get + ", " + _g1.set + ")" + this.opt(_g1.t, Register.bind(this, this.printComplexType), " : ") + this.opt(_g1.e, Register.bind(this, this.printExpr), " = ") + ";";
							break
						
					};
					str1 = str2 + str4;
					break
				
			};
			str = str3 + str1;
		};
		this.tabs = old;
		return str;
	}
	printFieldWithDelimiter(f) {
		var tmp = this.printField(f);
		var _g = f.kind;
		var tmp1;
		switch (_g._hx_index) {
			case 0:
				tmp1 = ";";
				break
			case 1:
				var _g1 = _g.f.expr;
				tmp1 = (_g1 == null) ? ";" : (_g1.expr._hx_index == 12) ? "" : ";";
				break
			case 2:
				tmp1 = ";";
				break
			
		};
		return tmp + tmp1;
	}
	opt(v, f, prefix) {
		if (prefix == null) {
			prefix = "";
		};
		if (v == null) {
			return "";
		} else {
			return prefix + f(v);
		};
	}
	printExprWithPositions(e) {
		var _gthis = this;
		var buffer_b = "";
		var format4 = function (i) {
			return StringTools.lpad((i == null) ? "null" : "" + i, " ", 4);
		};
		var loop = null;
		loop = function (tabs, e) {
			while (true) {
				var _ge = [e];
				var _gtabs = [tabs];
				var add = (function (_ge, _gtabs) {
					return function (s, p) {
						if (p == null) {
							p = _ge[0].pos;
						};
						var p = _ge[0].pos;
						buffer_b += Std.string("" + format4(p.min) + "-" + format4(p.max) + " " + _gtabs[0] + s + "\n");
					};
				})(_ge, _gtabs);
				var loopI = (function (_gtabs) {
					return function (e) {
						loop(_gtabs[0] + _gthis.tabString, e);
					};
				})(_gtabs);
				var _g = _ge[0].expr;
				switch (_g._hx_index) {
					case 0:
						add(_gthis.printConstant(_g.c));
						break
					case 1:
						add("EArray");
						loopI(_g.e1);
						loopI(_g.e2);
						break
					case 2:
						add("EBinop " + _gthis.printBinop(_g.op));
						loopI(_g.e1);
						loopI(_g.e2);
						break
					case 3:
						var _g1 = _g.kind;
						var kind = _g1;
						if (_g1 == null) {
							kind = EFieldKind.Normal;
						};
						add("EField " + _g.field + " (" + Register.global("$hxEnums")[kind.__enum__].__constructs__[kind._hx_index]._hx_name + ")");
						loopI(_g.e);
						break
					case 4:
						add("EParenthesis");
						loopI(_g.e);
						break
					case 5:
						var _g2 = _g.fields;
						add("EObjectDecl");
						var _g3 = 0;
						while (_g3 < _g2.length) {
							var field = _g2[_g3];
							++_g3;
							add(field.field);
							loopI(field.expr);
						};
						break
					case 6:
						add("EArrayDecl");
						Lambda.iter(_g.values, loopI);
						break
					case 7:
						add("ECall");
						loopI(_g.e);
						Lambda.iter(_g.params, loopI);
						break
					case 8:
						add("ENew " + _gthis.printTypePath(_g.t));
						Lambda.iter(_g.params, loopI);
						break
					case 9:
						add("EUnop " + _gthis.printUnop(_g.op));
						loopI(_g.e);
						break
					case 10:
						var _g4 = _g.vars;
						add("EVars");
						var _g5 = 0;
						while (_g5 < _g4.length) {
							var v = _g4[_g5];
							++_g5;
							if (v.expr != null) {
								add(v.name);
								loopI(v.expr);
							};
						};
						break
					case 11:
						var _g6 = _g.f;
						add("EFunction");
						if (_g6.expr != null) {
							loopI(_g6.expr);
						};
						break
					case 12:
						add("EBlock");
						Lambda.iter(_g.exprs, loopI);
						break
					case 13:
						add("EFor");
						loopI(_g.it);
						loopI(_g.expr);
						break
					case 14:
						var _g7 = _g.eelse;
						add("EIf");
						loopI(_g.econd);
						loopI(_g.eif);
						if (_g7 != null) {
							loopI(_g7);
						};
						break
					case 15:
						add("EWhile");
						loopI(_g.econd);
						loopI(_g.e);
						break
					case 16:
						var _g8 = _g.cases;
						var _g9 = _g.edef;
						add("ESwitch");
						loopI(_g.e);
						var _g10 = 0;
						while (_g10 < _g8.length) {
							var c = _g8[_g10];
							++_g10;
							var _g11 = 0;
							var _g12 = c.values;
							while (_g11 < _g12.length) loop(_gtabs[0] + _gthis.tabString + _gthis.tabString, _g12[_g11++]);
							if (c.expr != null) {
								loop(_gtabs[0] + _gthis.tabString + _gthis.tabString + _gthis.tabString, c.expr);
							};
						};
						if (_g9 != null) {
							tabs = _gtabs[0] + _gthis.tabString + _gthis.tabString + _gthis.tabString;
							e = _g9;
							continue;
						};
						break
					case 17:
						var _g13 = _g.catches;
						add("ETry");
						loopI(_g.e);
						var _g14 = 0;
						while (_g14 < _g13.length) loop(_gtabs[0] + _gthis.tabString + _gthis.tabString, _g13[_g14++].expr);
						break
					case 18:
						var _g15 = _g.e;
						add("EReturn");
						if (_g15 != null) {
							loopI(_g15);
						};
						break
					case 19:
						add("EBreak");
						break
					case 20:
						add("EContinue");
						break
					case 21:
						add("EUntyped");
						loopI(_g.e);
						break
					case 22:
						add("EThrow");
						loopI(_g.e);
						break
					case 23:
						add("ECast");
						loopI(_g.e);
						break
					case 24:
						add("EDisplay");
						loopI(_g.e);
						break
					case 25:
						add("ETernary");
						loopI(_g.econd);
						loopI(_g.eif);
						loopI(_g.eelse);
						break
					case 26:
						add("ECheckType");
						loopI(_g.e);
						break
					case 27:
						add("EMeta " + _gthis.printMetadata(_g.s));
						loopI(_g.e);
						break
					case 28:
						add("EIs");
						loopI(_g.e);
						break
					
				};
				return;
			};
		};
		loop("", e);
		return buffer_b;
	}
	static get __name__() {
		return "haxe.macro.Printer"
	}
	get __class__() {
		return Printer
	}
}

