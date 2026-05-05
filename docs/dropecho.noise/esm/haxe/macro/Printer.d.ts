import {Unop, Binop, Constant, TypeParam, TypePath, ComplexType, MetadataEntry, Access, Field, TypeParamDecl, FunctionArg, Function as Function__1, FunctionKind, Var, ObjectField, Expr, TypeDefinition} from "./Expr"

/**
This class provides some utility methods to convert elements from the
macro context to a human-readable String representation.
*/
export declare class Printer {
	constructor(tabString?: null | string)
	protected tabs: string
	protected tabString: string
	printUnop(op: Unop): string
	printBinop(op: Binop): string
	protected escapeString(s: string, delim: string): string
	printFormatString(s: string): string
	printString(s: string): string
	printConstant(c: Constant): string
	printTypeParam(param: TypeParam): string
	printTypePath(tp: TypePath): string
	printComplexType(ct: ComplexType): string
	printMetadata(meta: MetadataEntry): string
	printAccess(access: Access): string
	printField(field: Field): string
	printTypeParamDecl(tpd: TypeParamDecl): string
	printFunctionArg(arg: FunctionArg): string
	printFunction(func: Function__1, kind?: null | FunctionKind): string
	printVar(v: Var): string
	printObjectFieldKey(of: ObjectField): string
	printObjectField(of: ObjectField): string
	printExpr(e: Expr): string
	printExprs(el: Expr[], sep: string): string
	protected printExtension(tpl: TypePath[], fields: Field[]): string
	protected printStructure(fields: Field[]): string
	printTypeDefinition(t: TypeDefinition, printPackage?: boolean): string
	protected printFieldWithDelimiter(f: Field): string
	protected opt<T>(v: T, f: ((arg0: T) => string), prefix?: string): string
	printExprWithPositions(e: Expr): string
}
