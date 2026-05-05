import {Register} from "../../genes/Register.js"

const $global = Register.$global

export const Message = 
Register.global("$hxEnums")["haxe.macro.Message"] = 
{
	__ename__: "haxe.macro.Message",
	
	Info: Object.assign((msg, pos) => ({_hx_index: 0, __enum__: "haxe.macro.Message", "msg": msg, "pos": pos}), {_hx_name: "Info", __params__: ["msg", "pos"]}),
	Warning: Object.assign((msg, pos) => ({_hx_index: 1, __enum__: "haxe.macro.Message", "msg": msg, "pos": pos}), {_hx_name: "Warning", __params__: ["msg", "pos"]})
}
Message.__constructs__ = [Message.Info, Message.Warning]
Message.__empty_constructs__ = []

/**
Context provides an API for macro programming.

It contains common functions that interact with the macro interpreter to
query or set information. Other API functions are available in the tools
classes:

- `haxe.macro.ComplexTypeTools`
- `haxe.macro.ExprTools`
- `haxe.macro.TypeTools`
*/
export const Context = Register.global("$hxClasses")["haxe.macro.Context"] = 
class Context {
	static get __name__() {
		return "haxe.macro.Context"
	}
	get __class__() {
		return Context
	}
}

