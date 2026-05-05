import {ExprTools} from "../../haxe/macro/ExprTools.js"
import {Access, FieldType} from "../../haxe/macro/Expr.js"
import {Register} from "../../genes/Register.js"
import {EReg} from "../../EReg.js"

const $global = Register.$global

export const TypeBuildingMacros = Register.global("$hxClasses")["dropecho.utils.TypeBuildingMacros"] = 
class TypeBuildingMacros {
	static isEmpty(expr) {
		if (expr == null) {
			return true;
		};
		var _g = expr.expr;
		if (_g._hx_index == 12) {
			return _g.exprs.length == 0;
		} else {
			return false;
		};
	}
	static makeField(arg, pos, doc) {
		var docRegex = new EReg("\\*\\s@param\\s" + arg.name + "\\s-?\\s?(.*)", "i");
		var val = (arg.value != null) ? ExprTools.getValue(arg.value) : null;
		var d = "";
		if (doc != null && docRegex.match(doc)) {
			d = docRegex.matched(1) + "\nDefault: " + val;
		};
		return {"name": arg.name, "doc": d, "meta": [], "access": [Access.APrivate], "kind": FieldType.FVar(arg.type), "pos": pos};
	}
	static get __name__() {
		return "dropecho.utils.TypeBuildingMacros"
	}
	get __class__() {
		return TypeBuildingMacros
	}
}

