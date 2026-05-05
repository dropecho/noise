import {Exception} from "../Exception.js"
import {Register} from "../../genes/Register.js"

const $global = Register.$global

export const StringLiteralKind = 
Register.global("$hxEnums")["haxe.macro.StringLiteralKind"] = 
{
	__ename__: "haxe.macro.StringLiteralKind",
	
	DoubleQuotes: {_hx_name: "DoubleQuotes", _hx_index: 0, __enum__: "haxe.macro.StringLiteralKind"},
	SingleQuotes: {_hx_name: "SingleQuotes", _hx_index: 1, __enum__: "haxe.macro.StringLiteralKind"}
}
StringLiteralKind.__constructs__ = [StringLiteralKind.DoubleQuotes, StringLiteralKind.SingleQuotes]
StringLiteralKind.__empty_constructs__ = [StringLiteralKind.DoubleQuotes, StringLiteralKind.SingleQuotes]

/**
Represents a constant.
@see https://haxe.org/manual/expression-constants.html
*/
export const Constant = 
Register.global("$hxEnums")["haxe.macro.Constant"] = 
{
	__ename__: "haxe.macro.Constant",
	
	/**
	Represents an integer literal.
	*/
	CInt: Object.assign((v, s) => ({_hx_index: 0, __enum__: "haxe.macro.Constant", "v": v, "s": s}), {_hx_name: "CInt", __params__: ["v", "s"]}),
	/**
	Represents a float literal.
	*/
	CFloat: Object.assign((f, s) => ({_hx_index: 1, __enum__: "haxe.macro.Constant", "f": f, "s": s}), {_hx_name: "CFloat", __params__: ["f", "s"]}),
	/**
	Represents a string literal.
	*/
	CString: Object.assign((s, kind) => ({_hx_index: 2, __enum__: "haxe.macro.Constant", "s": s, "kind": kind}), {_hx_name: "CString", __params__: ["s", "kind"]}),
	/**
	Represents an identifier.
	*/
	CIdent: Object.assign((s) => ({_hx_index: 3, __enum__: "haxe.macro.Constant", "s": s}), {_hx_name: "CIdent", __params__: ["s"]}),
	/**
	Represents a regular expression literal.
	
	Example: `~/haxe/i`
	
	- The first argument `haxe` is a string with regular expression pattern.
	- The second argument `i` is a string with regular expression flags.
	
	@see https://haxe.org/manual/std-regex.html
	*/
	CRegexp: Object.assign((r, opt) => ({_hx_index: 4, __enum__: "haxe.macro.Constant", "r": r, "opt": opt}), {_hx_name: "CRegexp", __params__: ["r", "opt"]})
}
Constant.__constructs__ = [Constant.CInt, Constant.CFloat, Constant.CString, Constant.CIdent, Constant.CRegexp]
Constant.__empty_constructs__ = []

/**
A binary operator.
@see https://haxe.org/manual/types-numeric-operators.html
*/
export const Binop = 
Register.global("$hxEnums")["haxe.macro.Binop"] = 
{
	__ename__: "haxe.macro.Binop",
	
	/**
	`+`
	*/
	OpAdd: {_hx_name: "OpAdd", _hx_index: 0, __enum__: "haxe.macro.Binop"},
	/**
	`*`
	*/
	OpMult: {_hx_name: "OpMult", _hx_index: 1, __enum__: "haxe.macro.Binop"},
	/**
	`/`
	*/
	OpDiv: {_hx_name: "OpDiv", _hx_index: 2, __enum__: "haxe.macro.Binop"},
	/**
	`-`
	*/
	OpSub: {_hx_name: "OpSub", _hx_index: 3, __enum__: "haxe.macro.Binop"},
	/**
	`=`
	*/
	OpAssign: {_hx_name: "OpAssign", _hx_index: 4, __enum__: "haxe.macro.Binop"},
	/**
	`==`
	*/
	OpEq: {_hx_name: "OpEq", _hx_index: 5, __enum__: "haxe.macro.Binop"},
	/**
	`!=`
	*/
	OpNotEq: {_hx_name: "OpNotEq", _hx_index: 6, __enum__: "haxe.macro.Binop"},
	/**
	`>`
	*/
	OpGt: {_hx_name: "OpGt", _hx_index: 7, __enum__: "haxe.macro.Binop"},
	/**
	`>=`
	*/
	OpGte: {_hx_name: "OpGte", _hx_index: 8, __enum__: "haxe.macro.Binop"},
	/**
	`<`
	*/
	OpLt: {_hx_name: "OpLt", _hx_index: 9, __enum__: "haxe.macro.Binop"},
	/**
	`<=`
	*/
	OpLte: {_hx_name: "OpLte", _hx_index: 10, __enum__: "haxe.macro.Binop"},
	/**
	`&`
	*/
	OpAnd: {_hx_name: "OpAnd", _hx_index: 11, __enum__: "haxe.macro.Binop"},
	/**
	`|`
	*/
	OpOr: {_hx_name: "OpOr", _hx_index: 12, __enum__: "haxe.macro.Binop"},
	/**
	`^`
	*/
	OpXor: {_hx_name: "OpXor", _hx_index: 13, __enum__: "haxe.macro.Binop"},
	/**
	`&&`
	*/
	OpBoolAnd: {_hx_name: "OpBoolAnd", _hx_index: 14, __enum__: "haxe.macro.Binop"},
	/**
	`||`
	*/
	OpBoolOr: {_hx_name: "OpBoolOr", _hx_index: 15, __enum__: "haxe.macro.Binop"},
	/**
	`<<`
	*/
	OpShl: {_hx_name: "OpShl", _hx_index: 16, __enum__: "haxe.macro.Binop"},
	/**
	`>>`
	*/
	OpShr: {_hx_name: "OpShr", _hx_index: 17, __enum__: "haxe.macro.Binop"},
	/**
	`>>>`
	*/
	OpUShr: {_hx_name: "OpUShr", _hx_index: 18, __enum__: "haxe.macro.Binop"},
	/**
	`%`
	*/
	OpMod: {_hx_name: "OpMod", _hx_index: 19, __enum__: "haxe.macro.Binop"},
	/**
	`+=` `-=` `/=` `*=` `<<=` `>>=` `>>>=` `|=` `&=` `^=` `%=`
	*/
	OpAssignOp: Object.assign((op) => ({_hx_index: 20, __enum__: "haxe.macro.Binop", "op": op}), {_hx_name: "OpAssignOp", __params__: ["op"]}),
	/**
	`...`
	*/
	OpInterval: {_hx_name: "OpInterval", _hx_index: 21, __enum__: "haxe.macro.Binop"},
	/**
	`=>`
	*/
	OpArrow: {_hx_name: "OpArrow", _hx_index: 22, __enum__: "haxe.macro.Binop"},
	/**
	`in`
	*/
	OpIn: {_hx_name: "OpIn", _hx_index: 23, __enum__: "haxe.macro.Binop"},
	/**
	`??`
	*/
	OpNullCoal: {_hx_name: "OpNullCoal", _hx_index: 24, __enum__: "haxe.macro.Binop"}
}
Binop.__constructs__ = [Binop.OpAdd, Binop.OpMult, Binop.OpDiv, Binop.OpSub, Binop.OpAssign, Binop.OpEq, Binop.OpNotEq, Binop.OpGt, Binop.OpGte, Binop.OpLt, Binop.OpLte, Binop.OpAnd, Binop.OpOr, Binop.OpXor, Binop.OpBoolAnd, Binop.OpBoolOr, Binop.OpShl, Binop.OpShr, Binop.OpUShr, Binop.OpMod, Binop.OpAssignOp, Binop.OpInterval, Binop.OpArrow, Binop.OpIn, Binop.OpNullCoal]
Binop.__empty_constructs__ = [Binop.OpAdd, Binop.OpMult, Binop.OpDiv, Binop.OpSub, Binop.OpAssign, Binop.OpEq, Binop.OpNotEq, Binop.OpGt, Binop.OpGte, Binop.OpLt, Binop.OpLte, Binop.OpAnd, Binop.OpOr, Binop.OpXor, Binop.OpBoolAnd, Binop.OpBoolOr, Binop.OpShl, Binop.OpShr, Binop.OpUShr, Binop.OpMod, Binop.OpInterval, Binop.OpArrow, Binop.OpIn, Binop.OpNullCoal]

/**
A unary operator.
@see https://haxe.org/manual/types-numeric-operators.html
*/
export const Unop = 
Register.global("$hxEnums")["haxe.macro.Unop"] = 
{
	__ename__: "haxe.macro.Unop",
	
	/**
	`++`
	*/
	OpIncrement: {_hx_name: "OpIncrement", _hx_index: 0, __enum__: "haxe.macro.Unop"},
	/**
	`--`
	*/
	OpDecrement: {_hx_name: "OpDecrement", _hx_index: 1, __enum__: "haxe.macro.Unop"},
	/**
	`!`
	*/
	OpNot: {_hx_name: "OpNot", _hx_index: 2, __enum__: "haxe.macro.Unop"},
	/**
	`-`
	*/
	OpNeg: {_hx_name: "OpNeg", _hx_index: 3, __enum__: "haxe.macro.Unop"},
	/**
	`~`
	*/
	OpNegBits: {_hx_name: "OpNegBits", _hx_index: 4, __enum__: "haxe.macro.Unop"},
	/**
	`...`
	*/
	OpSpread: {_hx_name: "OpSpread", _hx_index: 5, __enum__: "haxe.macro.Unop"}
}
Unop.__constructs__ = [Unop.OpIncrement, Unop.OpDecrement, Unop.OpNot, Unop.OpNeg, Unop.OpNegBits, Unop.OpSpread]
Unop.__empty_constructs__ = [Unop.OpIncrement, Unop.OpDecrement, Unop.OpNot, Unop.OpNeg, Unop.OpNegBits, Unop.OpSpread]

export const EFieldKind = 
Register.global("$hxEnums")["haxe.macro.EFieldKind"] = 
{
	__ename__: "haxe.macro.EFieldKind",
	
	Normal: {_hx_name: "Normal", _hx_index: 0, __enum__: "haxe.macro.EFieldKind"},
	Safe: {_hx_name: "Safe", _hx_index: 1, __enum__: "haxe.macro.EFieldKind"}
}
EFieldKind.__constructs__ = [EFieldKind.Normal, EFieldKind.Safe]
EFieldKind.__empty_constructs__ = [EFieldKind.Normal, EFieldKind.Safe]

/**
Represents the way something is quoted.
*/
export const QuoteStatus = 
Register.global("$hxEnums")["haxe.macro.QuoteStatus"] = 
{
	__ename__: "haxe.macro.QuoteStatus",
	
	/**
	No quotes
	*/
	Unquoted: {_hx_name: "Unquoted", _hx_index: 0, __enum__: "haxe.macro.QuoteStatus"},
	/**
	Double quotes `"`
	*/
	Quoted: {_hx_name: "Quoted", _hx_index: 1, __enum__: "haxe.macro.QuoteStatus"}
}
QuoteStatus.__constructs__ = [QuoteStatus.Unquoted, QuoteStatus.Quoted]
QuoteStatus.__empty_constructs__ = [QuoteStatus.Unquoted, QuoteStatus.Quoted]

/**
Represents function kind in the AST
*/
export const FunctionKind = 
Register.global("$hxEnums")["haxe.macro.FunctionKind"] = 
{
	__ename__: "haxe.macro.FunctionKind",
	
	/**
	Anonymous function
	*/
	FAnonymous: {_hx_name: "FAnonymous", _hx_index: 0, __enum__: "haxe.macro.FunctionKind"},
	/**
	Named function
	*/
	FNamed: Object.assign((name, inlined) => ({_hx_index: 1, __enum__: "haxe.macro.FunctionKind", "name": name, "inlined": inlined}), {_hx_name: "FNamed", __params__: ["name", "inlined"]}),
	/**
	Arrow function
	*/
	FArrow: {_hx_name: "FArrow", _hx_index: 2, __enum__: "haxe.macro.FunctionKind"}
}
FunctionKind.__constructs__ = [FunctionKind.FAnonymous, FunctionKind.FNamed, FunctionKind.FArrow]
FunctionKind.__empty_constructs__ = [FunctionKind.FAnonymous, FunctionKind.FArrow]

/**
Represents the kind of a node in the AST.
*/
export const ExprDef = 
Register.global("$hxEnums")["haxe.macro.ExprDef"] = 
{
	__ename__: "haxe.macro.ExprDef",
	
	/**
	A constant.
	*/
	EConst: Object.assign((c) => ({_hx_index: 0, __enum__: "haxe.macro.ExprDef", "c": c}), {_hx_name: "EConst", __params__: ["c"]}),
	/**
	Array access `e1[e2]`.
	*/
	EArray: Object.assign((e1, e2) => ({_hx_index: 1, __enum__: "haxe.macro.ExprDef", "e1": e1, "e2": e2}), {_hx_name: "EArray", __params__: ["e1", "e2"]}),
	/**
	Binary operator `e1 op e2`.
	*/
	EBinop: Object.assign((op, e1, e2) => ({_hx_index: 2, __enum__: "haxe.macro.ExprDef", "op": op, "e1": e1, "e2": e2}), {_hx_name: "EBinop", __params__: ["op", "e1", "e2"]}),
	/**
	Field access on `e.field`.
	
	If `kind` is null, it is equal to Normal.
	*/
	EField: Object.assign((e, field, kind) => ({_hx_index: 3, __enum__: "haxe.macro.ExprDef", "e": e, "field": field, "kind": kind}), {_hx_name: "EField", __params__: ["e", "field", "kind"]}),
	/**
	Parentheses `(e)`.
	*/
	EParenthesis: Object.assign((e) => ({_hx_index: 4, __enum__: "haxe.macro.ExprDef", "e": e}), {_hx_name: "EParenthesis", __params__: ["e"]}),
	/**
	An object declaration.
	*/
	EObjectDecl: Object.assign((fields) => ({_hx_index: 5, __enum__: "haxe.macro.ExprDef", "fields": fields}), {_hx_name: "EObjectDecl", __params__: ["fields"]}),
	/**
	An array declaration `[el]`.
	*/
	EArrayDecl: Object.assign((values) => ({_hx_index: 6, __enum__: "haxe.macro.ExprDef", "values": values}), {_hx_name: "EArrayDecl", __params__: ["values"]}),
	/**
	A call `e(params)`.
	*/
	ECall: Object.assign((e, params) => ({_hx_index: 7, __enum__: "haxe.macro.ExprDef", "e": e, "params": params}), {_hx_name: "ECall", __params__: ["e", "params"]}),
	/**
	A constructor call `new t(params)`.
	*/
	ENew: Object.assign((t, params) => ({_hx_index: 8, __enum__: "haxe.macro.ExprDef", "t": t, "params": params}), {_hx_name: "ENew", __params__: ["t", "params"]}),
	/**
	An unary operator `op` on `e`:
	
	- `e++` (`op = OpIncrement, postFix = true`)
	- `e--` (`op = OpDecrement, postFix = true`)
	- `++e` (`op = OpIncrement, postFix = false`)
	- `--e` (`op = OpDecrement, postFix = false`)
	- `-e` (`op = OpNeg, postFix = false`)
	- `!e` (`op = OpNot, postFix = false`)
	- `~e` (`op = OpNegBits, postFix = false`)
	*/
	EUnop: Object.assign((op, postFix, e) => ({_hx_index: 9, __enum__: "haxe.macro.ExprDef", "op": op, "postFix": postFix, "e": e}), {_hx_name: "EUnop", __params__: ["op", "postFix", "e"]}),
	/**
	Variable declarations.
	*/
	EVars: Object.assign((vars) => ({_hx_index: 10, __enum__: "haxe.macro.ExprDef", "vars": vars}), {_hx_name: "EVars", __params__: ["vars"]}),
	/**
	A function declaration.
	*/
	EFunction: Object.assign((kind, f) => ({_hx_index: 11, __enum__: "haxe.macro.ExprDef", "kind": kind, "f": f}), {_hx_name: "EFunction", __params__: ["kind", "f"]}),
	/**
	A block of expressions `{exprs}`.
	*/
	EBlock: Object.assign((exprs) => ({_hx_index: 12, __enum__: "haxe.macro.ExprDef", "exprs": exprs}), {_hx_name: "EBlock", __params__: ["exprs"]}),
	/**
	A `for` expression.
	*/
	EFor: Object.assign((it, expr) => ({_hx_index: 13, __enum__: "haxe.macro.ExprDef", "it": it, "expr": expr}), {_hx_name: "EFor", __params__: ["it", "expr"]}),
	/**
	An `if (econd) eif` or `if (econd) eif else eelse` expression.
	*/
	EIf: Object.assign((econd, eif, eelse) => ({_hx_index: 14, __enum__: "haxe.macro.ExprDef", "econd": econd, "eif": eif, "eelse": eelse}), {_hx_name: "EIf", __params__: ["econd", "eif", "eelse"]}),
	/**
	Represents a `while` expression.
	
	When `normalWhile` is `true` it is `while (...)`.
	
	When `normalWhile` is `false` it is `do {...} while (...)`.
	*/
	EWhile: Object.assign((econd, e, normalWhile) => ({_hx_index: 15, __enum__: "haxe.macro.ExprDef", "econd": econd, "e": e, "normalWhile": normalWhile}), {_hx_name: "EWhile", __params__: ["econd", "e", "normalWhile"]}),
	/**
	Represents a `switch` expression with related cases and an optional.
	`default` case if `edef != null`.
	*/
	ESwitch: Object.assign((e, cases, edef) => ({_hx_index: 16, __enum__: "haxe.macro.ExprDef", "e": e, "cases": cases, "edef": edef}), {_hx_name: "ESwitch", __params__: ["e", "cases", "edef"]}),
	/**
	Represents a `try`-expression with related catches.
	*/
	ETry: Object.assign((e, catches) => ({_hx_index: 17, __enum__: "haxe.macro.ExprDef", "e": e, "catches": catches}), {_hx_name: "ETry", __params__: ["e", "catches"]}),
	/**
	A `return` or `return e` expression.
	*/
	EReturn: Object.assign((e) => ({_hx_index: 18, __enum__: "haxe.macro.ExprDef", "e": e}), {_hx_name: "EReturn", __params__: ["e"]}),
	/**
	A `break` expression.
	*/
	EBreak: {_hx_name: "EBreak", _hx_index: 19, __enum__: "haxe.macro.ExprDef"},
	/**
	A `continue` expression.
	*/
	EContinue: {_hx_name: "EContinue", _hx_index: 20, __enum__: "haxe.macro.ExprDef"},
	/**
	An `untyped e` source code.
	*/
	EUntyped: Object.assign((e) => ({_hx_index: 21, __enum__: "haxe.macro.ExprDef", "e": e}), {_hx_name: "EUntyped", __params__: ["e"]}),
	/**
	A `throw e` expression.
	*/
	EThrow: Object.assign((e) => ({_hx_index: 22, __enum__: "haxe.macro.ExprDef", "e": e}), {_hx_name: "EThrow", __params__: ["e"]}),
	/**
	A `cast e` or `cast (e, m)` expression.
	*/
	ECast: Object.assign((e, t) => ({_hx_index: 23, __enum__: "haxe.macro.ExprDef", "e": e, "t": t}), {_hx_name: "ECast", __params__: ["e", "t"]}),
	/**
	Used internally to provide completion.
	*/
	EDisplay: Object.assign((e, displayKind) => ({_hx_index: 24, __enum__: "haxe.macro.ExprDef", "e": e, "displayKind": displayKind}), {_hx_name: "EDisplay", __params__: ["e", "displayKind"]}),
	/**
	A `(econd) ? eif : eelse` expression.
	*/
	ETernary: Object.assign((econd, eif, eelse) => ({_hx_index: 25, __enum__: "haxe.macro.ExprDef", "econd": econd, "eif": eif, "eelse": eelse}), {_hx_name: "ETernary", __params__: ["econd", "eif", "eelse"]}),
	/**
	A `(e:t)` expression.
	*/
	ECheckType: Object.assign((e, t) => ({_hx_index: 26, __enum__: "haxe.macro.ExprDef", "e": e, "t": t}), {_hx_name: "ECheckType", __params__: ["e", "t"]}),
	/**
	A `@m e` expression.
	*/
	EMeta: Object.assign((s, e) => ({_hx_index: 27, __enum__: "haxe.macro.ExprDef", "s": s, "e": e}), {_hx_name: "EMeta", __params__: ["s", "e"]}),
	/**
	An `expr is Type` expression.
	*/
	EIs: Object.assign((e, t) => ({_hx_index: 28, __enum__: "haxe.macro.ExprDef", "e": e, "t": t}), {_hx_name: "EIs", __params__: ["e", "t"]})
}
ExprDef.__constructs__ = [ExprDef.EConst, ExprDef.EArray, ExprDef.EBinop, ExprDef.EField, ExprDef.EParenthesis, ExprDef.EObjectDecl, ExprDef.EArrayDecl, ExprDef.ECall, ExprDef.ENew, ExprDef.EUnop, ExprDef.EVars, ExprDef.EFunction, ExprDef.EBlock, ExprDef.EFor, ExprDef.EIf, ExprDef.EWhile, ExprDef.ESwitch, ExprDef.ETry, ExprDef.EReturn, ExprDef.EBreak, ExprDef.EContinue, ExprDef.EUntyped, ExprDef.EThrow, ExprDef.ECast, ExprDef.EDisplay, ExprDef.ETernary, ExprDef.ECheckType, ExprDef.EMeta, ExprDef.EIs]
ExprDef.__empty_constructs__ = [ExprDef.EBreak, ExprDef.EContinue]

export const DisplayKind = 
Register.global("$hxEnums")["haxe.macro.DisplayKind"] = 
{
	__ename__: "haxe.macro.DisplayKind",
	
	DKCall: {_hx_name: "DKCall", _hx_index: 0, __enum__: "haxe.macro.DisplayKind"},
	DKDot: {_hx_name: "DKDot", _hx_index: 1, __enum__: "haxe.macro.DisplayKind"},
	DKStructure: {_hx_name: "DKStructure", _hx_index: 2, __enum__: "haxe.macro.DisplayKind"},
	DKMarked: {_hx_name: "DKMarked", _hx_index: 3, __enum__: "haxe.macro.DisplayKind"},
	DKPattern: Object.assign((outermost) => ({_hx_index: 4, __enum__: "haxe.macro.DisplayKind", "outermost": outermost}), {_hx_name: "DKPattern", __params__: ["outermost"]})
}
DisplayKind.__constructs__ = [DisplayKind.DKCall, DisplayKind.DKDot, DisplayKind.DKStructure, DisplayKind.DKMarked, DisplayKind.DKPattern]
DisplayKind.__empty_constructs__ = [DisplayKind.DKCall, DisplayKind.DKDot, DisplayKind.DKStructure, DisplayKind.DKMarked]

/**
Represents a type syntax in the AST.
*/
export const ComplexType = 
Register.global("$hxEnums")["haxe.macro.ComplexType"] = 
{
	__ename__: "haxe.macro.ComplexType",
	
	/**
	Represents the type path.
	*/
	TPath: Object.assign((p) => ({_hx_index: 0, __enum__: "haxe.macro.ComplexType", "p": p}), {_hx_name: "TPath", __params__: ["p"]}),
	/**
	Represents a function type.
	@see https://haxe.org/manual/types-function.html
	*/
	TFunction: Object.assign((args, ret) => ({_hx_index: 1, __enum__: "haxe.macro.ComplexType", "args": args, "ret": ret}), {_hx_name: "TFunction", __params__: ["args", "ret"]}),
	/**
	Represents an anonymous structure type.
	@see https://haxe.org/manual/types-anonymous-structure.html
	*/
	TAnonymous: Object.assign((fields) => ({_hx_index: 2, __enum__: "haxe.macro.ComplexType", "fields": fields}), {_hx_name: "TAnonymous", __params__: ["fields"]}),
	/**
	Represents parentheses around a type, e.g. the `(Int -> Void)` part in
	`(Int -> Void) -> String`.
	*/
	TParent: Object.assign((t) => ({_hx_index: 3, __enum__: "haxe.macro.ComplexType", "t": t}), {_hx_name: "TParent", __params__: ["t"]}),
	/**
	Represents typedef extensions `> Iterable<T>`.
	The array `p` holds the type paths to the given types.
	@see https://haxe.org/manual/type-system-extensions.html
	*/
	TExtend: Object.assign((p, fields) => ({_hx_index: 4, __enum__: "haxe.macro.ComplexType", "p": p, "fields": fields}), {_hx_name: "TExtend", __params__: ["p", "fields"]}),
	/**
	Represents an optional type.
	*/
	TOptional: Object.assign((t) => ({_hx_index: 5, __enum__: "haxe.macro.ComplexType", "t": t}), {_hx_name: "TOptional", __params__: ["t"]}),
	/**
	Represents a type with a name.
	*/
	TNamed: Object.assign((n, t) => ({_hx_index: 6, __enum__: "haxe.macro.ComplexType", "n": n, "t": t}), {_hx_name: "TNamed", __params__: ["n", "t"]}),
	/**
	Represents an intersection type `T1 & T2 & ... & TN`.
	*/
	TIntersection: Object.assign((tl) => ({_hx_index: 7, __enum__: "haxe.macro.ComplexType", "tl": tl}), {_hx_name: "TIntersection", __params__: ["tl"]})
}
ComplexType.__constructs__ = [ComplexType.TPath, ComplexType.TFunction, ComplexType.TAnonymous, ComplexType.TParent, ComplexType.TExtend, ComplexType.TOptional, ComplexType.TNamed, ComplexType.TIntersection]
ComplexType.__empty_constructs__ = []

/**
Represents a concrete type parameter in the AST.

Haxe allows expressions in concrete type parameters, e.g.
`new YourType<["hello", "world"]>`. In that case the value is `TPExpr` while
in the normal case it's `TPType`.
*/
export const TypeParam = 
Register.global("$hxEnums")["haxe.macro.TypeParam"] = 
{
	__ename__: "haxe.macro.TypeParam",
	
	TPType: Object.assign((t) => ({_hx_index: 0, __enum__: "haxe.macro.TypeParam", "t": t}), {_hx_name: "TPType", __params__: ["t"]}),
	TPExpr: Object.assign((e) => ({_hx_index: 1, __enum__: "haxe.macro.TypeParam", "e": e}), {_hx_name: "TPExpr", __params__: ["e"]})
}
TypeParam.__constructs__ = [TypeParam.TPType, TypeParam.TPExpr]
TypeParam.__empty_constructs__ = []

/**
Represents an access modifier.
@see https://haxe.org/manual/class-field-access-modifier.html
*/
export const Access = 
Register.global("$hxEnums")["haxe.macro.Access"] = 
{
	__ename__: "haxe.macro.Access",
	
	/**
	Public access modifier, grants access from anywhere.
	@see https://haxe.org/manual/class-field-visibility.html
	*/
	APublic: {_hx_name: "APublic", _hx_index: 0, __enum__: "haxe.macro.Access"},
	/**
	Private access modifier, grants access to class and its sub-classes
	only.
	@see https://haxe.org/manual/class-field-visibility.html
	*/
	APrivate: {_hx_name: "APrivate", _hx_index: 1, __enum__: "haxe.macro.Access"},
	/**
	Static access modifier.
	*/
	AStatic: {_hx_name: "AStatic", _hx_index: 2, __enum__: "haxe.macro.Access"},
	/**
	Override access modifier.
	@see https://haxe.org/manual/class-field-override.html
	*/
	AOverride: {_hx_name: "AOverride", _hx_index: 3, __enum__: "haxe.macro.Access"},
	/**
	Dynamic (re-)bindable access modifier.
	@see https://haxe.org/manual/class-field-dynamic.html
	*/
	ADynamic: {_hx_name: "ADynamic", _hx_index: 4, __enum__: "haxe.macro.Access"},
	/**
	Inline access modifier. Allows expressions to be directly inserted in
	place of calls to them.
	@see https://haxe.org/manual/class-field-inline.html
	*/
	AInline: {_hx_name: "AInline", _hx_index: 5, __enum__: "haxe.macro.Access"},
	/**
	Macro access modifier. Allows expression macro functions. These are
	normal functions which are executed as soon as they are typed.
	*/
	AMacro: {_hx_name: "AMacro", _hx_index: 6, __enum__: "haxe.macro.Access"},
	/**
	Final access modifier. For functions, they can not be overridden. For
	variables, it means they can be assigned to only once.
	*/
	AFinal: {_hx_name: "AFinal", _hx_index: 7, __enum__: "haxe.macro.Access"},
	/**
	Extern access modifier.
	*/
	AExtern: {_hx_name: "AExtern", _hx_index: 8, __enum__: "haxe.macro.Access"},
	/**
	Abstract access modifier.
	*/
	AAbstract: {_hx_name: "AAbstract", _hx_index: 9, __enum__: "haxe.macro.Access"},
	/**
	Overload access modifier.
	*/
	AOverload: {_hx_name: "AOverload", _hx_index: 10, __enum__: "haxe.macro.Access"}
}
Access.__constructs__ = [Access.APublic, Access.APrivate, Access.AStatic, Access.AOverride, Access.ADynamic, Access.AInline, Access.AMacro, Access.AFinal, Access.AExtern, Access.AAbstract, Access.AOverload]
Access.__empty_constructs__ = [Access.APublic, Access.APrivate, Access.AStatic, Access.AOverride, Access.ADynamic, Access.AInline, Access.AMacro, Access.AFinal, Access.AExtern, Access.AAbstract, Access.AOverload]

/**
Represents the field type in the AST.
*/
export const FieldType = 
Register.global("$hxEnums")["haxe.macro.FieldType"] = 
{
	__ename__: "haxe.macro.FieldType",
	
	/**
	Represents a variable field type.
	*/
	FVar: Object.assign((t, e) => ({_hx_index: 0, __enum__: "haxe.macro.FieldType", "t": t, "e": e}), {_hx_name: "FVar", __params__: ["t", "e"]}),
	/**
	Represents a function field type.
	*/
	FFun: Object.assign((f) => ({_hx_index: 1, __enum__: "haxe.macro.FieldType", "f": f}), {_hx_name: "FFun", __params__: ["f"]}),
	/**
	Represents a property with getter and setter field type.
	*/
	FProp: Object.assign((get, set, t, e) => ({_hx_index: 2, __enum__: "haxe.macro.FieldType", "get": get, "set": set, "t": t, "e": e}), {_hx_name: "FProp", __params__: ["get", "set", "t", "e"]})
}
FieldType.__constructs__ = [FieldType.FVar, FieldType.FFun, FieldType.FProp]
FieldType.__empty_constructs__ = []

/**
Represents a type definition kind.
*/
export const TypeDefKind = 
Register.global("$hxEnums")["haxe.macro.TypeDefKind"] = 
{
	__ename__: "haxe.macro.TypeDefKind",
	
	/**
	Represents an enum kind.
	*/
	TDEnum: {_hx_name: "TDEnum", _hx_index: 0, __enum__: "haxe.macro.TypeDefKind"},
	/**
	Represents a structure kind.
	*/
	TDStructure: {_hx_name: "TDStructure", _hx_index: 1, __enum__: "haxe.macro.TypeDefKind"},
	/**
	Represents a class kind.
	*/
	TDClass: Object.assign((superClass, interfaces, isInterface, isFinal, isAbstract) => ({_hx_index: 2, __enum__: "haxe.macro.TypeDefKind", "superClass": superClass, "interfaces": interfaces, "isInterface": isInterface, "isFinal": isFinal, "isAbstract": isAbstract}), {_hx_name: "TDClass", __params__: ["superClass", "interfaces", "isInterface", "isFinal", "isAbstract"]}),
	/**
	Represents an alias/typedef kind.
	*/
	TDAlias: Object.assign((t) => ({_hx_index: 3, __enum__: "haxe.macro.TypeDefKind", "t": t}), {_hx_name: "TDAlias", __params__: ["t"]}),
	/**
	Represents an abstract kind.
	*/
	TDAbstract: Object.assign((tthis, flags, from, to) => ({_hx_index: 4, __enum__: "haxe.macro.TypeDefKind", "tthis": tthis, "flags": flags, "from": from, "to": to}), {_hx_name: "TDAbstract", __params__: ["tthis", "flags", "from", "to"]}),
	/**
	Represents a module-level field.
	*/
	TDField: Object.assign((kind, access) => ({_hx_index: 5, __enum__: "haxe.macro.TypeDefKind", "kind": kind, "access": access}), {_hx_name: "TDField", __params__: ["kind", "access"]})
}
TypeDefKind.__constructs__ = [TypeDefKind.TDEnum, TypeDefKind.TDStructure, TypeDefKind.TDClass, TypeDefKind.TDAlias, TypeDefKind.TDAbstract, TypeDefKind.TDField]
TypeDefKind.__empty_constructs__ = [TypeDefKind.TDEnum, TypeDefKind.TDStructure]

/**
Represents an abstract flag.
*/
export const AbstractFlag = 
Register.global("$hxEnums")["haxe.macro.AbstractFlag"] = 
{
	__ename__: "haxe.macro.AbstractFlag",
	
	/**
	Indicates that this abstract is an `enum abstract`
	*/
	AbEnum: {_hx_name: "AbEnum", _hx_index: 0, __enum__: "haxe.macro.AbstractFlag"},
	/**
	Indicates that this abstract can be assigned from `ct`.
	This flag can be added several times to add multiple "from" types.
	*/
	AbFrom: Object.assign((ct) => ({_hx_index: 1, __enum__: "haxe.macro.AbstractFlag", "ct": ct}), {_hx_name: "AbFrom", __params__: ["ct"]}),
	/**
	Indicates that this abstract can be assigned to `ct`.
	This flag can be added several times to add multiple "to" types.
	*/
	AbTo: Object.assign((ct) => ({_hx_index: 2, __enum__: "haxe.macro.AbstractFlag", "ct": ct}), {_hx_name: "AbTo", __params__: ["ct"]})
}
AbstractFlag.__constructs__ = [AbstractFlag.AbEnum, AbstractFlag.AbFrom, AbstractFlag.AbTo]
AbstractFlag.__empty_constructs__ = [AbstractFlag.AbEnum]

/**
This error can be used to handle or produce compilation errors in macros.
*/
export const Error = Register.global("$hxClasses")["haxe.macro.Error"] = 
class Error extends Register.inherits(Exception) {
	new(message, pos, previous) {
		super.new(message, previous);
		this.pos = pos;
		this.__skipStack++;
	}
	static get __name__() {
		return "haxe.macro.Error"
	}
	static get __super__() {
		return Exception
	}
	get __class__() {
		return Error
	}
}


/**
Represents the import mode.
@see https://haxe.org/manual/type-system-import.html
*/
export const ImportMode = 
Register.global("$hxEnums")["haxe.macro.ImportMode"] = 
{
	__ename__: "haxe.macro.ImportMode",
	
	/**
	Represents a default import `import c`.
	*/
	INormal: {_hx_name: "INormal", _hx_index: 0, __enum__: "haxe.macro.ImportMode"},
	/**
	Represents the alias import `import c as alias`.
	*/
	IAsName: Object.assign((alias) => ({_hx_index: 1, __enum__: "haxe.macro.ImportMode", "alias": alias}), {_hx_name: "IAsName", __params__: ["alias"]}),
	/**
	Represents the wildcard import `import *`.
	*/
	IAll: {_hx_name: "IAll", _hx_index: 2, __enum__: "haxe.macro.ImportMode"}
}
ImportMode.__constructs__ = [ImportMode.INormal, ImportMode.IAsName, ImportMode.IAll]
ImportMode.__empty_constructs__ = [ImportMode.INormal, ImportMode.IAll]
