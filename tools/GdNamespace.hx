import haxe.macro.Context;
import reflaxe.helpers.BaseTypeHelper;

/**
 * Godot-build-only macro: sets each class's GDScript `class_name` to match its
 * generated *filename* (the package-derived `foo_bar_Baz` form), so the global
 * class names don't collide with Godot built-ins (e.g. `Curve`, `Gradient`) or
 * with other addons.
 *
 * reflaxe.GDScript derives `class_name` from `@:nativeName` when present
 * (otherwise the bare Haxe type name), while the *filename* is always the
 * package-namespaced `globalName` and ignores `@:nativeName`. Stamping
 * `@:nativeName(globalName)` therefore lines the class identifier up with the
 * file on disk (`dropecho.noise.Perlin` -> file `dropecho_Perlin.gd`,
 * `class_name dropecho_Perlin`) without changing any filenames. All cross-class
 * references (`extends`, `X.new(...)`, static access) route through the same
 * name, so they stay coherent.
 *
 * We reuse reflaxe's own `BaseTypeHelper.globalName` so the class name matches
 * the filename byte-for-byte, including its edge cases. Applied via
 * `--macro addGlobalMetadata(...)` in build-godot.hxml, so it never touches the
 * JS / C# builds.
 */
class GdNamespace {
	/**
	 * @return null — fields are left untouched; only class metadata is added.
	 */
	public static function stamp():Array<haxe.macro.Expr.Field> {
		final cls = Context.getLocalClass().get();
		if (!cls.isInterface && !cls.meta.has(":nativeName")) {
			final name = BaseTypeHelper.globalName(cls);
			cls.meta.add(":nativeName", [macro $v{name}], cls.pos);
		}
		return null;
	}
}
