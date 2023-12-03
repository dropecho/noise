package dropecho.utils;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.ExprTools;

using Lambda;

class TypeBuildingMacros {
	static function isEmpty(expr:Expr) {
		if (expr == null)
			return true;
		return switch (expr.expr) {
			case ExprDef.EBlock(exprs): exprs.length == 0;
			default: false;
		}
	}

	static function makeField(arg, pos, doc) {
		var docRegex = new EReg('\\*\\s@param\\s${arg.name}\\s-?\\s?(.*)', "i");
		var val = arg.value != null ? ExprTools.getValue(arg.value) : null;

		var d = '';
		if (doc != null && docRegex.match(doc)) {
			d = docRegex.matched(1) + "\nDefault: " + val;
		}

		return {
			name: arg.name,
			doc: d,
			meta: [],
			access: [APrivate],
			kind: FVar(arg.type),
			pos: pos
		};
	}

	macro static public function autoConstruct():Array<Field> {
		var fields = Context.getBuildFields();

		var constructor = fields.find(x -> x.name == "new");

		switch (constructor.kind) {
			case FieldType.FFun(fn):
				if (!isEmpty(fn.expr)) {
					return fields;
				}
				for (arg in fn.args) {
					fields.push(makeField(arg, Context.currentPos(), constructor.doc));
				}

				fn.expr = macro dropecho.utils.TypeBuildingMacros.initLocals();
			default:
		}
		return fields;
	}

	macro static public function initLocals():Expr {
		// Grab the variables accessible in the context the macro was called.
		var locals = Context.getLocalVars();
		var fields = Context.getLocalClass().get().fields.get();

		var exprs:Array<Expr> = [];
		for (local in locals.keys()) {
			if (fields.exists(function(field) return field.name == local)) {
				exprs.push(macro this.$local = $i{local});
			} else {
				throw new Error(Context.getLocalClass() + " has no field " + local, Context.currentPos());
			}
		}
		// Generates a block expression from the given expression array
		return macro $b{exprs};
	}
}
