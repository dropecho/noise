import {Position, Expr, Binop, Unop, MetadataEntry} from "./Expr"
import {Map as Map__1} from "../../Map"

/**
Represents a reference to internal compiler structure. It exists to avoid
expensive encoding if it is not required and to ensure that physical
equality remains intact.

A structure is only encoded when user requests it through `ref.get()`.
*/
export type Ref<T> = {
	get: () => T, 
	toString: () => string
}

/**
Represents a type.
*/
export declare namespace Type {
	export type TType = {_hx_index: 3, t: Ref<DefType>, params: Type[], __enum__: "haxe.macro.Type"}
	export const TType: (t: Ref<DefType>, params: Type[]) => Type
	export type TMono = {_hx_index: 0, t: Ref<null | Type>, __enum__: "haxe.macro.Type"}
	export const TMono: (t: Ref<null | Type>) => Type
	export type TLazy = {_hx_index: 7, f: (() => Type), __enum__: "haxe.macro.Type"}
	export const TLazy: (f: (() => Type)) => Type
	export type TInst = {_hx_index: 2, t: Ref<ClassType>, params: Type[], __enum__: "haxe.macro.Type"}
	export const TInst: (t: Ref<ClassType>, params: Type[]) => Type
	export type TFun = {_hx_index: 4, args: {
		name: string, 
		opt: boolean, 
		t: Type
	}[], ret: Type, __enum__: "haxe.macro.Type"}
	export const TFun: (args: {
		name: string, 
		opt: boolean, 
		t: Type
	}[], ret: Type) => Type
	export type TEnum = {_hx_index: 1, t: Ref<EnumType>, params: Type[], __enum__: "haxe.macro.Type"}
	export const TEnum: (t: Ref<EnumType>, params: Type[]) => Type
	export type TDynamic = {_hx_index: 6, t: null | Type, __enum__: "haxe.macro.Type"}
	export const TDynamic: (t: null | Type) => Type
	export type TAnonymous = {_hx_index: 5, a: Ref<AnonType>, __enum__: "haxe.macro.Type"}
	export const TAnonymous: (a: Ref<AnonType>) => Type
	export type TAbstract = {_hx_index: 8, t: Ref<AbstractType>, params: Type[], __enum__: "haxe.macro.Type"}
	export const TAbstract: (t: Ref<AbstractType>, params: Type[]) => Type
}

/**
Represents a type.
*/
export declare type Type = 
	/**
	Represents a typedef.
	
	@see https://haxe.org/manual/type-system-typedef.html
	*/
	| Type.TType
	/**
	Represents a monomorph.
	
	@see https://haxe.org/manual/types-monomorph.html
	*/
	| Type.TMono
	/**
	Used internally by the compiler to delay some typing.
	*/
	| Type.TLazy
	/**
	Represents a class instance.
	
	@see https://haxe.org/manual/types-class-instance.html
	*/
	| Type.TInst
	/**
	Represents a function type.
	
	@see https://haxe.org/manual/types-function.html
	*/
	| Type.TFun
	/**
	Represents an enum instance.
	
	@see https://haxe.org/manual/types-enum-instance.html
	*/
	| Type.TEnum
	/**
	Represents Dynamic.
	
	@see https://haxe.org/manual/types-dynamic.html
	*/
	| Type.TDynamic
	/**
	Represents an anonymous structure type.
	
	@see https://haxe.org/manual/types-anonymous-structure.html
	*/
	| Type.TAnonymous
	/**
	Represents an abstract type.
	
	@see https://haxe.org/manual/types-abstract.html
	*/
	| Type.TAbstract

/**
Represents information for anonymous structure types.
*/
export type AnonType = {
	/**
	The class fields of the structure.
	*/
	fields: ClassField[], 
	/**
	The status/kind of the structure.
	*/
	status: AnonStatus
}

/**
Represents the kind of the anonymous structure type.
*/
export declare namespace AnonStatus {
	export type AOpened = {_hx_index: 1, __enum__: "haxe.macro.AnonStatus"}
	export const AOpened: AOpened
	export type AExtend = {_hx_index: 3, tl: Ref<Type[]>, __enum__: "haxe.macro.AnonStatus"}
	export const AExtend: (tl: Ref<Type[]>) => AnonStatus
	export type AEnumStatics = {_hx_index: 5, t: Ref<EnumType>, __enum__: "haxe.macro.AnonStatus"}
	export const AEnumStatics: (t: Ref<EnumType>) => AnonStatus
	export type AConst = {_hx_index: 2, __enum__: "haxe.macro.AnonStatus"}
	export const AConst: AConst
	export type AClosed = {_hx_index: 0, __enum__: "haxe.macro.AnonStatus"}
	export const AClosed: AClosed
	export type AClassStatics = {_hx_index: 4, t: Ref<ClassType>, __enum__: "haxe.macro.AnonStatus"}
	export const AClassStatics: (t: Ref<ClassType>) => AnonStatus
	export type AAbstractStatics = {_hx_index: 6, t: Ref<AbstractType>, __enum__: "haxe.macro.AnonStatus"}
	export const AAbstractStatics: (t: Ref<AbstractType>) => AnonStatus
}

/**
Represents the kind of the anonymous structure type.
*/
export declare type AnonStatus = 
	/**
	An open structure allows having additional fields added to it, which is
	used during type inference. It is closed upon unification.
	*/
	| AnonStatus.AOpened
	/**
	Represents a structure which extends one or multiple structures defined
	in `tl`.
	
	@see https://haxe.org/manual/type-system-extensions.html
	*/
	| AnonStatus.AExtend
	/**
	A structure that represents the constructors of an enum.
	*/
	| AnonStatus.AEnumStatics
	/**
	A const structure is one that appears directly in syntax. It cannot be
	assigned to a smaller structure type (that is, it does not allow
	structural sub-typing).
	*/
	| AnonStatus.AConst
	/**
	A closed structure is considered complete. That is, no further fields
	can be added to it.
	*/
	| AnonStatus.AClosed
	/**
	A structure that represents the static fields of a class.
	*/
	| AnonStatus.AClassStatics
	/**
	A structure that represents the static fields of an abstract.
	*/
	| AnonStatus.AAbstractStatics

/**
Represents the declaration of type parameters.
*/
export type TypeParameter = {
	/**
	The default type for this type parameter.
	*/
	defaultType?: null | Type, 
	/**
	The name of the type parameter.
	*/
	name: string, 
	/**
	The type of the type parameter. It is guaranteed to be a `TInst` with a
	`KTypeParameter` kind.
	*/
	t: Type
}

/**
Represents a class field.
*/
export type ClassField = {
	/**
	The associated documentation of the class field.
	*/
	doc: null | string, 
	/**
	Returns the typed expression of the class field.
	*/
	expr: () => null | TypedExpr, 
	/**
	Whether or not the class field is abstract.
	*/
	isAbstract: boolean, 
	/**
	Whether or not the class field is extern.
	*/
	isExtern: boolean, 
	/**
	Whether or not the class field is final.
	*/
	isFinal: boolean, 
	/**
	Whether or not the class field is public.
	*/
	isPublic: boolean, 
	/**
	The class field kind.
	*/
	kind: FieldKind, 
	/**
	The metadata of the class field.
	*/
	meta: MetaAccess, 
	/**
	The name of the class field.
	*/
	name: string, 
	/**
	The overload fields of the class field.
	*/
	overloads: Ref<ClassField[]>, 
	/**
	The type parameters of the class field.
	*/
	params: TypeParameter[], 
	/**
	The position of the class field.
	*/
	pos: Position, 
	/**
	The type of the class field.
	*/
	type: Type
}

/**
Represents an enum constructor.
*/
export type EnumField = {
	/**
	The associated documentation of the enum constructor.
	*/
	doc: null | string, 
	/**
	The index of the enum constructor, i.e. in which position it appears
	in the syntax.
	*/
	index: number, 
	/**
	The metadata of the enum constructor.
	*/
	meta: MetaAccess, 
	/**
	The name of the enum constructor.
	*/
	name: string, 
	/**
	The type parameters of the enum constructor.
	*/
	params: TypeParameter[], 
	/**
	The position of the enum constructor.
	*/
	pos: Position, 
	/**
	The type of the enum constructor.
	*/
	type: Type
}

/**
Represents the kind of a class.
*/
export declare namespace ClassKind {
	export type KTypeParameter = {_hx_index: 1, constraints: Type[], __enum__: "haxe.macro.ClassKind"}
	export const KTypeParameter: (constraints: Type[]) => ClassKind
	export type KNormal = {_hx_index: 0, __enum__: "haxe.macro.ClassKind"}
	export const KNormal: KNormal
	export type KModuleFields = {_hx_index: 2, module: string, __enum__: "haxe.macro.ClassKind"}
	export const KModuleFields: (module: string) => ClassKind
	export type KMacroType = {_hx_index: 6, __enum__: "haxe.macro.ClassKind"}
	export const KMacroType: KMacroType
	export type KGenericInstance = {_hx_index: 5, cl: Ref<ClassType>, params: Type[], __enum__: "haxe.macro.ClassKind"}
	export const KGenericInstance: (cl: Ref<ClassType>, params: Type[]) => ClassKind
	export type KGenericBuild = {_hx_index: 8, __enum__: "haxe.macro.ClassKind"}
	export const KGenericBuild: KGenericBuild
	export type KGeneric = {_hx_index: 4, __enum__: "haxe.macro.ClassKind"}
	export const KGeneric: KGeneric
	export type KExpr = {_hx_index: 3, expr: Expr, __enum__: "haxe.macro.ClassKind"}
	export const KExpr: (expr: Expr) => ClassKind
	export type KAbstractImpl = {_hx_index: 7, a: Ref<AbstractType>, __enum__: "haxe.macro.ClassKind"}
	export const KAbstractImpl: (a: Ref<AbstractType>) => ClassKind
}

/**
Represents the kind of a class.
*/
export declare type ClassKind = 
	/**
	A type parameter class with a set of constraints.
	*/
	| ClassKind.KTypeParameter
	/**
	A normal class.
	*/
	| ClassKind.KNormal
	/**
	A class containing module fields.
	*/
	| ClassKind.KModuleFields
	/**
	A special class for `haxe.macro.MacroType`.
	
	@deprecated
	*/
	| ClassKind.KMacroType
	/**
	A concrete `@:generic` instance, referencing the original class and the
	applied type parameters.
	*/
	| ClassKind.KGenericInstance
	/**
	A `@:genericBuild` class
	*/
	| ClassKind.KGenericBuild
	/**
	A `@:generic` base class.
	*/
	| ClassKind.KGeneric
	/**
	A special kind of class to encode expressions into type parameters.
	*/
	| ClassKind.KExpr
	/**
	An implementation class of an abstract, i.e. where all its run-time code
	is.
	*/
	| ClassKind.KAbstractImpl

/**
The information that all types (`ClassType`, `EnumType`, `DefType`,
`AbstractType`) have in common.
*/
export type BaseType = {
	/**
	The associated documentation of the class field.
	*/
	doc: null | string, 
	/**
	Allows excluding the type from compilation.
	*/
	exclude: () => void, 
	/**
	Whether or not the type is extern.
	*/
	isExtern: boolean, 
	/**
	Whether or not the type is private.
	*/
	isPrivate: boolean, 
	/**
	The metadata of the type.
	*/
	meta: MetaAccess, 
	/**
	The module name of the type, which might be different.
	*/
	module: string, 
	/**
	The name of the type.
	*/
	name: string, 
	/**
	The package of the type.
	*/
	pack: string[], 
	/**
	The type parameters of the type.
	*/
	params: TypeParameter[], 
	/**
	The position of the type.
	*/
	pos: Position
}

/**
Represents a class type.
*/
export type ClassType = {
	/**
	The constructor of the class, if available.
	*/
	constructor: null | Ref<ClassField>, 
	/**
	The associated documentation of the class field.
	*/
	doc: null | string, 
	/**
	Allows excluding the type from compilation.
	*/
	exclude: () => void, 
	/**
	The member fields of the class.
	*/
	fields: Ref<ClassField[]>, 
	/**
	The `__init__` expression of the class, if available.
	*/
	init: null | TypedExpr, 
	/**
	The implemented interfaces and their type parameters.
	*/
	interfaces: {
		params: Type[], 
		t: Ref<ClassType>
	}[], 
	/**
	If true the class is abstract and cannot be instantiated directly.
	*/
	isAbstract: boolean, 
	/**
	Whether or not the type is extern.
	*/
	isExtern: boolean, 
	/**
	If true the class is final and cannot be extended.
	*/
	isFinal: boolean, 
	/**
	If true the type is an interface, otherwise it is a class.
	*/
	isInterface: boolean, 
	/**
	Whether or not the type is private.
	*/
	isPrivate: boolean, 
	/**
	The kind of the class.
	*/
	kind: ClassKind, 
	/**
	The metadata of the type.
	*/
	meta: MetaAccess, 
	/**
	The module name of the type, which might be different.
	*/
	module: string, 
	/**
	The name of the type.
	*/
	name: string, 
	/**
	The list of fields that have override status.
	*/
	overrides: Ref<ClassField>[], 
	/**
	The package of the type.
	*/
	pack: string[], 
	/**
	The type parameters of the type.
	*/
	params: TypeParameter[], 
	/**
	The position of the type.
	*/
	pos: Position, 
	/**
	The static fields of the class.
	*/
	statics: Ref<ClassField[]>, 
	/**
	The parent class and its type parameters, if available.
	*/
	superClass: null | {
		params: Type[], 
		t: Ref<ClassType>
	}
}

/**
Represents an enum type.
*/
export type EnumType = {
	/**
	The available enum constructors.
	*/
	constructs: Map__1<string, EnumField>, 
	/**
	The associated documentation of the class field.
	*/
	doc: null | string, 
	/**
	Allows excluding the type from compilation.
	*/
	exclude: () => void, 
	/**
	Whether or not the type is extern.
	*/
	isExtern: boolean, 
	/**
	Whether or not the type is private.
	*/
	isPrivate: boolean, 
	/**
	The metadata of the type.
	*/
	meta: MetaAccess, 
	/**
	The module name of the type, which might be different.
	*/
	module: string, 
	/**
	The name of the type.
	*/
	name: string, 
	/**
	An ordered list of enum constructor names.
	*/
	names: string[], 
	/**
	The package of the type.
	*/
	pack: string[], 
	/**
	The type parameters of the type.
	*/
	params: TypeParameter[], 
	/**
	The position of the type.
	*/
	pos: Position
}

/**
Represents a typedef.
*/
export type DefType = {
	/**
	The associated documentation of the class field.
	*/
	doc: null | string, 
	/**
	Allows excluding the type from compilation.
	*/
	exclude: () => void, 
	/**
	Whether or not the type is extern.
	*/
	isExtern: boolean, 
	/**
	Whether or not the type is private.
	*/
	isPrivate: boolean, 
	/**
	The metadata of the type.
	*/
	meta: MetaAccess, 
	/**
	The module name of the type, which might be different.
	*/
	module: string, 
	/**
	The name of the type.
	*/
	name: string, 
	/**
	The package of the type.
	*/
	pack: string[], 
	/**
	The type parameters of the type.
	*/
	params: TypeParameter[], 
	/**
	The position of the type.
	*/
	pos: Position, 
	/**
	The target type of the typedef.
	*/
	type: Type
}

/**
Represents an abstract type.
*/
export type AbstractType = {
	/**
	The defined array-access fields of the abstract.
	*/
	array: ClassField[], 
	/**
	The defined binary operators of the abstract.
	*/
	binops: {
		field: ClassField, 
		op: Binop
	}[], 
	/**
	The associated documentation of the class field.
	*/
	doc: null | string, 
	/**
	Allows excluding the type from compilation.
	*/
	exclude: () => void, 
	/**
	The available implicit from-casts of the abstract.
	
	@see https://haxe.org/manual/types-abstract-implicit-casts.html
	*/
	from: {
		field: null | ClassField, 
		t: Type
	}[], 
	/**
	The implementation class of the abstract, if available.
	*/
	impl: null | Ref<ClassType>, 
	/**
	Whether or not the type is extern.
	*/
	isExtern: boolean, 
	/**
	Whether or not the type is private.
	*/
	isPrivate: boolean, 
	/**
	The metadata of the type.
	*/
	meta: MetaAccess, 
	/**
	The module name of the type, which might be different.
	*/
	module: string, 
	/**
	The name of the type.
	*/
	name: string, 
	/**
	The package of the type.
	*/
	pack: string[], 
	/**
	The type parameters of the type.
	*/
	params: TypeParameter[], 
	/**
	The position of the type.
	*/
	pos: Position, 
	/**
	The method used for resolving unknown field access, if available.
	*/
	resolve: null | ClassField, 
	/**
	The method used for resolving unknown field access, if available.
	*/
	resolveWrite: null | ClassField, 
	/**
	The available implicit to-casts of the abstract.
	
	@see https://haxe.org/manual/types-abstract-implicit-casts.html
	*/
	to: {
		field: null | ClassField, 
		t: Type
	}[], 
	/**
	The underlying type of the abstract.
	*/
	type: Type, 
	/**
	The defined unary operators of the abstract.
	*/
	unops: {
		field: ClassField, 
		op: Unop, 
		postFix: boolean
	}[]
}

/**
MetaAccess is a wrapper for the `Metadata` array. It can be used to add
metadata to and remove metadata from its origin.
*/
export type MetaAccess = {
	/**
	Adds the metadata specified by `name`, `params` and `pos` to the origin
	of `this` MetaAccess.
	
	Metadata names are not unique during compilation, so this method never
	overwrites a previous metadata.
	
	If a `Metadata` array is obtained through a call to `get`, a subsequent
	call to `add` has no effect on that array.
	
	If any argument is null, compilation fails with an error.
	*/
	add: (name: string, params: Expr[], pos: Position) => void, 
	/**
	Extract metadata entries by given `name`.
	
	If there's no metadata with such name, empty array `[]` is returned.
	
	If `name` is null, compilation fails with an error.
	*/
	extract: (name: string) => MetadataEntry[], 
	/**
	Return the wrapped `Metadata` array.
	
	Modifying this array has no effect on the origin of `this` MetaAccess.
	The `add` and `remove` methods can be used for that.
	*/
	get: () => MetadataEntry[], 
	/**
	Tells if the origin of `this` MetaAccess has a `name` metadata entry.
	
	If `name` is null, compilation fails with an error.
	*/
	has: (name: string) => boolean, 
	/**
	Removes all `name` metadata entries from the origin of `this`
	MetaAccess.
	
	This method might clear several metadata entries of the same name.
	
	If a `Metadata` array is obtained through a call to `get`, a subsequent
	call to `remove` has no effect on that array.
	
	If `name` is null, compilation fails with an error.
	*/
	remove: (name: string) => void
}

/**
Represents a field kind.
*/
export declare namespace FieldKind {
	export type FVar = {_hx_index: 0, read: VarAccess, write: VarAccess, __enum__: "haxe.macro.FieldKind"}
	export const FVar: (read: VarAccess, write: VarAccess) => FieldKind
	export type FMethod = {_hx_index: 1, k: MethodKind, __enum__: "haxe.macro.FieldKind"}
	export const FMethod: (k: MethodKind) => FieldKind
}

/**
Represents a field kind.
*/
export declare type FieldKind = 
	/**
	A variable of property, depending on the `read` and `write` values.
	*/
	| FieldKind.FVar
	/**
	A method
	*/
	| FieldKind.FMethod

/**
Represents the variable accessor.
*/
export declare namespace VarAccess {
	export type AccResolve = {_hx_index: 3, __enum__: "haxe.macro.VarAccess"}
	export const AccResolve: AccResolve
	export type AccRequire = {_hx_index: 6, r: string, msg: null | string, __enum__: "haxe.macro.VarAccess"}
	export const AccRequire: (r: string, msg: null | string) => VarAccess
	export type AccNormal = {_hx_index: 0, __enum__: "haxe.macro.VarAccess"}
	export const AccNormal: AccNormal
	export type AccNo = {_hx_index: 1, __enum__: "haxe.macro.VarAccess"}
	export const AccNo: AccNo
	export type AccNever = {_hx_index: 2, __enum__: "haxe.macro.VarAccess"}
	export const AccNever: AccNever
	export type AccInline = {_hx_index: 5, __enum__: "haxe.macro.VarAccess"}
	export const AccInline: AccInline
	export type AccCtor = {_hx_index: 7, __enum__: "haxe.macro.VarAccess"}
	export const AccCtor: AccCtor
	export type AccCall = {_hx_index: 4, __enum__: "haxe.macro.VarAccess"}
	export const AccCall: AccCall
}

/**
Represents the variable accessor.
*/
export declare type VarAccess = 
	/**
	Unused.
	*/
	| VarAccess.AccResolve
	/**
	Failed access due to a `@:require` metadata.
	*/
	| VarAccess.AccRequire
	/**
	Normal access (`default`).
	*/
	| VarAccess.AccNormal
	/**
	Private access (`null`).
	*/
	| VarAccess.AccNo
	/**
	No access (`never`).
	*/
	| VarAccess.AccNever
	/**
	Inline access (`inline`).
	*/
	| VarAccess.AccInline
	/**
	Access is only allowed from the constructor.
	*/
	| VarAccess.AccCtor
	/**
	Access through accessor function (`get`, `set`, `dynamic`).
	*/
	| VarAccess.AccCall

/**
Represents the method kind.
*/
export declare namespace MethodKind {
	export type MethNormal = {_hx_index: 0, __enum__: "haxe.macro.MethodKind"}
	export const MethNormal: MethNormal
	export type MethMacro = {_hx_index: 3, __enum__: "haxe.macro.MethodKind"}
	export const MethMacro: MethMacro
	export type MethInline = {_hx_index: 1, __enum__: "haxe.macro.MethodKind"}
	export const MethInline: MethInline
	export type MethDynamic = {_hx_index: 2, __enum__: "haxe.macro.MethodKind"}
	export const MethDynamic: MethDynamic
}

/**
Represents the method kind.
*/
export declare type MethodKind = 
	/**
	A normal method.
	*/
	| MethodKind.MethNormal
	/**
	A macro method.
	*/
	| MethodKind.MethMacro
	/**
	An inline method.
	
	@see https://haxe.org/manual/class-field-inline.html
	*/
	| MethodKind.MethInline
	/**
	A dynamic, rebindable method.
	
	@see https://haxe.org/manual/class-field-dynamic.html
	*/
	| MethodKind.MethDynamic

/**
Represents typed constant.
*/
export declare namespace TConstant {
	export type TThis = {_hx_index: 5, __enum__: "haxe.macro.TConstant"}
	export const TThis: TThis
	export type TSuper = {_hx_index: 6, __enum__: "haxe.macro.TConstant"}
	export const TSuper: TSuper
	export type TString = {_hx_index: 2, s: string, __enum__: "haxe.macro.TConstant"}
	export const TString: (s: string) => TConstant
	export type TNull = {_hx_index: 4, __enum__: "haxe.macro.TConstant"}
	export const TNull: TNull
	export type TInt = {_hx_index: 0, i: number, __enum__: "haxe.macro.TConstant"}
	export const TInt: (i: number) => TConstant
	export type TFloat = {_hx_index: 1, s: string, __enum__: "haxe.macro.TConstant"}
	export const TFloat: (s: string) => TConstant
	export type TBool = {_hx_index: 3, b: boolean, __enum__: "haxe.macro.TConstant"}
	export const TBool: (b: boolean) => TConstant
}

/**
Represents typed constant.
*/
export declare type TConstant = 
	/**
	The constant `this`.
	*/
	| TConstant.TThis
	/**
	The constant `super`.
	*/
	| TConstant.TSuper
	/**
	A `String` literal.
	*/
	| TConstant.TString
	/**
	The constant `null`.
	*/
	| TConstant.TNull
	/**
	An `Int` literal.
	*/
	| TConstant.TInt
	/**
	A `Float` literal, represented as String to avoid precision loss.
	*/
	| TConstant.TFloat
	/**
	A `Bool` literal.
	*/
	| TConstant.TBool

/**
Represents a variable in the typed AST.
*/
export type TVar = {
	/**
	Whether or not the variable has been captured by a closure.
	*/
	capture: boolean, 
	/**
	Special information which is internally used to keep track of closure.
	information
	*/
	extra: null | {
		expr: null | TypedExpr, 
		params: TypeParameter[]
	}, 
	/**
	The unique ID of the variable.
	*/
	id: number, 
	/**
	The metadata of the variable.
	*/
	meta: null | MetaAccess, 
	/**
	The name of the variable.
	*/
	name: string, 
	/**
	The type of the variable.
	*/
	t: Type
}

/**
Represents a module type. These are the types that can be declared in a Haxe
module and which are passed to the generators (except `TTypeDecl`).
*/
export declare namespace ModuleType {
	export type TTypeDecl = {_hx_index: 2, t: Ref<DefType>, __enum__: "haxe.macro.ModuleType"}
	export const TTypeDecl: (t: Ref<DefType>) => ModuleType
	export type TEnumDecl = {_hx_index: 1, e: Ref<EnumType>, __enum__: "haxe.macro.ModuleType"}
	export const TEnumDecl: (e: Ref<EnumType>) => ModuleType
	export type TClassDecl = {_hx_index: 0, c: Ref<ClassType>, __enum__: "haxe.macro.ModuleType"}
	export const TClassDecl: (c: Ref<ClassType>) => ModuleType
	export type TAbstract = {_hx_index: 3, a: Ref<AbstractType>, __enum__: "haxe.macro.ModuleType"}
	export const TAbstract: (a: Ref<AbstractType>) => ModuleType
}

/**
Represents a module type. These are the types that can be declared in a Haxe
module and which are passed to the generators (except `TTypeDecl`).
*/
export declare type ModuleType = 
	/**
	A typedef.
	*/
	| ModuleType.TTypeDecl
	/**
	An enum.
	*/
	| ModuleType.TEnumDecl
	/**
	A class.
	*/
	| ModuleType.TClassDecl
	/**
	An abstract.
	*/
	| ModuleType.TAbstract

/**
Represents a function in the typed AST.
*/
export type TFunc = {
	/**
	A list of function arguments identified by an argument variable `v` and
	an optional initialization `value`.
	*/
	args: {
		v: TVar, 
		value: null | TypedExpr
	}[], 
	/**
	The expression of the function body.
	*/
	expr: TypedExpr, 
	/**
	The return type of the function.
	*/
	t: Type
}

/**
Represents the kind of field access in the typed AST.
*/
export declare namespace FieldAccess {
	export type FStatic = {_hx_index: 1, c: Ref<ClassType>, cf: Ref<ClassField>, __enum__: "haxe.macro.FieldAccess"}
	export const FStatic: (c: Ref<ClassType>, cf: Ref<ClassField>) => FieldAccess
	export type FInstance = {_hx_index: 0, c: Ref<ClassType>, params: Type[], cf: Ref<ClassField>, __enum__: "haxe.macro.FieldAccess"}
	export const FInstance: (c: Ref<ClassType>, params: Type[], cf: Ref<ClassField>) => FieldAccess
	export type FEnum = {_hx_index: 5, e: Ref<EnumType>, ef: EnumField, __enum__: "haxe.macro.FieldAccess"}
	export const FEnum: (e: Ref<EnumType>, ef: EnumField) => FieldAccess
	export type FDynamic = {_hx_index: 3, s: string, __enum__: "haxe.macro.FieldAccess"}
	export const FDynamic: (s: string) => FieldAccess
	export type FClosure = {_hx_index: 4, c: null | {
		c: Ref<ClassType>, 
		params: Type[]
	}, cf: Ref<ClassField>, __enum__: "haxe.macro.FieldAccess"}
	export const FClosure: (c: null | {
		c: Ref<ClassType>, 
		params: Type[]
	}, cf: Ref<ClassField>) => FieldAccess
	export type FAnon = {_hx_index: 2, cf: Ref<ClassField>, __enum__: "haxe.macro.FieldAccess"}
	export const FAnon: (cf: Ref<ClassField>) => FieldAccess
}

/**
Represents the kind of field access in the typed AST.
*/
export declare type FieldAccess = 
	/**
	Static access of a field `cf` on a class `c`.
	*/
	| FieldAccess.FStatic
	/**
	Access of field `cf` on a class instance `c` with type parameters
	`params`.
	*/
	| FieldAccess.FInstance
	/**
	Field access to an enum constructor `ef` of enum `e`.
	*/
	| FieldAccess.FEnum
	/**
	Dynamic field access of a field named `s`.
	*/
	| FieldAccess.FDynamic
	/**
	Closure field access of field `cf` on a class instance `c` with type
	parameters `params`.
	*/
	| FieldAccess.FClosure
	/**
	Access of field `cf` on an anonymous structure.
	*/
	| FieldAccess.FAnon

/**
Represents kind of a node in the typed AST.
*/
export declare namespace TypedExprDef {
	export type TWhile = {_hx_index: 17, econd: TypedExpr, e: TypedExpr, normalWhile: boolean, __enum__: "haxe.macro.TypedExprDef"}
	export const TWhile: (econd: TypedExpr, e: TypedExpr, normalWhile: boolean) => TypedExprDef
	export type TVar = {_hx_index: 13, v: TVar, expr: null | TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TVar: (v: TVar, expr: null | TypedExpr) => TypedExprDef
	export type TUnop = {_hx_index: 11, op: Unop, postFix: boolean, e: TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TUnop: (op: Unop, postFix: boolean, e: TypedExpr) => TypedExprDef
	export type TTypeExpr = {_hx_index: 5, m: ModuleType, __enum__: "haxe.macro.TypedExprDef"}
	export const TTypeExpr: (m: ModuleType) => TypedExprDef
	export type TTry = {_hx_index: 19, e: TypedExpr, catches: {
		expr: TypedExpr, 
		v: TVar
	}[], __enum__: "haxe.macro.TypedExprDef"}
	export const TTry: (e: TypedExpr, catches: {
		expr: TypedExpr, 
		v: TVar
	}[]) => TypedExprDef
	export type TThrow = {_hx_index: 23, e: TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TThrow: (e: TypedExpr) => TypedExprDef
	export type TSwitch = {_hx_index: 18, e: TypedExpr, cases: {
		expr: TypedExpr, 
		values: TypedExpr[]
	}[], edef: null | TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TSwitch: (e: TypedExpr, cases: {
		expr: TypedExpr, 
		values: TypedExpr[]
	}[], edef: null | TypedExpr) => TypedExprDef
	export type TReturn = {_hx_index: 20, e: null | TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TReturn: (e: null | TypedExpr) => TypedExprDef
	export type TParenthesis = {_hx_index: 6, e: TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TParenthesis: (e: TypedExpr) => TypedExprDef
	export type TObjectDecl = {_hx_index: 7, fields: {
		expr: TypedExpr, 
		name: string
	}[], __enum__: "haxe.macro.TypedExprDef"}
	export const TObjectDecl: (fields: {
		expr: TypedExpr, 
		name: string
	}[]) => TypedExprDef
	export type TNew = {_hx_index: 10, c: Ref<ClassType>, params: Type[], el: TypedExpr[], __enum__: "haxe.macro.TypedExprDef"}
	export const TNew: (c: Ref<ClassType>, params: Type[], el: TypedExpr[]) => TypedExprDef
	export type TMeta = {_hx_index: 25, m: MetadataEntry, e1: TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TMeta: (m: MetadataEntry, e1: TypedExpr) => TypedExprDef
	export type TLocal = {_hx_index: 1, v: TVar, __enum__: "haxe.macro.TypedExprDef"}
	export const TLocal: (v: TVar) => TypedExprDef
	export type TIf = {_hx_index: 16, econd: TypedExpr, eif: TypedExpr, eelse: null | TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TIf: (econd: TypedExpr, eif: TypedExpr, eelse: null | TypedExpr) => TypedExprDef
	export type TIdent = {_hx_index: 28, s: string, __enum__: "haxe.macro.TypedExprDef"}
	export const TIdent: (s: string) => TypedExprDef
	export type TFunction = {_hx_index: 12, tfunc: TFunc, __enum__: "haxe.macro.TypedExprDef"}
	export const TFunction: (tfunc: TFunc) => TypedExprDef
	export type TFor = {_hx_index: 15, v: TVar, e1: TypedExpr, e2: TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TFor: (v: TVar, e1: TypedExpr, e2: TypedExpr) => TypedExprDef
	export type TField = {_hx_index: 4, e: TypedExpr, fa: FieldAccess, __enum__: "haxe.macro.TypedExprDef"}
	export const TField: (e: TypedExpr, fa: FieldAccess) => TypedExprDef
	export type TEnumParameter = {_hx_index: 26, e1: TypedExpr, ef: EnumField, index: number, __enum__: "haxe.macro.TypedExprDef"}
	export const TEnumParameter: (e1: TypedExpr, ef: EnumField, index: number) => TypedExprDef
	export type TEnumIndex = {_hx_index: 27, e1: TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TEnumIndex: (e1: TypedExpr) => TypedExprDef
	export type TContinue = {_hx_index: 22, __enum__: "haxe.macro.TypedExprDef"}
	export const TContinue: TContinue
	export type TConst = {_hx_index: 0, c: TConstant, __enum__: "haxe.macro.TypedExprDef"}
	export const TConst: (c: TConstant) => TypedExprDef
	export type TCast = {_hx_index: 24, e: TypedExpr, m: null | ModuleType, __enum__: "haxe.macro.TypedExprDef"}
	export const TCast: (e: TypedExpr, m: null | ModuleType) => TypedExprDef
	export type TCall = {_hx_index: 9, e: TypedExpr, el: TypedExpr[], __enum__: "haxe.macro.TypedExprDef"}
	export const TCall: (e: TypedExpr, el: TypedExpr[]) => TypedExprDef
	export type TBreak = {_hx_index: 21, __enum__: "haxe.macro.TypedExprDef"}
	export const TBreak: TBreak
	export type TBlock = {_hx_index: 14, el: TypedExpr[], __enum__: "haxe.macro.TypedExprDef"}
	export const TBlock: (el: TypedExpr[]) => TypedExprDef
	export type TBinop = {_hx_index: 3, op: Binop, e1: TypedExpr, e2: TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TBinop: (op: Binop, e1: TypedExpr, e2: TypedExpr) => TypedExprDef
	export type TArrayDecl = {_hx_index: 8, el: TypedExpr[], __enum__: "haxe.macro.TypedExprDef"}
	export const TArrayDecl: (el: TypedExpr[]) => TypedExprDef
	export type TArray = {_hx_index: 2, e1: TypedExpr, e2: TypedExpr, __enum__: "haxe.macro.TypedExprDef"}
	export const TArray: (e1: TypedExpr, e2: TypedExpr) => TypedExprDef
}

/**
Represents kind of a node in the typed AST.
*/
export declare type TypedExprDef = 
	/**
	Represents a `while` expression.
	When `normalWhile` is `true` it is `while (...)`.
	When `normalWhile` is `false` it is `do {...} while (...)`.
	*/
	| TypedExprDef.TWhile
	/**
	A variable declaration `var v` or `var v = expr`.
	*/
	| TypedExprDef.TVar
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
	| TypedExprDef.TUnop
	/**
	Reference to a module type `m`.
	*/
	| TypedExprDef.TTypeExpr
	/**
	Represents a `try`-expression with related catches.
	*/
	| TypedExprDef.TTry
	/**
	A `throw e` expression.
	*/
	| TypedExprDef.TThrow
	/**
	Represents a `switch` expression with related cases and an optional
	`default` case if edef != null.
	*/
	| TypedExprDef.TSwitch
	/**
	A `return` or `return e` expression.
	*/
	| TypedExprDef.TReturn
	/**
	Parentheses `(e)`.
	*/
	| TypedExprDef.TParenthesis
	/**
	An object declaration.
	*/
	| TypedExprDef.TObjectDecl
	/**
	A constructor call `new c<params>(el)`.
	*/
	| TypedExprDef.TNew
	/**
	A `@m e1` expression.
	*/
	| TypedExprDef.TMeta
	/**
	Reference to a local variable `v`.
	*/
	| TypedExprDef.TLocal
	/**
	An `if(econd) eif` or `if(econd) eif else eelse` expression.
	*/
	| TypedExprDef.TIf
	/**
	An unknown identifier.
	*/
	| TypedExprDef.TIdent
	/**
	A function declaration.
	*/
	| TypedExprDef.TFunction
	/**
	A `for` expression.
	*/
	| TypedExprDef.TFor
	/**
	Field access on `e` according to `fa`.
	*/
	| TypedExprDef.TField
	/**
	Access to an enum parameter (generated by the pattern matcher).
	*/
	| TypedExprDef.TEnumParameter
	/**
	Access to an enum index (generated by the pattern matcher).
	*/
	| TypedExprDef.TEnumIndex
	/**
	A `continue` expression.
	*/
	| TypedExprDef.TContinue
	/**
	A constant.
	*/
	| TypedExprDef.TConst
	/**
	A `cast e` or `cast (e, m)` expression.
	*/
	| TypedExprDef.TCast
	/**
	A call `e(el)`.
	*/
	| TypedExprDef.TCall
	/**
	A `break` expression.
	*/
	| TypedExprDef.TBreak
	/**
	A block declaration `{el}`.
	*/
	| TypedExprDef.TBlock
	/**
	Binary operator `e1 op e2`.
	*/
	| TypedExprDef.TBinop
	/**
	An array declaration `[el]`.
	*/
	| TypedExprDef.TArrayDecl
	/**
	Array access `e1[e2]`.
	*/
	| TypedExprDef.TArray

/**
Represents a typed AST node.
*/
export type TypedExpr = {
	/**
	The expression kind.
	*/
	expr: TypedExprDef, 
	/**
	The position of the expression.
	*/
	pos: Position, 
	/**
	The type of the expression.
	*/
	t: Type
}
