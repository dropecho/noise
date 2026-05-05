import {Expr, ComplexType, Access, FieldType} from "../../haxe/macro/Expr"

export declare class TypeBuildingMacros {
	protected static isEmpty(expr: Expr): boolean
	protected static makeField(arg: {
		name: string, 
		type: null | ComplexType, 
		value: null | Expr
	}, pos: any, doc: null | string): {
		access: Access[], 
		doc: string, 
		kind: FieldType, 
		meta: any[], 
		name: string, 
		pos: any
	}
}
