import {Expr} from "./Expr"

/**
This class provides some utility methods to work with expressions. It is
best used through 'using haxe.macro.ExprTools' syntax and then provides
additional methods on haxe.macro.Expr instances.

While mainly intended to be used in macros, it works in non-macro code as
well.
*/
export declare class ExprTools {
	
	/**
	Converts expression `e` to a human-readable String representation.
	
	The result is guaranteed to be valid Haxe code, but there may be
	differences from the original lexical syntax.
	*/
	static toString(e: Expr): string
	
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
	static iter(e: Expr, f: ((arg0: Expr) => void)): void
	
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
	static map(e: Expr, f: ((arg0: Expr) => Expr)): Expr
	
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
	static getValue(e: Expr): any
	protected static opt(e: null | Expr, f: ((arg0: Expr) => Expr)): Expr
	protected static opt2(e: null | Expr, f: ((arg0: Expr) => void)): void
}

/**
This class provides functions on expression arrays for convenience. For a
detailed reference on each method, see the documentation of ExprTools.
*/
export declare class ExprArrayTools {
	static map(el: Expr[], f: ((arg0: Expr) => Expr)): Expr[]
	static iter(el: Expr[], f: ((arg0: Expr) => void)): void
}
