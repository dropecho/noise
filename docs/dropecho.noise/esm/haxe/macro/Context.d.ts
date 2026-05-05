import {Position} from "./Expr"

export declare namespace Message {
	export type Warning = {_hx_index: 1, msg: string, pos: Position, __enum__: "haxe.macro.Message"}
	export const Warning: (msg: string, pos: Position) => Message
	export type Info = {_hx_index: 0, msg: string, pos: Position, __enum__: "haxe.macro.Message"}
	export const Info: (msg: string, pos: Position) => Message
}

export declare type Message = 
	| Message.Warning
	| Message.Info

/**
Context provides an API for macro programming.

It contains common functions that interact with the macro interpreter to
query or set information. Other API functions are available in the tools
classes:

- `haxe.macro.ComplexTypeTools`
- `haxe.macro.ExprTools`
- `haxe.macro.TypeTools`
*/
export declare class Context {
}
