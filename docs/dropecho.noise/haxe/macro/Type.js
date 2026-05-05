import {Register} from "../../genes/Register.js"

const $global = Register.$global

/**
Represents a type.
*/
export const Type = 
Register.global("$hxEnums")["haxe.macro.Type"] = 
{
	__ename__: "haxe.macro.Type",
	
	/**
	Represents a monomorph.
	
	@see https://haxe.org/manual/types-monomorph.html
	*/
	TMono: Object.assign((t) => ({_hx_index: 0, __enum__: "haxe.macro.Type", "t": t}), {_hx_name: "TMono", __params__: ["t"]}),
	/**
	Represents an enum instance.
	
	@see https://haxe.org/manual/types-enum-instance.html
	*/
	TEnum: Object.assign((t, params) => ({_hx_index: 1, __enum__: "haxe.macro.Type", "t": t, "params": params}), {_hx_name: "TEnum", __params__: ["t", "params"]}),
	/**
	Represents a class instance.
	
	@see https://haxe.org/manual/types-class-instance.html
	*/
	TInst: Object.assign((t, params) => ({_hx_index: 2, __enum__: "haxe.macro.Type", "t": t, "params": params}), {_hx_name: "TInst", __params__: ["t", "params"]}),
	/**
	Represents a typedef.
	
	@see https://haxe.org/manual/type-system-typedef.html
	*/
	TType: Object.assign((t, params) => ({_hx_index: 3, __enum__: "haxe.macro.Type", "t": t, "params": params}), {_hx_name: "TType", __params__: ["t", "params"]}),
	/**
	Represents a function type.
	
	@see https://haxe.org/manual/types-function.html
	*/
	TFun: Object.assign((args, ret) => ({_hx_index: 4, __enum__: "haxe.macro.Type", "args": args, "ret": ret}), {_hx_name: "TFun", __params__: ["args", "ret"]}),
	/**
	Represents an anonymous structure type.
	
	@see https://haxe.org/manual/types-anonymous-structure.html
	*/
	TAnonymous: Object.assign((a) => ({_hx_index: 5, __enum__: "haxe.macro.Type", "a": a}), {_hx_name: "TAnonymous", __params__: ["a"]}),
	/**
	Represents Dynamic.
	
	@see https://haxe.org/manual/types-dynamic.html
	*/
	TDynamic: Object.assign((t) => ({_hx_index: 6, __enum__: "haxe.macro.Type", "t": t}), {_hx_name: "TDynamic", __params__: ["t"]}),
	/**
	Used internally by the compiler to delay some typing.
	*/
	TLazy: Object.assign((f) => ({_hx_index: 7, __enum__: "haxe.macro.Type", "f": f}), {_hx_name: "TLazy", __params__: ["f"]}),
	/**
	Represents an abstract type.
	
	@see https://haxe.org/manual/types-abstract.html
	*/
	TAbstract: Object.assign((t, params) => ({_hx_index: 8, __enum__: "haxe.macro.Type", "t": t, "params": params}), {_hx_name: "TAbstract", __params__: ["t", "params"]})
}
Type.__constructs__ = [Type.TMono, Type.TEnum, Type.TInst, Type.TType, Type.TFun, Type.TAnonymous, Type.TDynamic, Type.TLazy, Type.TAbstract]
Type.__empty_constructs__ = []

/**
Represents the kind of the anonymous structure type.
*/
export const AnonStatus = 
Register.global("$hxEnums")["haxe.macro.AnonStatus"] = 
{
	__ename__: "haxe.macro.AnonStatus",
	
	/**
	A closed structure is considered complete. That is, no further fields
	can be added to it.
	*/
	AClosed: {_hx_name: "AClosed", _hx_index: 0, __enum__: "haxe.macro.AnonStatus"},
	/**
	An open structure allows having additional fields added to it, which is
	used during type inference. It is closed upon unification.
	*/
	AOpened: {_hx_name: "AOpened", _hx_index: 1, __enum__: "haxe.macro.AnonStatus"},
	/**
	A const structure is one that appears directly in syntax. It cannot be
	assigned to a smaller structure type (that is, it does not allow
	structural sub-typing).
	*/
	AConst: {_hx_name: "AConst", _hx_index: 2, __enum__: "haxe.macro.AnonStatus"},
	/**
	Represents a structure which extends one or multiple structures defined
	in `tl`.
	
	@see https://haxe.org/manual/type-system-extensions.html
	*/
	AExtend: Object.assign((tl) => ({_hx_index: 3, __enum__: "haxe.macro.AnonStatus", "tl": tl}), {_hx_name: "AExtend", __params__: ["tl"]}),
	/**
	A structure that represents the static fields of a class.
	*/
	AClassStatics: Object.assign((t) => ({_hx_index: 4, __enum__: "haxe.macro.AnonStatus", "t": t}), {_hx_name: "AClassStatics", __params__: ["t"]}),
	/**
	A structure that represents the constructors of an enum.
	*/
	AEnumStatics: Object.assign((t) => ({_hx_index: 5, __enum__: "haxe.macro.AnonStatus", "t": t}), {_hx_name: "AEnumStatics", __params__: ["t"]}),
	/**
	A structure that represents the static fields of an abstract.
	*/
	AAbstractStatics: Object.assign((t) => ({_hx_index: 6, __enum__: "haxe.macro.AnonStatus", "t": t}), {_hx_name: "AAbstractStatics", __params__: ["t"]})
}
AnonStatus.__constructs__ = [AnonStatus.AClosed, AnonStatus.AOpened, AnonStatus.AConst, AnonStatus.AExtend, AnonStatus.AClassStatics, AnonStatus.AEnumStatics, AnonStatus.AAbstractStatics]
AnonStatus.__empty_constructs__ = [AnonStatus.AClosed, AnonStatus.AOpened, AnonStatus.AConst]

/**
Represents the kind of a class.
*/
export const ClassKind = 
Register.global("$hxEnums")["haxe.macro.ClassKind"] = 
{
	__ename__: "haxe.macro.ClassKind",
	
	/**
	A normal class.
	*/
	KNormal: {_hx_name: "KNormal", _hx_index: 0, __enum__: "haxe.macro.ClassKind"},
	/**
	A type parameter class with a set of constraints.
	*/
	KTypeParameter: Object.assign((constraints) => ({_hx_index: 1, __enum__: "haxe.macro.ClassKind", "constraints": constraints}), {_hx_name: "KTypeParameter", __params__: ["constraints"]}),
	/**
	A class containing module fields.
	*/
	KModuleFields: Object.assign((module) => ({_hx_index: 2, __enum__: "haxe.macro.ClassKind", "module": module}), {_hx_name: "KModuleFields", __params__: ["module"]}),
	/**
	A special kind of class to encode expressions into type parameters.
	*/
	KExpr: Object.assign((expr) => ({_hx_index: 3, __enum__: "haxe.macro.ClassKind", "expr": expr}), {_hx_name: "KExpr", __params__: ["expr"]}),
	/**
	A `@:generic` base class.
	*/
	KGeneric: {_hx_name: "KGeneric", _hx_index: 4, __enum__: "haxe.macro.ClassKind"},
	/**
	A concrete `@:generic` instance, referencing the original class and the
	applied type parameters.
	*/
	KGenericInstance: Object.assign((cl, params) => ({_hx_index: 5, __enum__: "haxe.macro.ClassKind", "cl": cl, "params": params}), {_hx_name: "KGenericInstance", __params__: ["cl", "params"]}),
	/**
	A special class for `haxe.macro.MacroType`.
	
	@deprecated
	*/
	KMacroType: {_hx_name: "KMacroType", _hx_index: 6, __enum__: "haxe.macro.ClassKind"},
	/**
	An implementation class of an abstract, i.e. where all its run-time code
	is.
	*/
	KAbstractImpl: Object.assign((a) => ({_hx_index: 7, __enum__: "haxe.macro.ClassKind", "a": a}), {_hx_name: "KAbstractImpl", __params__: ["a"]}),
	/**
	A `@:genericBuild` class
	*/
	KGenericBuild: {_hx_name: "KGenericBuild", _hx_index: 8, __enum__: "haxe.macro.ClassKind"}
}
ClassKind.__constructs__ = [ClassKind.KNormal, ClassKind.KTypeParameter, ClassKind.KModuleFields, ClassKind.KExpr, ClassKind.KGeneric, ClassKind.KGenericInstance, ClassKind.KMacroType, ClassKind.KAbstractImpl, ClassKind.KGenericBuild]
ClassKind.__empty_constructs__ = [ClassKind.KNormal, ClassKind.KGeneric, ClassKind.KMacroType, ClassKind.KGenericBuild]

/**
Represents a field kind.
*/
export const FieldKind = 
Register.global("$hxEnums")["haxe.macro.FieldKind"] = 
{
	__ename__: "haxe.macro.FieldKind",
	
	/**
	A variable of property, depending on the `read` and `write` values.
	*/
	FVar: Object.assign((read, write) => ({_hx_index: 0, __enum__: "haxe.macro.FieldKind", "read": read, "write": write}), {_hx_name: "FVar", __params__: ["read", "write"]}),
	/**
	A method
	*/
	FMethod: Object.assign((k) => ({_hx_index: 1, __enum__: "haxe.macro.FieldKind", "k": k}), {_hx_name: "FMethod", __params__: ["k"]})
}
FieldKind.__constructs__ = [FieldKind.FVar, FieldKind.FMethod]
FieldKind.__empty_constructs__ = []

/**
Represents the variable accessor.
*/
export const VarAccess = 
Register.global("$hxEnums")["haxe.macro.VarAccess"] = 
{
	__ename__: "haxe.macro.VarAccess",
	
	/**
	Normal access (`default`).
	*/
	AccNormal: {_hx_name: "AccNormal", _hx_index: 0, __enum__: "haxe.macro.VarAccess"},
	/**
	Private access (`null`).
	*/
	AccNo: {_hx_name: "AccNo", _hx_index: 1, __enum__: "haxe.macro.VarAccess"},
	/**
	No access (`never`).
	*/
	AccNever: {_hx_name: "AccNever", _hx_index: 2, __enum__: "haxe.macro.VarAccess"},
	/**
	Unused.
	*/
	AccResolve: {_hx_name: "AccResolve", _hx_index: 3, __enum__: "haxe.macro.VarAccess"},
	/**
	Access through accessor function (`get`, `set`, `dynamic`).
	*/
	AccCall: {_hx_name: "AccCall", _hx_index: 4, __enum__: "haxe.macro.VarAccess"},
	/**
	Inline access (`inline`).
	*/
	AccInline: {_hx_name: "AccInline", _hx_index: 5, __enum__: "haxe.macro.VarAccess"},
	/**
	Failed access due to a `@:require` metadata.
	*/
	AccRequire: Object.assign((r, msg) => ({_hx_index: 6, __enum__: "haxe.macro.VarAccess", "r": r, "msg": msg}), {_hx_name: "AccRequire", __params__: ["r", "msg"]}),
	/**
	Access is only allowed from the constructor.
	*/
	AccCtor: {_hx_name: "AccCtor", _hx_index: 7, __enum__: "haxe.macro.VarAccess"}
}
VarAccess.__constructs__ = [VarAccess.AccNormal, VarAccess.AccNo, VarAccess.AccNever, VarAccess.AccResolve, VarAccess.AccCall, VarAccess.AccInline, VarAccess.AccRequire, VarAccess.AccCtor]
VarAccess.__empty_constructs__ = [VarAccess.AccNormal, VarAccess.AccNo, VarAccess.AccNever, VarAccess.AccResolve, VarAccess.AccCall, VarAccess.AccInline, VarAccess.AccCtor]

/**
Represents the method kind.
*/
export const MethodKind = 
Register.global("$hxEnums")["haxe.macro.MethodKind"] = 
{
	__ename__: "haxe.macro.MethodKind",
	
	/**
	A normal method.
	*/
	MethNormal: {_hx_name: "MethNormal", _hx_index: 0, __enum__: "haxe.macro.MethodKind"},
	/**
	An inline method.
	
	@see https://haxe.org/manual/class-field-inline.html
	*/
	MethInline: {_hx_name: "MethInline", _hx_index: 1, __enum__: "haxe.macro.MethodKind"},
	/**
	A dynamic, rebindable method.
	
	@see https://haxe.org/manual/class-field-dynamic.html
	*/
	MethDynamic: {_hx_name: "MethDynamic", _hx_index: 2, __enum__: "haxe.macro.MethodKind"},
	/**
	A macro method.
	*/
	MethMacro: {_hx_name: "MethMacro", _hx_index: 3, __enum__: "haxe.macro.MethodKind"}
}
MethodKind.__constructs__ = [MethodKind.MethNormal, MethodKind.MethInline, MethodKind.MethDynamic, MethodKind.MethMacro]
MethodKind.__empty_constructs__ = [MethodKind.MethNormal, MethodKind.MethInline, MethodKind.MethDynamic, MethodKind.MethMacro]

/**
Represents typed constant.
*/
export const TConstant = 
Register.global("$hxEnums")["haxe.macro.TConstant"] = 
{
	__ename__: "haxe.macro.TConstant",
	
	/**
	An `Int` literal.
	*/
	TInt: Object.assign((i) => ({_hx_index: 0, __enum__: "haxe.macro.TConstant", "i": i}), {_hx_name: "TInt", __params__: ["i"]}),
	/**
	A `Float` literal, represented as String to avoid precision loss.
	*/
	TFloat: Object.assign((s) => ({_hx_index: 1, __enum__: "haxe.macro.TConstant", "s": s}), {_hx_name: "TFloat", __params__: ["s"]}),
	/**
	A `String` literal.
	*/
	TString: Object.assign((s) => ({_hx_index: 2, __enum__: "haxe.macro.TConstant", "s": s}), {_hx_name: "TString", __params__: ["s"]}),
	/**
	A `Bool` literal.
	*/
	TBool: Object.assign((b) => ({_hx_index: 3, __enum__: "haxe.macro.TConstant", "b": b}), {_hx_name: "TBool", __params__: ["b"]}),
	/**
	The constant `null`.
	*/
	TNull: {_hx_name: "TNull", _hx_index: 4, __enum__: "haxe.macro.TConstant"},
	/**
	The constant `this`.
	*/
	TThis: {_hx_name: "TThis", _hx_index: 5, __enum__: "haxe.macro.TConstant"},
	/**
	The constant `super`.
	*/
	TSuper: {_hx_name: "TSuper", _hx_index: 6, __enum__: "haxe.macro.TConstant"}
}
TConstant.__constructs__ = [TConstant.TInt, TConstant.TFloat, TConstant.TString, TConstant.TBool, TConstant.TNull, TConstant.TThis, TConstant.TSuper]
TConstant.__empty_constructs__ = [TConstant.TNull, TConstant.TThis, TConstant.TSuper]

/**
Represents a module type. These are the types that can be declared in a Haxe
module and which are passed to the generators (except `TTypeDecl`).
*/
export const ModuleType = 
Register.global("$hxEnums")["haxe.macro.ModuleType"] = 
{
	__ename__: "haxe.macro.ModuleType",
	
	/**
	A class.
	*/
	TClassDecl: Object.assign((c) => ({_hx_index: 0, __enum__: "haxe.macro.ModuleType", "c": c}), {_hx_name: "TClassDecl", __params__: ["c"]}),
	/**
	An enum.
	*/
	TEnumDecl: Object.assign((e) => ({_hx_index: 1, __enum__: "haxe.macro.ModuleType", "e": e}), {_hx_name: "TEnumDecl", __params__: ["e"]}),
	/**
	A typedef.
	*/
	TTypeDecl: Object.assign((t) => ({_hx_index: 2, __enum__: "haxe.macro.ModuleType", "t": t}), {_hx_name: "TTypeDecl", __params__: ["t"]}),
	/**
	An abstract.
	*/
	TAbstract: Object.assign((a) => ({_hx_index: 3, __enum__: "haxe.macro.ModuleType", "a": a}), {_hx_name: "TAbstract", __params__: ["a"]})
}
ModuleType.__constructs__ = [ModuleType.TClassDecl, ModuleType.TEnumDecl, ModuleType.TTypeDecl, ModuleType.TAbstract]
ModuleType.__empty_constructs__ = []

/**
Represents the kind of field access in the typed AST.
*/
export const FieldAccess = 
Register.global("$hxEnums")["haxe.macro.FieldAccess"] = 
{
	__ename__: "haxe.macro.FieldAccess",
	
	/**
	Access of field `cf` on a class instance `c` with type parameters
	`params`.
	*/
	FInstance: Object.assign((c, params, cf) => ({_hx_index: 0, __enum__: "haxe.macro.FieldAccess", "c": c, "params": params, "cf": cf}), {_hx_name: "FInstance", __params__: ["c", "params", "cf"]}),
	/**
	Static access of a field `cf` on a class `c`.
	*/
	FStatic: Object.assign((c, cf) => ({_hx_index: 1, __enum__: "haxe.macro.FieldAccess", "c": c, "cf": cf}), {_hx_name: "FStatic", __params__: ["c", "cf"]}),
	/**
	Access of field `cf` on an anonymous structure.
	*/
	FAnon: Object.assign((cf) => ({_hx_index: 2, __enum__: "haxe.macro.FieldAccess", "cf": cf}), {_hx_name: "FAnon", __params__: ["cf"]}),
	/**
	Dynamic field access of a field named `s`.
	*/
	FDynamic: Object.assign((s) => ({_hx_index: 3, __enum__: "haxe.macro.FieldAccess", "s": s}), {_hx_name: "FDynamic", __params__: ["s"]}),
	/**
	Closure field access of field `cf` on a class instance `c` with type
	parameters `params`.
	*/
	FClosure: Object.assign((c, cf) => ({_hx_index: 4, __enum__: "haxe.macro.FieldAccess", "c": c, "cf": cf}), {_hx_name: "FClosure", __params__: ["c", "cf"]}),
	/**
	Field access to an enum constructor `ef` of enum `e`.
	*/
	FEnum: Object.assign((e, ef) => ({_hx_index: 5, __enum__: "haxe.macro.FieldAccess", "e": e, "ef": ef}), {_hx_name: "FEnum", __params__: ["e", "ef"]})
}
FieldAccess.__constructs__ = [FieldAccess.FInstance, FieldAccess.FStatic, FieldAccess.FAnon, FieldAccess.FDynamic, FieldAccess.FClosure, FieldAccess.FEnum]
FieldAccess.__empty_constructs__ = []

/**
Represents kind of a node in the typed AST.
*/
export const TypedExprDef = 
Register.global("$hxEnums")["haxe.macro.TypedExprDef"] = 
{
	__ename__: "haxe.macro.TypedExprDef",
	
	/**
	A constant.
	*/
	TConst: Object.assign((c) => ({_hx_index: 0, __enum__: "haxe.macro.TypedExprDef", "c": c}), {_hx_name: "TConst", __params__: ["c"]}),
	/**
	Reference to a local variable `v`.
	*/
	TLocal: Object.assign((v) => ({_hx_index: 1, __enum__: "haxe.macro.TypedExprDef", "v": v}), {_hx_name: "TLocal", __params__: ["v"]}),
	/**
	Array access `e1[e2]`.
	*/
	TArray: Object.assign((e1, e2) => ({_hx_index: 2, __enum__: "haxe.macro.TypedExprDef", "e1": e1, "e2": e2}), {_hx_name: "TArray", __params__: ["e1", "e2"]}),
	/**
	Binary operator `e1 op e2`.
	*/
	TBinop: Object.assign((op, e1, e2) => ({_hx_index: 3, __enum__: "haxe.macro.TypedExprDef", "op": op, "e1": e1, "e2": e2}), {_hx_name: "TBinop", __params__: ["op", "e1", "e2"]}),
	/**
	Field access on `e` according to `fa`.
	*/
	TField: Object.assign((e, fa) => ({_hx_index: 4, __enum__: "haxe.macro.TypedExprDef", "e": e, "fa": fa}), {_hx_name: "TField", __params__: ["e", "fa"]}),
	/**
	Reference to a module type `m`.
	*/
	TTypeExpr: Object.assign((m) => ({_hx_index: 5, __enum__: "haxe.macro.TypedExprDef", "m": m}), {_hx_name: "TTypeExpr", __params__: ["m"]}),
	/**
	Parentheses `(e)`.
	*/
	TParenthesis: Object.assign((e) => ({_hx_index: 6, __enum__: "haxe.macro.TypedExprDef", "e": e}), {_hx_name: "TParenthesis", __params__: ["e"]}),
	/**
	An object declaration.
	*/
	TObjectDecl: Object.assign((fields) => ({_hx_index: 7, __enum__: "haxe.macro.TypedExprDef", "fields": fields}), {_hx_name: "TObjectDecl", __params__: ["fields"]}),
	/**
	An array declaration `[el]`.
	*/
	TArrayDecl: Object.assign((el) => ({_hx_index: 8, __enum__: "haxe.macro.TypedExprDef", "el": el}), {_hx_name: "TArrayDecl", __params__: ["el"]}),
	/**
	A call `e(el)`.
	*/
	TCall: Object.assign((e, el) => ({_hx_index: 9, __enum__: "haxe.macro.TypedExprDef", "e": e, "el": el}), {_hx_name: "TCall", __params__: ["e", "el"]}),
	/**
	A constructor call `new c<params>(el)`.
	*/
	TNew: Object.assign((c, params, el) => ({_hx_index: 10, __enum__: "haxe.macro.TypedExprDef", "c": c, "params": params, "el": el}), {_hx_name: "TNew", __params__: ["c", "params", "el"]}),
	/**
	An unary operator `op` on `e`:
	
	* e++ (op = OpIncrement, postFix = true)
	* e-- (op = OpDecrement, postFix = true)
	* ++e (op = OpIncrement, postFix = false)
	* --e (op = OpDecrement, postFix = false)
	* -e (op = OpNeg, postFix = false)
	* !e (op = OpNot, postFix = false)
	* ~e (op = OpNegBits, postFix = false)
	*/
	TUnop: Object.assign((op, postFix, e) => ({_hx_index: 11, __enum__: "haxe.macro.TypedExprDef", "op": op, "postFix": postFix, "e": e}), {_hx_name: "TUnop", __params__: ["op", "postFix", "e"]}),
	/**
	A function declaration.
	*/
	TFunction: Object.assign((tfunc) => ({_hx_index: 12, __enum__: "haxe.macro.TypedExprDef", "tfunc": tfunc}), {_hx_name: "TFunction", __params__: ["tfunc"]}),
	/**
	A variable declaration `var v` or `var v = expr`.
	*/
	TVar: Object.assign((v, expr) => ({_hx_index: 13, __enum__: "haxe.macro.TypedExprDef", "v": v, "expr": expr}), {_hx_name: "TVar", __params__: ["v", "expr"]}),
	/**
	A block declaration `{el}`.
	*/
	TBlock: Object.assign((el) => ({_hx_index: 14, __enum__: "haxe.macro.TypedExprDef", "el": el}), {_hx_name: "TBlock", __params__: ["el"]}),
	/**
	A `for` expression.
	*/
	TFor: Object.assign((v, e1, e2) => ({_hx_index: 15, __enum__: "haxe.macro.TypedExprDef", "v": v, "e1": e1, "e2": e2}), {_hx_name: "TFor", __params__: ["v", "e1", "e2"]}),
	/**
	An `if(econd) eif` or `if(econd) eif else eelse` expression.
	*/
	TIf: Object.assign((econd, eif, eelse) => ({_hx_index: 16, __enum__: "haxe.macro.TypedExprDef", "econd": econd, "eif": eif, "eelse": eelse}), {_hx_name: "TIf", __params__: ["econd", "eif", "eelse"]}),
	/**
	Represents a `while` expression.
	When `normalWhile` is `true` it is `while (...)`.
	When `normalWhile` is `false` it is `do {...} while (...)`.
	*/
	TWhile: Object.assign((econd, e, normalWhile) => ({_hx_index: 17, __enum__: "haxe.macro.TypedExprDef", "econd": econd, "e": e, "normalWhile": normalWhile}), {_hx_name: "TWhile", __params__: ["econd", "e", "normalWhile"]}),
	/**
	Represents a `switch` expression with related cases and an optional
	`default` case if edef != null.
	*/
	TSwitch: Object.assign((e, cases, edef) => ({_hx_index: 18, __enum__: "haxe.macro.TypedExprDef", "e": e, "cases": cases, "edef": edef}), {_hx_name: "TSwitch", __params__: ["e", "cases", "edef"]}),
	/**
	Represents a `try`-expression with related catches.
	*/
	TTry: Object.assign((e, catches) => ({_hx_index: 19, __enum__: "haxe.macro.TypedExprDef", "e": e, "catches": catches}), {_hx_name: "TTry", __params__: ["e", "catches"]}),
	/**
	A `return` or `return e` expression.
	*/
	TReturn: Object.assign((e) => ({_hx_index: 20, __enum__: "haxe.macro.TypedExprDef", "e": e}), {_hx_name: "TReturn", __params__: ["e"]}),
	/**
	A `break` expression.
	*/
	TBreak: {_hx_name: "TBreak", _hx_index: 21, __enum__: "haxe.macro.TypedExprDef"},
	/**
	A `continue` expression.
	*/
	TContinue: {_hx_name: "TContinue", _hx_index: 22, __enum__: "haxe.macro.TypedExprDef"},
	/**
	A `throw e` expression.
	*/
	TThrow: Object.assign((e) => ({_hx_index: 23, __enum__: "haxe.macro.TypedExprDef", "e": e}), {_hx_name: "TThrow", __params__: ["e"]}),
	/**
	A `cast e` or `cast (e, m)` expression.
	*/
	TCast: Object.assign((e, m) => ({_hx_index: 24, __enum__: "haxe.macro.TypedExprDef", "e": e, "m": m}), {_hx_name: "TCast", __params__: ["e", "m"]}),
	/**
	A `@m e1` expression.
	*/
	TMeta: Object.assign((m, e1) => ({_hx_index: 25, __enum__: "haxe.macro.TypedExprDef", "m": m, "e1": e1}), {_hx_name: "TMeta", __params__: ["m", "e1"]}),
	/**
	Access to an enum parameter (generated by the pattern matcher).
	*/
	TEnumParameter: Object.assign((e1, ef, index) => ({_hx_index: 26, __enum__: "haxe.macro.TypedExprDef", "e1": e1, "ef": ef, "index": index}), {_hx_name: "TEnumParameter", __params__: ["e1", "ef", "index"]}),
	/**
	Access to an enum index (generated by the pattern matcher).
	*/
	TEnumIndex: Object.assign((e1) => ({_hx_index: 27, __enum__: "haxe.macro.TypedExprDef", "e1": e1}), {_hx_name: "TEnumIndex", __params__: ["e1"]}),
	/**
	An unknown identifier.
	*/
	TIdent: Object.assign((s) => ({_hx_index: 28, __enum__: "haxe.macro.TypedExprDef", "s": s}), {_hx_name: "TIdent", __params__: ["s"]})
}
TypedExprDef.__constructs__ = [TypedExprDef.TConst, TypedExprDef.TLocal, TypedExprDef.TArray, TypedExprDef.TBinop, TypedExprDef.TField, TypedExprDef.TTypeExpr, TypedExprDef.TParenthesis, TypedExprDef.TObjectDecl, TypedExprDef.TArrayDecl, TypedExprDef.TCall, TypedExprDef.TNew, TypedExprDef.TUnop, TypedExprDef.TFunction, TypedExprDef.TVar, TypedExprDef.TBlock, TypedExprDef.TFor, TypedExprDef.TIf, TypedExprDef.TWhile, TypedExprDef.TSwitch, TypedExprDef.TTry, TypedExprDef.TReturn, TypedExprDef.TBreak, TypedExprDef.TContinue, TypedExprDef.TThrow, TypedExprDef.TCast, TypedExprDef.TMeta, TypedExprDef.TEnumParameter, TypedExprDef.TEnumIndex, TypedExprDef.TIdent]
TypedExprDef.__empty_constructs__ = [TypedExprDef.TBreak, TypedExprDef.TContinue]
