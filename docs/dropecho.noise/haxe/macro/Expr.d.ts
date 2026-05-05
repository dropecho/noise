import {Exception} from "../Exception"

/**
Represents a position in a file.
*/
export type Position = {
	/**
	Reference to the filename.
	*/
	file: string, 
	/**
	Position of the last character.
	*/
	max: number, 
	/**
	Position of the first character.
	*/
	min: number
}

export declare namespace StringLiteralKind {
	export type SingleQuotes = {_hx_index: 1, __enum__: "haxe.macro.StringLiteralKind"}
	export const SingleQuotes: SingleQuotes
	export type DoubleQuotes = {_hx_index: 0, __enum__: "haxe.macro.StringLiteralKind"}
	export const DoubleQuotes: DoubleQuotes
}

export declare type StringLiteralKind = 
	| StringLiteralKind.SingleQuotes
	| StringLiteralKind.DoubleQuotes

/**
Represents a constant.
@see https://haxe.org/manual/expression-constants.html
*/
export declare namespace Constant {
	export type CString = {_hx_index: 2, s: string, kind: null | StringLiteralKind, __enum__: "haxe.macro.Constant"}
	export const CString: (s: string, kind: null | StringLiteralKind) => Constant
	export type CRegexp = {_hx_index: 4, r: string, opt: string, __enum__: "haxe.macro.Constant"}
	export const CRegexp: (r: string, opt: string) => Constant
	export type CInt = {_hx_index: 0, v: string, s: null | string, __enum__: "haxe.macro.Constant"}
	export const CInt: (v: string, s: null | string) => Constant
	export type CIdent = {_hx_index: 3, s: string, __enum__: "haxe.macro.Constant"}
	export const CIdent: (s: string) => Constant
	export type CFloat = {_hx_index: 1, f: string, s: null | string, __enum__: "haxe.macro.Constant"}
	export const CFloat: (f: string, s: null | string) => Constant
}

/**
Represents a constant.
@see https://haxe.org/manual/expression-constants.html
*/
export declare type Constant = 
	/**
	Represents a string literal.
	*/
	| Constant.CString
	/**
	Represents a regular expression literal.
	
	Example: `~/haxe/i`
	
	- The first argument `haxe` is a string with regular expression pattern.
	- The second argument `i` is a string with regular expression flags.
	
	@see https://haxe.org/manual/std-regex.html
	*/
	| Constant.CRegexp
	/**
	Represents an integer literal.
	*/
	| Constant.CInt
	/**
	Represents an identifier.
	*/
	| Constant.CIdent
	/**
	Represents a float literal.
	*/
	| Constant.CFloat

/**
A binary operator.
@see https://haxe.org/manual/types-numeric-operators.html
*/
export declare namespace Binop {
	export type OpXor = {_hx_index: 13, __enum__: "haxe.macro.Binop"}
	export const OpXor: OpXor
	export type OpUShr = {_hx_index: 18, __enum__: "haxe.macro.Binop"}
	export const OpUShr: OpUShr
	export type OpSub = {_hx_index: 3, __enum__: "haxe.macro.Binop"}
	export const OpSub: OpSub
	export type OpShr = {_hx_index: 17, __enum__: "haxe.macro.Binop"}
	export const OpShr: OpShr
	export type OpShl = {_hx_index: 16, __enum__: "haxe.macro.Binop"}
	export const OpShl: OpShl
	export type OpOr = {_hx_index: 12, __enum__: "haxe.macro.Binop"}
	export const OpOr: OpOr
	export type OpNullCoal = {_hx_index: 24, __enum__: "haxe.macro.Binop"}
	export const OpNullCoal: OpNullCoal
	export type OpNotEq = {_hx_index: 6, __enum__: "haxe.macro.Binop"}
	export const OpNotEq: OpNotEq
	export type OpMult = {_hx_index: 1, __enum__: "haxe.macro.Binop"}
	export const OpMult: OpMult
	export type OpMod = {_hx_index: 19, __enum__: "haxe.macro.Binop"}
	export const OpMod: OpMod
	export type OpLte = {_hx_index: 10, __enum__: "haxe.macro.Binop"}
	export const OpLte: OpLte
	export type OpLt = {_hx_index: 9, __enum__: "haxe.macro.Binop"}
	export const OpLt: OpLt
	export type OpInterval = {_hx_index: 21, __enum__: "haxe.macro.Binop"}
	export const OpInterval: OpInterval
	export type OpIn = {_hx_index: 23, __enum__: "haxe.macro.Binop"}
	export const OpIn: OpIn
	export type OpGte = {_hx_index: 8, __enum__: "haxe.macro.Binop"}
	export const OpGte: OpGte
	export type OpGt = {_hx_index: 7, __enum__: "haxe.macro.Binop"}
	export const OpGt: OpGt
	export type OpEq = {_hx_index: 5, __enum__: "haxe.macro.Binop"}
	export const OpEq: OpEq
	export type OpDiv = {_hx_index: 2, __enum__: "haxe.macro.Binop"}
	export const OpDiv: OpDiv
	export type OpBoolOr = {_hx_index: 15, __enum__: "haxe.macro.Binop"}
	export const OpBoolOr: OpBoolOr
	export type OpBoolAnd = {_hx_index: 14, __enum__: "haxe.macro.Binop"}
	export const OpBoolAnd: OpBoolAnd
	export type OpAssignOp = {_hx_index: 20, op: Binop, __enum__: "haxe.macro.Binop"}
	export const OpAssignOp: (op: Binop) => Binop
	export type OpAssign = {_hx_index: 4, __enum__: "haxe.macro.Binop"}
	export const OpAssign: OpAssign
	export type OpArrow = {_hx_index: 22, __enum__: "haxe.macro.Binop"}
	export const OpArrow: OpArrow
	export type OpAnd = {_hx_index: 11, __enum__: "haxe.macro.Binop"}
	export const OpAnd: OpAnd
	export type OpAdd = {_hx_index: 0, __enum__: "haxe.macro.Binop"}
	export const OpAdd: OpAdd
}

/**
A binary operator.
@see https://haxe.org/manual/types-numeric-operators.html
*/
export declare type Binop = 
	/**
	`^`
	*/
	| Binop.OpXor
	/**
	`>>>`
	*/
	| Binop.OpUShr
	/**
	`-`
	*/
	| Binop.OpSub
	/**
	`>>`
	*/
	| Binop.OpShr
	/**
	`<<`
	*/
	| Binop.OpShl
	/**
	`|`
	*/
	| Binop.OpOr
	/**
	`??`
	*/
	| Binop.OpNullCoal
	/**
	`!=`
	*/
	| Binop.OpNotEq
	/**
	`*`
	*/
	| Binop.OpMult
	/**
	`%`
	*/
	| Binop.OpMod
	/**
	`<=`
	*/
	| Binop.OpLte
	/**
	`<`
	*/
	| Binop.OpLt
	/**
	`...`
	*/
	| Binop.OpInterval
	/**
	`in`
	*/
	| Binop.OpIn
	/**
	`>=`
	*/
	| Binop.OpGte
	/**
	`>`
	*/
	| Binop.OpGt
	/**
	`==`
	*/
	| Binop.OpEq
	/**
	`/`
	*/
	| Binop.OpDiv
	/**
	`||`
	*/
	| Binop.OpBoolOr
	/**
	`&&`
	*/
	| Binop.OpBoolAnd
	/**
	`+=` `-=` `/=` `*=` `<<=` `>>=` `>>>=` `|=` `&=` `^=` `%=`
	*/
	| Binop.OpAssignOp
	/**
	`=`
	*/
	| Binop.OpAssign
	/**
	`=>`
	*/
	| Binop.OpArrow
	/**
	`&`
	*/
	| Binop.OpAnd
	/**
	`+`
	*/
	| Binop.OpAdd

/**
A unary operator.
@see https://haxe.org/manual/types-numeric-operators.html
*/
export declare namespace Unop {
	export type OpSpread = {_hx_index: 5, __enum__: "haxe.macro.Unop"}
	export const OpSpread: OpSpread
	export type OpNot = {_hx_index: 2, __enum__: "haxe.macro.Unop"}
	export const OpNot: OpNot
	export type OpNegBits = {_hx_index: 4, __enum__: "haxe.macro.Unop"}
	export const OpNegBits: OpNegBits
	export type OpNeg = {_hx_index: 3, __enum__: "haxe.macro.Unop"}
	export const OpNeg: OpNeg
	export type OpIncrement = {_hx_index: 0, __enum__: "haxe.macro.Unop"}
	export const OpIncrement: OpIncrement
	export type OpDecrement = {_hx_index: 1, __enum__: "haxe.macro.Unop"}
	export const OpDecrement: OpDecrement
}

/**
A unary operator.
@see https://haxe.org/manual/types-numeric-operators.html
*/
export declare type Unop = 
	/**
	`...`
	*/
	| Unop.OpSpread
	/**
	`!`
	*/
	| Unop.OpNot
	/**
	`~`
	*/
	| Unop.OpNegBits
	/**
	`-`
	*/
	| Unop.OpNeg
	/**
	`++`
	*/
	| Unop.OpIncrement
	/**
	`--`
	*/
	| Unop.OpDecrement

export declare namespace EFieldKind {
	export type Safe = {_hx_index: 1, __enum__: "haxe.macro.EFieldKind"}
	export const Safe: Safe
	export type Normal = {_hx_index: 0, __enum__: "haxe.macro.EFieldKind"}
	export const Normal: Normal
}

export declare type EFieldKind = 
	| EFieldKind.Safe
	| EFieldKind.Normal

/**
Represents a node in the AST.
@see https://haxe.org/manual/macro-reification-expression.html
*/
export type Expr = {
	/**
	The expression kind.
	*/
	expr: ExprDef, 
	/**
	The position of the expression.
	*/
	pos: Position
}

/**
Represents a AST node identical to `Expr`, but it allows constraining the
type of accepted expressions.
@see https://haxe.org/manual/macro-ExprOf.html
*/
export type ExprOf<T> = Expr

/**
Represents a switch case.
@see https://haxe.org/manual/expression-switch.html
*/
export type Case = {
	/**
	The expression of the case, if available.
	*/
	expr?: null | Expr, 
	/**
	The optional guard expressions of the case, if available.
	*/
	guard?: null | Expr, 
	/**
	The value expressions of the case.
	*/
	values: Expr[]
}

/**
Represents a variable in the AST.
@see https://haxe.org/manual/expression-var.html
*/
export type Var = {
	/**
	The expression of the variable, if available.
	*/
	expr?: null | Expr, 
	/**
	Whether or not the variable can be assigned to.
	*/
	isFinal?: null | boolean, 
	/**
	Whether or not the variable is static.
	*/
	isStatic?: null | boolean, 
	/**
	Metadata associatied with the variable, if available.
	*/
	meta?: null | MetadataEntry[], 
	/**
	The name of the variable.
	*/
	name: string, 
	/**
	The position of the variable name.
	*/
	namePos?: any, 
	/**
	The type-hint of the variable, if available.
	*/
	type?: null | ComplexType
}

/**
Represents a catch in the AST.
@see https://haxe.org/manual/expression-try-catch.html
*/
export type Catch = {
	/**
	The expression of the catch.
	*/
	expr: Expr, 
	/**
	The name of the catch variable.
	*/
	name: string, 
	/**
	The type of the catch.
	*/
	type?: null | ComplexType
}

/**
Represents the way something is quoted.
*/
export declare namespace QuoteStatus {
	export type Unquoted = {_hx_index: 0, __enum__: "haxe.macro.QuoteStatus"}
	export const Unquoted: Unquoted
	export type Quoted = {_hx_index: 1, __enum__: "haxe.macro.QuoteStatus"}
	export const Quoted: Quoted
}

/**
Represents the way something is quoted.
*/
export declare type QuoteStatus = 
	/**
	No quotes
	*/
	| QuoteStatus.Unquoted
	/**
	Double quotes `"`
	*/
	| QuoteStatus.Quoted

/**
Represents the field of an object declaration.
*/
export type ObjectField = {
	/**
	The field expression.
	*/
	expr: Expr, 
	/**
	The name of the field.
	*/
	field: string, 
	/**
	How the field name is quoted.
	*/
	quotes?: null | QuoteStatus
}

/**
Represents function kind in the AST
*/
export declare namespace FunctionKind {
	export type FNamed = {_hx_index: 1, name: string, inlined: null | boolean, __enum__: "haxe.macro.FunctionKind"}
	export const FNamed: (name: string, inlined: null | boolean) => FunctionKind
	export type FArrow = {_hx_index: 2, __enum__: "haxe.macro.FunctionKind"}
	export const FArrow: FArrow
	export type FAnonymous = {_hx_index: 0, __enum__: "haxe.macro.FunctionKind"}
	export const FAnonymous: FAnonymous
}

/**
Represents function kind in the AST
*/
export declare type FunctionKind = 
	/**
	Named function
	*/
	| FunctionKind.FNamed
	/**
	Arrow function
	*/
	| FunctionKind.FArrow
	/**
	Anonymous function
	*/
	| FunctionKind.FAnonymous

/**
Represents the kind of a node in the AST.
*/
export declare namespace ExprDef {
	export type EWhile = {_hx_index: 15, econd: Expr, e: Expr, normalWhile: boolean, __enum__: "haxe.macro.ExprDef"}
	export const EWhile: (econd: Expr, e: Expr, normalWhile: boolean) => ExprDef
	export type EVars = {_hx_index: 10, vars: Var[], __enum__: "haxe.macro.ExprDef"}
	export const EVars: (vars: Var[]) => ExprDef
	export type EUntyped = {_hx_index: 21, e: Expr, __enum__: "haxe.macro.ExprDef"}
	export const EUntyped: (e: Expr) => ExprDef
	export type EUnop = {_hx_index: 9, op: Unop, postFix: boolean, e: Expr, __enum__: "haxe.macro.ExprDef"}
	export const EUnop: (op: Unop, postFix: boolean, e: Expr) => ExprDef
	export type ETry = {_hx_index: 17, e: Expr, catches: Catch[], __enum__: "haxe.macro.ExprDef"}
	export const ETry: (e: Expr, catches: Catch[]) => ExprDef
	export type EThrow = {_hx_index: 22, e: Expr, __enum__: "haxe.macro.ExprDef"}
	export const EThrow: (e: Expr) => ExprDef
	export type ETernary = {_hx_index: 25, econd: Expr, eif: Expr, eelse: Expr, __enum__: "haxe.macro.ExprDef"}
	export const ETernary: (econd: Expr, eif: Expr, eelse: Expr) => ExprDef
	export type ESwitch = {_hx_index: 16, e: Expr, cases: Case[], edef: null | Expr, __enum__: "haxe.macro.ExprDef"}
	export const ESwitch: (e: Expr, cases: Case[], edef: null | Expr) => ExprDef
	export type EReturn = {_hx_index: 18, e: null | Expr, __enum__: "haxe.macro.ExprDef"}
	export const EReturn: (e: null | Expr) => ExprDef
	export type EParenthesis = {_hx_index: 4, e: Expr, __enum__: "haxe.macro.ExprDef"}
	export const EParenthesis: (e: Expr) => ExprDef
	export type EObjectDecl = {_hx_index: 5, fields: ObjectField[], __enum__: "haxe.macro.ExprDef"}
	export const EObjectDecl: (fields: ObjectField[]) => ExprDef
	export type ENew = {_hx_index: 8, t: TypePath, params: Expr[], __enum__: "haxe.macro.ExprDef"}
	export const ENew: (t: TypePath, params: Expr[]) => ExprDef
	export type EMeta = {_hx_index: 27, s: MetadataEntry, e: Expr, __enum__: "haxe.macro.ExprDef"}
	export const EMeta: (s: MetadataEntry, e: Expr) => ExprDef
	export type EIs = {_hx_index: 28, e: Expr, t: ComplexType, __enum__: "haxe.macro.ExprDef"}
	export const EIs: (e: Expr, t: ComplexType) => ExprDef
	export type EIf = {_hx_index: 14, econd: Expr, eif: Expr, eelse: null | Expr, __enum__: "haxe.macro.ExprDef"}
	export const EIf: (econd: Expr, eif: Expr, eelse: null | Expr) => ExprDef
	export type EFunction = {_hx_index: 11, kind: null | FunctionKind, f: Function, __enum__: "haxe.macro.ExprDef"}
	export const EFunction: (kind: null | FunctionKind, f: Function) => ExprDef
	export type EFor = {_hx_index: 13, it: Expr, expr: Expr, __enum__: "haxe.macro.ExprDef"}
	export const EFor: (it: Expr, expr: Expr) => ExprDef
	export type EField = {_hx_index: 3, e: Expr, field: string, kind: null | EFieldKind, __enum__: "haxe.macro.ExprDef"}
	export const EField: (e: Expr, field: string, kind: null | EFieldKind) => ExprDef
	export type EDisplay = {_hx_index: 24, e: Expr, displayKind: DisplayKind, __enum__: "haxe.macro.ExprDef"}
	export const EDisplay: (e: Expr, displayKind: DisplayKind) => ExprDef
	export type EContinue = {_hx_index: 20, __enum__: "haxe.macro.ExprDef"}
	export const EContinue: EContinue
	export type EConst = {_hx_index: 0, c: Constant, __enum__: "haxe.macro.ExprDef"}
	export const EConst: (c: Constant) => ExprDef
	export type ECheckType = {_hx_index: 26, e: Expr, t: ComplexType, __enum__: "haxe.macro.ExprDef"}
	export const ECheckType: (e: Expr, t: ComplexType) => ExprDef
	export type ECast = {_hx_index: 23, e: Expr, t: null | ComplexType, __enum__: "haxe.macro.ExprDef"}
	export const ECast: (e: Expr, t: null | ComplexType) => ExprDef
	export type ECall = {_hx_index: 7, e: Expr, params: Expr[], __enum__: "haxe.macro.ExprDef"}
	export const ECall: (e: Expr, params: Expr[]) => ExprDef
	export type EBreak = {_hx_index: 19, __enum__: "haxe.macro.ExprDef"}
	export const EBreak: EBreak
	export type EBlock = {_hx_index: 12, exprs: Expr[], __enum__: "haxe.macro.ExprDef"}
	export const EBlock: (exprs: Expr[]) => ExprDef
	export type EBinop = {_hx_index: 2, op: Binop, e1: Expr, e2: Expr, __enum__: "haxe.macro.ExprDef"}
	export const EBinop: (op: Binop, e1: Expr, e2: Expr) => ExprDef
	export type EArrayDecl = {_hx_index: 6, values: Expr[], __enum__: "haxe.macro.ExprDef"}
	export const EArrayDecl: (values: Expr[]) => ExprDef
	export type EArray = {_hx_index: 1, e1: Expr, e2: Expr, __enum__: "haxe.macro.ExprDef"}
	export const EArray: (e1: Expr, e2: Expr) => ExprDef
}

/**
Represents the kind of a node in the AST.
*/
export declare type ExprDef = 
	/**
	Represents a `while` expression.
	
	When `normalWhile` is `true` it is `while (...)`.
	
	When `normalWhile` is `false` it is `do {...} while (...)`.
	*/
	| ExprDef.EWhile
	/**
	Variable declarations.
	*/
	| ExprDef.EVars
	/**
	An `untyped e` source code.
	*/
	| ExprDef.EUntyped
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
	| ExprDef.EUnop
	/**
	Represents a `try`-expression with related catches.
	*/
	| ExprDef.ETry
	/**
	A `throw e` expression.
	*/
	| ExprDef.EThrow
	/**
	A `(econd) ? eif : eelse` expression.
	*/
	| ExprDef.ETernary
	/**
	Represents a `switch` expression with related cases and an optional.
	`default` case if `edef != null`.
	*/
	| ExprDef.ESwitch
	/**
	A `return` or `return e` expression.
	*/
	| ExprDef.EReturn
	/**
	Parentheses `(e)`.
	*/
	| ExprDef.EParenthesis
	/**
	An object declaration.
	*/
	| ExprDef.EObjectDecl
	/**
	A constructor call `new t(params)`.
	*/
	| ExprDef.ENew
	/**
	A `@m e` expression.
	*/
	| ExprDef.EMeta
	/**
	An `expr is Type` expression.
	*/
	| ExprDef.EIs
	/**
	An `if (econd) eif` or `if (econd) eif else eelse` expression.
	*/
	| ExprDef.EIf
	/**
	A function declaration.
	*/
	| ExprDef.EFunction
	/**
	A `for` expression.
	*/
	| ExprDef.EFor
	/**
	Field access on `e.field`.
	
	If `kind` is null, it is equal to Normal.
	*/
	| ExprDef.EField
	/**
	Used internally to provide completion.
	*/
	| ExprDef.EDisplay
	/**
	A `continue` expression.
	*/
	| ExprDef.EContinue
	/**
	A constant.
	*/
	| ExprDef.EConst
	/**
	A `(e:t)` expression.
	*/
	| ExprDef.ECheckType
	/**
	A `cast e` or `cast (e, m)` expression.
	*/
	| ExprDef.ECast
	/**
	A call `e(params)`.
	*/
	| ExprDef.ECall
	/**
	A `break` expression.
	*/
	| ExprDef.EBreak
	/**
	A block of expressions `{exprs}`.
	*/
	| ExprDef.EBlock
	/**
	Binary operator `e1 op e2`.
	*/
	| ExprDef.EBinop
	/**
	An array declaration `[el]`.
	*/
	| ExprDef.EArrayDecl
	/**
	Array access `e1[e2]`.
	*/
	| ExprDef.EArray

export declare namespace DisplayKind {
	export type DKStructure = {_hx_index: 2, __enum__: "haxe.macro.DisplayKind"}
	export const DKStructure: DKStructure
	export type DKPattern = {_hx_index: 4, outermost: boolean, __enum__: "haxe.macro.DisplayKind"}
	export const DKPattern: (outermost: boolean) => DisplayKind
	export type DKMarked = {_hx_index: 3, __enum__: "haxe.macro.DisplayKind"}
	export const DKMarked: DKMarked
	export type DKDot = {_hx_index: 1, __enum__: "haxe.macro.DisplayKind"}
	export const DKDot: DKDot
	export type DKCall = {_hx_index: 0, __enum__: "haxe.macro.DisplayKind"}
	export const DKCall: DKCall
}

export declare type DisplayKind = 
	| DisplayKind.DKStructure
	| DisplayKind.DKPattern
	| DisplayKind.DKMarked
	| DisplayKind.DKDot
	| DisplayKind.DKCall

/**
Represents a type syntax in the AST.
*/
export declare namespace ComplexType {
	export type TPath = {_hx_index: 0, p: TypePath, __enum__: "haxe.macro.ComplexType"}
	export const TPath: (p: TypePath) => ComplexType
	export type TParent = {_hx_index: 3, t: ComplexType, __enum__: "haxe.macro.ComplexType"}
	export const TParent: (t: ComplexType) => ComplexType
	export type TOptional = {_hx_index: 5, t: ComplexType, __enum__: "haxe.macro.ComplexType"}
	export const TOptional: (t: ComplexType) => ComplexType
	export type TNamed = {_hx_index: 6, n: string, t: ComplexType, __enum__: "haxe.macro.ComplexType"}
	export const TNamed: (n: string, t: ComplexType) => ComplexType
	export type TIntersection = {_hx_index: 7, tl: ComplexType[], __enum__: "haxe.macro.ComplexType"}
	export const TIntersection: (tl: ComplexType[]) => ComplexType
	export type TFunction = {_hx_index: 1, args: ComplexType[], ret: ComplexType, __enum__: "haxe.macro.ComplexType"}
	export const TFunction: (args: ComplexType[], ret: ComplexType) => ComplexType
	export type TExtend = {_hx_index: 4, p: TypePath[], fields: Field[], __enum__: "haxe.macro.ComplexType"}
	export const TExtend: (p: TypePath[], fields: Field[]) => ComplexType
	export type TAnonymous = {_hx_index: 2, fields: Field[], __enum__: "haxe.macro.ComplexType"}
	export const TAnonymous: (fields: Field[]) => ComplexType
}

/**
Represents a type syntax in the AST.
*/
export declare type ComplexType = 
	/**
	Represents the type path.
	*/
	| ComplexType.TPath
	/**
	Represents parentheses around a type, e.g. the `(Int -> Void)` part in
	`(Int -> Void) -> String`.
	*/
	| ComplexType.TParent
	/**
	Represents an optional type.
	*/
	| ComplexType.TOptional
	/**
	Represents a type with a name.
	*/
	| ComplexType.TNamed
	/**
	Represents an intersection type `T1 & T2 & ... & TN`.
	*/
	| ComplexType.TIntersection
	/**
	Represents a function type.
	@see https://haxe.org/manual/types-function.html
	*/
	| ComplexType.TFunction
	/**
	Represents typedef extensions `> Iterable<T>`.
	The array `p` holds the type paths to the given types.
	@see https://haxe.org/manual/type-system-extensions.html
	*/
	| ComplexType.TExtend
	/**
	Represents an anonymous structure type.
	@see https://haxe.org/manual/types-anonymous-structure.html
	*/
	| ComplexType.TAnonymous

/**
Represents a type path in the AST.
*/
export type TypePath = {
	/**
	The name of the type path.
	*/
	name: string, 
	/**
	Represents the package of the type path.
	*/
	pack: string[], 
	/**
	Optional parameters of the type path.
	*/
	params?: null | TypeParam[], 
	/**
	Sub is set on module sub-type access:
	`pack.Module.Type` has `name = "Module"`, `sub = "Type"`, if available.
	*/
	sub?: null | string
}

/**
Represents a concrete type parameter in the AST.

Haxe allows expressions in concrete type parameters, e.g.
`new YourType<["hello", "world"]>`. In that case the value is `TPExpr` while
in the normal case it's `TPType`.
*/
export declare namespace TypeParam {
	export type TPType = {_hx_index: 0, t: ComplexType, __enum__: "haxe.macro.TypeParam"}
	export const TPType: (t: ComplexType) => TypeParam
	export type TPExpr = {_hx_index: 1, e: Expr, __enum__: "haxe.macro.TypeParam"}
	export const TPExpr: (e: Expr) => TypeParam
}

/**
Represents a concrete type parameter in the AST.

Haxe allows expressions in concrete type parameters, e.g.
`new YourType<["hello", "world"]>`. In that case the value is `TPExpr` while
in the normal case it's `TPType`.
*/
export declare type TypeParam = 
	| TypeParam.TPType
	| TypeParam.TPExpr

/**
Represents a type parameter declaration in the AST.
*/
export type TypeParamDecl = {
	/**
	The optional constraints of the type parameter.
	*/
	constraints?: null | ComplexType[], 
	/**
	The optional default type of the type parameter.
	*/
	defaultType?: null | ComplexType, 
	/**
	The metadata of the type parameter.
	*/
	meta?: null | MetadataEntry[], 
	/**
	The name of the type parameter.
	*/
	name: string, 
	/**
	The optional parameters of the type parameter.
	*/
	params?: null | TypeParamDecl[]
}

/**
Represents a function in the AST.
*/
export type Function = {
	/**
	A list of function arguments.
	*/
	args: FunctionArg[], 
	/**
	The expression of the function body, if available.
	*/
	expr?: null | Expr, 
	/**
	An optional list of function parameter type declarations.
	*/
	params?: null | TypeParamDecl[], 
	/**
	The return type-hint of the function, if available.
	*/
	ret?: null | ComplexType
}

/**
Represents a function argument in the AST.
*/
export type FunctionArg = {
	/**
	The metadata of the function argument.
	*/
	meta?: null | MetadataEntry[], 
	/**
	The name of the function argument.
	*/
	name: string, 
	/**
	Whether or not the function argument is optional.
	*/
	opt?: null | boolean, 
	/**
	The type-hint of the function argument, if available.
	*/
	type?: null | ComplexType, 
	/**
	The optional value of the function argument, if available.
	*/
	value?: null | Expr
}

/**
Represents a metadata entry in the AST.
*/
export type MetadataEntry = {
	/**
	The name of the metadata entry.
	*/
	name: string, 
	/**
	The optional parameters of the metadata entry.
	*/
	params?: null | Expr[], 
	/**
	The position of the metadata entry.
	*/
	pos: Position
}

/**
Represents metadata in the AST.
*/
export type Metadata = MetadataEntry[]

/**
Represents a field in the AST.
*/
export type Field = {
	/**
	The access modifiers of the field. By default fields have private access.
	@see https://haxe.org/manual/class-field-access-modifier.html
	*/
	access?: null | Access[], 
	/**
	The documentation of the field, if available. If the field has no
	documentation, the value is `null`.
	*/
	doc?: null | string, 
	/**
	The kind of the field.
	*/
	kind: FieldType, 
	/**
	The optional metadata of the field.
	*/
	meta?: null | MetadataEntry[], 
	/**
	The name of the field.
	*/
	name: string, 
	/**
	The position of the field.
	*/
	pos: Position
}

/**
Represents an access modifier.
@see https://haxe.org/manual/class-field-access-modifier.html
*/
export declare namespace Access {
	export type AStatic = {_hx_index: 2, __enum__: "haxe.macro.Access"}
	export const AStatic: AStatic
	export type APublic = {_hx_index: 0, __enum__: "haxe.macro.Access"}
	export const APublic: APublic
	export type APrivate = {_hx_index: 1, __enum__: "haxe.macro.Access"}
	export const APrivate: APrivate
	export type AOverride = {_hx_index: 3, __enum__: "haxe.macro.Access"}
	export const AOverride: AOverride
	export type AOverload = {_hx_index: 10, __enum__: "haxe.macro.Access"}
	export const AOverload: AOverload
	export type AMacro = {_hx_index: 6, __enum__: "haxe.macro.Access"}
	export const AMacro: AMacro
	export type AInline = {_hx_index: 5, __enum__: "haxe.macro.Access"}
	export const AInline: AInline
	export type AFinal = {_hx_index: 7, __enum__: "haxe.macro.Access"}
	export const AFinal: AFinal
	export type AExtern = {_hx_index: 8, __enum__: "haxe.macro.Access"}
	export const AExtern: AExtern
	export type ADynamic = {_hx_index: 4, __enum__: "haxe.macro.Access"}
	export const ADynamic: ADynamic
	export type AAbstract = {_hx_index: 9, __enum__: "haxe.macro.Access"}
	export const AAbstract: AAbstract
}

/**
Represents an access modifier.
@see https://haxe.org/manual/class-field-access-modifier.html
*/
export declare type Access = 
	/**
	Static access modifier.
	*/
	| Access.AStatic
	/**
	Public access modifier, grants access from anywhere.
	@see https://haxe.org/manual/class-field-visibility.html
	*/
	| Access.APublic
	/**
	Private access modifier, grants access to class and its sub-classes
	only.
	@see https://haxe.org/manual/class-field-visibility.html
	*/
	| Access.APrivate
	/**
	Override access modifier.
	@see https://haxe.org/manual/class-field-override.html
	*/
	| Access.AOverride
	/**
	Overload access modifier.
	*/
	| Access.AOverload
	/**
	Macro access modifier. Allows expression macro functions. These are
	normal functions which are executed as soon as they are typed.
	*/
	| Access.AMacro
	/**
	Inline access modifier. Allows expressions to be directly inserted in
	place of calls to them.
	@see https://haxe.org/manual/class-field-inline.html
	*/
	| Access.AInline
	/**
	Final access modifier. For functions, they can not be overridden. For
	variables, it means they can be assigned to only once.
	*/
	| Access.AFinal
	/**
	Extern access modifier.
	*/
	| Access.AExtern
	/**
	Dynamic (re-)bindable access modifier.
	@see https://haxe.org/manual/class-field-dynamic.html
	*/
	| Access.ADynamic
	/**
	Abstract access modifier.
	*/
	| Access.AAbstract

/**
Represents the field type in the AST.
*/
export declare namespace FieldType {
	export type FVar = {_hx_index: 0, t: null | ComplexType, e: null | Expr, __enum__: "haxe.macro.FieldType"}
	export const FVar: (t: null | ComplexType, e: null | Expr) => FieldType
	export type FProp = {_hx_index: 2, get: string, set: string, t: null | ComplexType, e: null | Expr, __enum__: "haxe.macro.FieldType"}
	export const FProp: (get: string, set: string, t: null | ComplexType, e: null | Expr) => FieldType
	export type FFun = {_hx_index: 1, f: Function, __enum__: "haxe.macro.FieldType"}
	export const FFun: (f: Function) => FieldType
}

/**
Represents the field type in the AST.
*/
export declare type FieldType = 
	/**
	Represents a variable field type.
	*/
	| FieldType.FVar
	/**
	Represents a property with getter and setter field type.
	*/
	| FieldType.FProp
	/**
	Represents a function field type.
	*/
	| FieldType.FFun

/**
Represents a type definition.
*/
export type TypeDefinition = {
	/**
	The documentation of the type, if available. If the type has no
	documentation, the value is `null`.
	*/
	doc?: null | string, 
	/**
	The fields of the type definition.
	*/
	fields: Field[], 
	/**
	Whether or not the type is extern.
	*/
	isExtern?: null | boolean, 
	/**
	The kind of the type definition.
	*/
	kind: TypeDefKind, 
	/**
	The optional metadata of the type definition.
	*/
	meta?: null | MetadataEntry[], 
	/**
	The name of the type definition.
	*/
	name: string, 
	/**
	The package of the type definition.
	*/
	pack: string[], 
	/**
	The parameter type declarations of the type definition.
	*/
	params?: null | TypeParamDecl[], 
	/**
	The position to the type definition.
	*/
	pos: Position
}

/**
Represents a type definition kind.
*/
export declare namespace TypeDefKind {
	export type TDStructure = {_hx_index: 1, __enum__: "haxe.macro.TypeDefKind"}
	export const TDStructure: TDStructure
	export type TDField = {_hx_index: 5, kind: FieldType, access: null | Access[], __enum__: "haxe.macro.TypeDefKind"}
	export const TDField: (kind: FieldType, access: null | Access[]) => TypeDefKind
	export type TDEnum = {_hx_index: 0, __enum__: "haxe.macro.TypeDefKind"}
	export const TDEnum: TDEnum
	export type TDClass = {_hx_index: 2, superClass: null | TypePath, interfaces: null | TypePath[], isInterface: null | boolean, isFinal: null | boolean, isAbstract: null | boolean, __enum__: "haxe.macro.TypeDefKind"}
	export const TDClass: (superClass: null | TypePath, interfaces: null | TypePath[], isInterface: null | boolean, isFinal: null | boolean, isAbstract: null | boolean) => TypeDefKind
	export type TDAlias = {_hx_index: 3, t: ComplexType, __enum__: "haxe.macro.TypeDefKind"}
	export const TDAlias: (t: ComplexType) => TypeDefKind
	export type TDAbstract = {_hx_index: 4, tthis: null | ComplexType, flags: null | AbstractFlag[], from: null | ComplexType[], to: null | ComplexType[], __enum__: "haxe.macro.TypeDefKind"}
	export const TDAbstract: (tthis: null | ComplexType, flags: null | AbstractFlag[], from: null | ComplexType[], to: null | ComplexType[]) => TypeDefKind
}

/**
Represents a type definition kind.
*/
export declare type TypeDefKind = 
	/**
	Represents a structure kind.
	*/
	| TypeDefKind.TDStructure
	/**
	Represents a module-level field.
	*/
	| TypeDefKind.TDField
	/**
	Represents an enum kind.
	*/
	| TypeDefKind.TDEnum
	/**
	Represents a class kind.
	*/
	| TypeDefKind.TDClass
	/**
	Represents an alias/typedef kind.
	*/
	| TypeDefKind.TDAlias
	/**
	Represents an abstract kind.
	*/
	| TypeDefKind.TDAbstract

/**
Represents an abstract flag.
*/
export declare namespace AbstractFlag {
	export type AbTo = {_hx_index: 2, ct: ComplexType, __enum__: "haxe.macro.AbstractFlag"}
	export const AbTo: (ct: ComplexType) => AbstractFlag
	export type AbFrom = {_hx_index: 1, ct: ComplexType, __enum__: "haxe.macro.AbstractFlag"}
	export const AbFrom: (ct: ComplexType) => AbstractFlag
	export type AbEnum = {_hx_index: 0, __enum__: "haxe.macro.AbstractFlag"}
	export const AbEnum: AbEnum
}

/**
Represents an abstract flag.
*/
export declare type AbstractFlag = 
	/**
	Indicates that this abstract can be assigned to `ct`.
	This flag can be added several times to add multiple "to" types.
	*/
	| AbstractFlag.AbTo
	/**
	Indicates that this abstract can be assigned from `ct`.
	This flag can be added several times to add multiple "from" types.
	*/
	| AbstractFlag.AbFrom
	/**
	Indicates that this abstract is an `enum abstract`
	*/
	| AbstractFlag.AbEnum

/**
This error can be used to handle or produce compilation errors in macros.
*/
export declare class Error extends Exception {
	constructor(message: string, pos: Position, previous?: null | Exception)
	
	/**
	The position of the error.
	*/
	pos: Position
	
	/**
	Child error messages, if any.
	*/
	protected childErrors: Error[]
}

/**
Represents the import mode.
@see https://haxe.org/manual/type-system-import.html
*/
export declare namespace ImportMode {
	export type INormal = {_hx_index: 0, __enum__: "haxe.macro.ImportMode"}
	export const INormal: INormal
	export type IAsName = {_hx_index: 1, alias: string, __enum__: "haxe.macro.ImportMode"}
	export const IAsName: (alias: string) => ImportMode
	export type IAll = {_hx_index: 2, __enum__: "haxe.macro.ImportMode"}
	export const IAll: IAll
}

/**
Represents the import mode.
@see https://haxe.org/manual/type-system-import.html
*/
export declare type ImportMode = 
	/**
	Represents a default import `import c`.
	*/
	| ImportMode.INormal
	/**
	Represents the alias import `import c as alias`.
	*/
	| ImportMode.IAsName
	/**
	Represents the wildcard import `import *`.
	*/
	| ImportMode.IAll

/**
Represents the import expression.
*/
export type ImportExpr = {
	/**
	The mode of the import expression.
	*/
	mode: ImportMode, 
	/**
	The path to the import expression.
	*/
	path: {
		name: string, 
		pos: Position
	}[]
}
