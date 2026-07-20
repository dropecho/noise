# Upstream issues — reflaxe.GDScript

Blockers found while porting **dropecho.noise** to a Godot GDScript addon via
[reflaxe.GDScript](https://github.com/SomeRanDev/reflaxe.GDScript). Each issue
below has a **dependency-free** minimal repro (only `-lib gdscript`) that was
verified to reproduce. File issue 1 against
[`SomeRanDev/reflaxe`](https://github.com/SomeRanDev/reflaxe) and issues 2–5
against [`SomeRanDev/reflaxe.GDScript`](https://github.com/SomeRanDev/reflaxe.GDScript)
(cross-link them; #2 originates in a reflaxe preprocessor but manifests in GDScript output).

## Environment

| | |
|---|---|
| Haxe | 4.3.4 |
| `gdscript` (reflaxe.GDScript) | 1.0.0-beta |
| `reflaxe` | 4.0.0-beta (pulled transitively by `gdscript` 1.0.0-beta) |
| Dep manager | lix (`resolveLibs: scoped`) |
| Host | Linux |

Issues 1–3 reproduce on the stock published libraries — no local patches. Issue
4 surfaced only after 3 was fixed (it shared the same broken files).

## Status (2026-07-12)

Issues **1 and 2** are **fixed** in the reflaxe fork
[`vantreeseba/reflaxe`](https://github.com/vantreeseba/reflaxe), branch
`fix/preprocessor-null-crash-and-arg-deshadow-collision` (both turned out to
originate in reflaxe core, not reflaxe.GDScript). `build-godot.hxml` is wired to
that fork via `haxe_libraries/reflaxe.hxml` and now compiles all 76 files
without crashing. Issue **2** was also filed against reflaxe.GDScript but the
actual bug is reflaxe's `PreventRepeatVariables` de-shadowing preprocessor.

Issue **3** is now **fixed** in the reflaxe.GDScript fork
[`vantreeseba/reflaxe.GDScript`](https://github.com/vantreeseba/reflaxe.GDScript):
block-like `static var` initializers (array comprehensions, loops) are hoisted
into a generated `static func _static_init()` instead of being emitted as an
inline `var x = <statements>`. `haxe_libraries/gdscript.hxml` is wired to that
fork checkout. All 5 affected files now emit valid comprehension output.

Fixing #3 uncovered **Issue 4** (below), a separate `haxe.ds.Vector` bug in the
same 5 files that was previously masked by the comprehension mangling. It is now
**fixed** in the same reflaxe.GDScript fork via a GDScript-specific `Vector`
override. With #1–#4 resolved the addon emits valid GDScript across all files.

Issues **5–7** (2026-07-20) are performance rather than correctness bugs — the
first here that never produced *invalid* output. Their history is a caution:

- **Issue 5** (typed arrays) was fixed, **reverted**, then fixed properly. The
  first attempt compiled and every changed line inspected correctly, but it threw
  at runtime and left the noise tables empty — reviewing generated source was not
  enough to catch it. The working fix (`b827c1e`) pairs the type-argument change
  with inlining the `Vector` helpers, and is worth **~21%** on sampling.
- **Issue 6** (typed locals) is **fixed** and verified byte-identical in output,
  but benchmarking showed **no measurable speedup** at the time. Kept because it
  is correct and strictly better-typed, not because it was shown to be faster.
- **Issue 7** is open and deliberately unattempted.

The current pin is commit `b827c1e` (issues 5 + 6) in
`haxe_libraries/gdscript.hxml` and `build-godot.hxml`.

**Lesson for the next perf change here: measure in Godot before believing it.**
See the "Benchmarks" section at the end for how, and for what the numbers
actually were.

---

## Issue 1 — Compiler crash: `Uncaught exception Trusted on null value` in `RemoveTemporaryVariables` — FIXED (reflaxe fork)

**Repo:** `SomeRanDev/reflaxe` · **Severity:** crash (aborts compilation)

Compiling certain expressions (multi-operand string concatenation with nested
static calls; also triggered by the permutation-table generators in a real
project) crashes the `RemoveTemporaryVariables` expression preprocessor.

### Repro — `Crash.hx`

```haxe
class Crash {
  public function new() {}
  public function value(x: Float, y: Float): String { return keyOf(x) + ":" + keyOf(y); }
  static inline function keyOf(v: Float): String { return haxe.Int64.toStr(haxe.io.FPHelper.doubleToI64(v)); }
  static function main() { trace(new Crash().value(1.5, 2.5)); }
}
```

```
haxe -cp . -lib gdscript -main Crash -D gdscript-output=out
```

### Actual

```
.../reflaxe/4.0.0-beta/.../RemoveTemporaryVariablesImpl.hx:182: characters 42-61 : Uncaught exception Trusted on null value.
.../gdscript/1.0.0-beta/.../GDCompiler.hx:430: characters 57-77 : Called from here
.../reflaxe/4.0.0-beta/.../GenericCompiler.hx:87: characters 4-54 : Called from here
...
```

### Root cause & suggested fix

In `reflaxe/preprocessors/implementations/RemoveTemporaryVariablesImpl.hx`,
`fixTemporaries()` calls `maybeExpr.trustMe()` on a `TVar(tvar, maybeExpr)`
where `maybeExpr` (a `Null<TypedExpr>`) can be `null`:

```haxe
case TVar(tvar, maybeExpr): {
    if(shouldRemoveVariable(tvar, maybeExpr)) {
        tvarMap.set(tvar.id, mapTypedExpr(maybeExpr.trustMe(), false)); // <-- null here
        ...
```

Guarding the null case fixes it (verified — with this change the full
dropecho.noise library compiles all 76 files instead of crashing):

```haxe
if(maybeExpr != null && shouldRemoveVariable(tvar, maybeExpr)) {
```

The same unguarded `.trustMe()` is present on `main` as of this writing, so
there is no released fix.

---

## Issue 2 — Constructor parameters that shadow same-named fields are de-shadowed into a *colliding* name — FIXED (reflaxe fork)

**Repo:** filed against `SomeRanDev/reflaxe.GDScript`, but the bug is in
`SomeRanDev/reflaxe`'s `PreventRepeatVariables` de-shadowing preprocessor ·
**Severity:** silent miscompilation

When a constructor parameter shares a name with an instance field, the compiler
renames the parameter to avoid the shadow. But when two such parameters exist
and one name is a **prefix** of the other (`input` / `input2`), both get renamed
to the **same** identifier (`input22`), so both fields receive the same argument.

### Repro — `Ctor.hx`

```haxe
class Ctor {
  var input: Int;
  var input2: Int;
  public function new(input: Int, input2: Int) { this.input = input; this.input2 = input2; }
  public function sum(): Int { return input + input2; }
  static function main() { trace(new Ctor(1, 2).sum()); }
}
```

```
haxe -cp . -lib gdscript -main Ctor -D gdscript-output=out
```

### Actual — `out/Ctor.gd` (both params named `input22`; both fields get arg #2)

```gdscript
class_name Ctor

var input: int
var input2: int

func _init(input22: int, input22: int) -> void:
	self.input = input22
	self.input2 = input22
```

`Ctor(1, 2).sum()` returns **4** (2+2) instead of **3**.

### Expected

Each parameter must map to a distinct identifier and to its own argument, e.g.:

```gdscript
func _init(input_: int, input2_: int) -> void:
	self.input = input_
	self.input2 = input2_
```

### Impact

Breaks every module whose (macro-generated) constructor has ≥2 params where one
name prefixes another — e.g. all of dropecho.noise's combinators
(`Add`/`Sub`/`Multiply`/`Min`/`Max`/`Blend`/`Select`, params `input`/`input2`).

---

## Issue 3 — Array-comprehension initializers emit invalid GDScript — FIXED (reflaxe.GDScript fork)

**Repo:** `SomeRanDev/reflaxe.GDScript` · **Severity:** invalid output (won't parse in Godot)

Haxe array comprehensions (`[for (...) ...]`), especially in `static var`
initializers, lower to GDScript that uses statement forms (`if`, `while`) as
**expressions** and, in the loop form, replaces the loop counter with a literal
`0` (`0 += 1`). None of this is valid GDScript.

### Repro A — constant-range comprehension, `Comp.hx`

```haxe
class Comp {
  static var table: Array<Float> = [for (i in 0...4) i * 2.0];
  public function new() {}
  static function main() { trace(new Comp()); }
}
```

Emits (invalid — `if true:` used as an expression, trailing bare `[]`):

```gdscript
static var table: Array[float] = if true:
	([] as Array[float]).push_back(0.)
	([] as Array[float]).push_back(2.0)
	([] as Array[float]).push_back(4.)
	([] as Array[float]).push_back(6.)

[]
```

### Repro B — comprehension over an array, `Comp2.hx`

```haxe
class Comp2 {
  static var src: Array<Float> = [1.0, 2.0, 3.0];
  static var table: Array<Float> = [for (a in src) a * 2.0];
  public function new() {}
  static function main() { trace(new Comp2()); }
}
```

Emits (invalid — `while` as an expression, and the loop counter is the literal `0`):

```gdscript
static var table: Array[float] = while (0 < src.size()):
	0 += 1
	([] as Array[float]).push_back(src[0] * 2.0)

[]
```

### Expected

A valid GDScript form, e.g. a real local loop variable inside a `static func`
initializer / `_static_init`, or an array literal, that actually builds the array.

### Impact

Breaks every module that builds tables via comprehensions — e.g. the
permutation / gradient tables in `Perlin`, `Simplex`, `Simplex2D`.

### Fix (reflaxe.GDScript fork)

`GDCompiler.compileClassImpl` now normalizes each `static var` initializer with
`EverythingIsExprSanitizer` (the same pass function bodies get). If the result is
genuinely statement-based (more than one top-level statement, or a lone
block-like statement), the initializer is re-sanitized with the field as the
*assignee* and the resulting statements are collected. When any exist, the class
emits a `static func _static_init()` — which Godot calls automatically after the
static vars are declared — containing the assignments, run through the same
cleanup passes as function bodies (`PreventRepeatVariables`,
`RemoveConstantBoolIfs`, `RemoveUnnecessaryBlocks`). Plain-value static vars
(`= 5`, `= [1.0, 2.0]`) still initialize inline; only block-like ones are hoisted.

---

## Issue 4 — `haxe.ds.Vector` allocation emits invalid `this1.size() = length` — FIXED (reflaxe.GDScript fork)

**Repo:** `SomeRanDev/reflaxe.GDScript` · **Severity:** invalid output (won't parse in Godot)

Uncovered once Issue 3 was fixed — previously masked because the same 5 files were
already invalid from the comprehension mangling. reflaxe.GDScript maps a Haxe
array's read-only `length` to the native `size()` (via `@:nativeName("size()")`
in `_std/Array.hx`). The cross-target `haxe.ds.Vector` constructor pre-sizes its
Array backing with `untyped this.length = length`, so that lowers to the invalid
`this1.size() = length` — `size()` is a method call and cannot be an assignment
target.

### Repro — `Vec.hx`

```haxe
import haxe.ds.Vector;
class Vec {
  public function new() {}
  public function make():Vector<Float> return Vector.fromArrayCopy([1.0, 2.0, 3.0]);
  static function main() { trace(new Vec().make()); }
}
```

Emits (invalid — `size()` used as an assignment target):

```gdscript
var length: int = array.size()
var this1: Array[Variant] = ([] as Array[float])
this1.size() = length      # invalid
```

### Expected

GDScript arrays are pre-sized with the native `resize()` method:
`this1.resize(length)`.

### Fix (reflaxe.GDScript fork)

Added a GDScript-specific `std/gdscript/_std/haxe/ds/Vector.hx` — an Array-backed
`Vector` (matching the existing `IntMap`/`StringMap`/`ObjectMap` overrides in
`_std/haxe/ds/`) whose constructor uses `this.resize(length)` instead of
`untyped this.length = length`. All `Vector` allocations now emit valid GDScript.

---

## Issue 5 — Parameterized typedefs lose their type arguments, emitting `Array[Variant]` — FIXED (reflaxe.GDScript fork, on the second attempt)

**Repo:** `SomeRanDev/reflaxe.GDScript` · **Severity:** performance (output is valid)

> **Status: fixed in `b827c1e`, worth ~21% on sampling.** The first attempt
> (`7cb9740`) was *reverted* in `362b9f0` because it broke the addon at runtime;
> the working fix pairs the same type-argument change with inlining the `Vector`
> helpers. Read "Why the first fix was reverted" and "The working fix" below —
> the type-argument change **alone** is not safe.

Unlike issues 1–4 this is not a correctness bug — the emitted GDScript is valid and
correct, just slower. It is recorded here because the fix belongs **upstream, not
in dropecho.noise's source**: the library's use of `haxe.ds.Vector` is deliberate
(see the comment in `src/dropecho/noise/Perlin.hx`) and should not be contorted
with `#if gdscript` branches to work around a codegen gap.

This was first observed as "`haxe.ds.Vector<T>` emits `Array[Variant]`", but
`Vector` is only a symptom. **Any** parameterized typedef loses its type
arguments. `Vector` is affected because its underlying type is the private
typedef `VectorData<T> = Array<T>`.

### Repro — `Vec.hx`

```haxe
typedef Box<T> = Array<T>;

class Vec {
  public static var direct:Array<Int> = [1, 2, 3];      // fine
  public static var viaTypedef:Box<Int> = [1, 2, 3];    // wrong
  public static var viaVector:haxe.ds.Vector<Int> = haxe.ds.Vector.fromArrayCopy([1, 2, 3]);
  public function new() {}
  static function main() { trace(direct.length); }
}
```

### Actual (before fix)

```gdscript
static var direct: Array[int] = [1, 2, 3]
static var viaTypedef: Array[Variant] = [1, 2, 3]
static var viaVector: Array[Variant] = ...
```

### Root cause

`TypeCompiler.compileType` handled `TType` as:

```haxe
case TType(defRef, _): return compileType(defRef.get().type, errorPos, isExport);
```

The applied type arguments (the discarded `_`) were dropped, so the typedef's
definition was compiled with its own parameters still unbound. An unbound type
parameter hits `case _ if(t.isTypeParameter()): return null`, and callers
substitute `"Variant"` — hence `Array[Variant]`. The `TAbstract` case a few lines
above already did the right thing via `TypeTools.applyTypeParameters`.

### Fix (reflaxe.GDScript fork)

Commit `7cb9740` — apply the type arguments before recursing, mirroring the
`TAbstract` case:

```haxe
case TType(defRef, params): {
    final def = defRef.get();
    final internalType = #if macro {
        TypeTools.applyTypeParameters(def.type, def.params, params);
    } #else def.type #end;
    return compileType(internalType, errorPos, isExport);
}
```

### Impact

Untyped array access goes through Variant dispatch; typed access does not.
Godot's own docs discussion puts the gap at roughly 28–59% on hot paths
(<https://github.com/godotengine/godot-docs/issues/10300>).

This landed squarely on the hottest path in the library. `Perlin.dot_prod_grid`
reads `perm` twice and `gradients_x`/`gradients_y` once each — 4 Variant unwraps —
and it runs for all 4 corners of every sample, i.e. **16 Variant unwraps per
octave per sample**. The irony is that `haxe.ds.Vector` is used *for* performance
("compiles to a native array on C# (no Array wrapper indirection)"); on GDScript
it was costing performance instead.

Rebuilding the addon against the fix changed 5 generated files — `Perlin`,
`Simplex`, `Simplex2D`, `Curve`, `Terrace` — and every changed line is a retype
from `Array[Variant]` to `Array[int]`/`Array[float]`. Nothing else in the output
moved.

### Still `Array[Variant]` after the fix (all correct)

- `Curve._init` / `Terrace._init` take `Array<CurvePoint>` / `Array<ControlPoint>`,
  which are anonymous structures — `TAnonymous` genuinely compiles to `Variant`.
- `haxe_Vector.gd`, `haxe_IntMap.gd`, `haxe_StringMap.gd`, `haxe_ArrayIterator.gd`
  etc. are the generic implementations themselves, where `T` really is unbound.
- `dropecho_Ridged.weights` is `static final weights = []` in our own source — an
  untyped literal, not a codegen bug. Typing it in `Ridged.hx` would fix it.

### Why the first fix was reverted

GDScript's typed arrays are **invariant**: a value whose static type is `Array`
cannot be assigned to a variable of type `Array[float]`. Generic functions whose
return type mentions an unbound type parameter compile to an untyped `Array`
return — `haxe.ds.Vector.fromArrayCopy` among them. So typing the *declaration*
without also converting at the *assignment* produced:

```
SCRIPT ERROR: Trying to assign an array of type "Array" to a variable of type "Array[float]".
          at: _static_init (res://addons/dropecho_noise/dropecho_Perlin.gd:222)
SCRIPT ERROR: Out of bounds get index '0' (on base: 'Array[int]')
          at: dropecho_Perlin.value (res://addons/dropecho_noise/dropecho_Perlin.gd:55)
```

Static initialization aborted, the permutation and gradient tables stayed empty,
and every subsequent sample failed. The addon was completely broken — while the
generated source still looked correct on inspection.

### The working fix (`b827c1e`)

The obvious remedy is to convert at the assignment site. Tested in Godot 4.7.1,
of the three candidate spellings:

| spelling | result |
|---|---|
| `Array[float](src)` | **parse error** — "Cannot call on an expression" |
| `dst.assign(src)` | works, but needs an already-typed `dst`, so it is a statement, not an expression |
| `Array(src, TYPE_FLOAT, &"", null)` | works as an expression |

All of these add a **copy** at every assignment site, though.

The better fix removes the untyped value instead of converting it. The untyped
`Array` only appears because `fromArrayCopy` is a *generic* function: in the
generated `haxe_ds__Vector_Vector_Impl_.gd` its `T` is unbound, so GDScript sees
its return type as a bare `Array`, even though Haxe knows the call site's `T` is
`Float`. Marking `fromArrayCopy`, `copy` and `toArray` **`inline`** in
`std/gdscript/_std/haxe/ds/Vector.hx` removes the generic call entirely — the body
is inlined where `T` is concrete, so the expression keeps its element type:

```gdscript
var vec: Array[float] = tempVector   # inlined; type survives
...
gradients_x = vec                    # type-checks
```

This *removes* a call rather than adding a conversion, so it is faster than both
the status quo and the cast-based alternatives.

### Measured

Godot 4.7.1 headless, 4-octave `Perlin` over 256×256, **three interleaved A/B
rounds** (alternating builds to control for machine drift):

| | round 1 | round 2 | round 3 |
|---|---|---|---|
| before (`362b9f0`) | 345.72 ms | 337.33 ms | 341.04 ms |
| after (`b827c1e`) | 269.22 ms | 286.79 ms | 269.47 ms |

**~21% faster sampling**, with non-overlapping ranges — unlike issue 6, this one
is real. Note the interleaving: a single before/after pair on this machine drifts
by more than 15%, which is exactly how issue 6's phantom "16% win" happened.

Verified correct: all 19 modules instantiated and sampled with **identical
per-module checksums** and zero script errors, and both texture resources still
produce MD5 `68224c40d4a3ab6139e717818fd31ca6`.

### Possible follow-up

Emitting the packed forms (`PackedFloat32Array` / `PackedInt32Array`) would be
faster still and use less memory, but they lack some `Array` convenience methods,
so typed `Array[T]` is the right default and packed would need to be opt-in.

---

## Issue 6 — Local declarations without an initializer are emitted untyped — FIXED (reflaxe.GDScript fork)

**Repo:** `SomeRanDev/reflaxe.GDScript` · **Severity:** performance (output is valid)

Second performance-only bug, same family as #5: valid GDScript, but every
intermediate value in generated numeric code was a `Variant`.

`compileExpression`'s `TVar` case emitted the type annotation *only* inside the
branch handling an initializer. A declaration without one got a bare `var name`,
which in GDScript is an untyped (Variant) local.

That is precisely the shape the `EverythingIsExpr` sanitizer generates whenever it
normalizes a block-valued expression — declare the temp, then assign it inside the
block that follows.

### Repro — `Temp.hx`

```haxe
class Temp {
  public function new() {}
  public function f(x:Float):Int {
    return Std.int(x) + (if (x < 0) 1 else 2);
  }
  static function main() { trace(new Temp().f(1.5)); }
}
```

### Actual (before fix) / Expected (after fix)

```gdscript
var tempNumber        # before — Variant
var tempNumber: int   # after
```

### Impact — measured: none

**Benchmarked in Godot 4.7.1 headless: no measurable speedup.** Sampling a 4-octave
`Perlin` over 256×256, 7 reps, median of medians: **295.23 ms before, 295.40 ms
after.** Within run-to-run noise.

An earlier comparison suggested ~16%, but that compared two runs taken at
different times; running both back-to-back shows no difference. The earlier number
was machine variance, not the change.

The likely reason it doesn't help: with #5 reverted, `perm` and `gradients_*` are
still `Array[Variant]`, so values read out of them are Variant regardless of how
the temp holding them is declared. Typed temps may only pay off *together with*
typed arrays — which is exactly the combination that currently breaks at runtime.

Kept anyway: the output is verified identical (same checksum, same image MD5s),
it is strictly better-typed, and it is a prerequisite for #5 ever being worth
retrying. It is **not** justified by a measured win.

The scale of the change was nonetheless real — `Perlin.value()` alone declared 25
of these, all inside the octave loop:

```gdscript
var tempI32              # Variant
if true:
    var t: int = int(x2)
    tempI32 = t
var X: int = tempI32     # Variant -> int on every read
```

Across the whole addon this was **362 Variant locals**; after the fix, 12 remain —
all correctly untyped, because their type must be able to hold `null`
(`Null<Float>` temps, `EReg`, etc.), which `compileType` already reports by
returning null. Every hot noise module (`Perlin`, `Simplex`, `Simplex2D`,
`Worley`, `Voronoi`, `CellularF2F1`, `Billow`, `Ridged`) now has zero.

### Fix (reflaxe.GDScript fork)

Commit `61d09d9` — emit the type annotation on the no-initializer path too.
GDScript default-initializes a typed local (`var x: int` → 0), and `compileType`
already returns null for anything that must stay untyped to hold `null`, so this
cannot make a nullable local non-nullable.

Rebuilding the addon changed 41 files, and every changed line is a `var`
declaration gaining an annotation — no other output moved.

---

## Issue 7 — `TBlock` always emits `if true:` — OPEN, unmeasured

**Repo:** `SomeRanDev/reflaxe.GDScript` · **Severity:** performance (output is valid)

GDScript has no bare block statement, so `GDCompiler`'s `TBlock` case wraps every
surviving block in `if true:`. After the sanitizer runs, the hot modules carry a
number of these inside their inner loops (`CellularF2F1` 11, `Billow` 8, `Voronoi`
6, and several per `Perlin.value()` octave).

**Not attempted, and not obviously worth attempting.** Two unknowns:

1. GDScript may already constant-fold `if true` at compile time, in which case the
   runtime cost is zero and there is nothing to win. This has not been measured.
2. Flattening the block into its parent scope is a real semantic risk — the block
   scopes its temp declarations. `PreventRepeatVariables` de-shadows names before
   `RemoveUnnecessaryBlocks` runs, so it is *probably* safe, but "probably" is not
   good enough for a change with no demonstrated payoff.

Measure first. If `if true:` turns out to be free, close this.

---

## Note (not filed — resolved on our side)

`class_name` output would collide with Godot built-in type names for at least
`Curve` (Godot has a built-in `Curve` class). Resolved without an upstream
change: reflaxe.GDScript derives `class_name` from `@:nativeName` when present,
and the generated *filename* ignores `@:nativeName`. So `tools/GdNamespace.hx`
(wired into `build-godot.hxml` via `addGlobalMetadata`) stamps
`@:nativeName(globalName)` on every class — reusing reflaxe's own
`BaseTypeHelper.globalName` so the `class_name` matches the on-disk filename
exactly (`dropecho_Curve`, `dropecho_Perlin`, …) — collision-free, with all
cross-class references staying coherent. (A built-in prefix/namespace option in
reflaxe.GDScript would still be a nice convenience.)

---

## Benchmarks (2026-07-20)

Measured with Godot **4.7.1** headless on an 8-core Linux box, 256×256, 7 reps,
median. Sampler is `Perlin` with the addon's inspector defaults (4 octaves,
frequency 0.02, lacunarity 2.0, persistence 0.5).

The harness lives outside this repo (it was scratch work): a `project.godot`
with `dist/godot/addons/` copied in, plus a `SceneTree` script run as
`godot --headless --path <dir> --script bench.gd -- <label> <size> <reps>`. It
loads modules with `load(...).new(...)` rather than by `class_name`, times with
`Time.get_ticks_usec()`, and fingerprints every result (float checksum for
sampling, image MD5 for fills) so a faster-but-wrong variant cannot pass
unnoticed. Recreate it before trusting any future perf claim here.

### Where the time actually goes

| | median |
|---|---|
| sampling only (65 536 `Perlin.value()` calls) | ~295 ms |
| **fill machinery only** (same loop, `Constant` sampler) | **~8 ms** |

**Sampling is ~97% of the cost.** Anything that changes only the fill loop can,
at absolute best, win back ~8 ms of ~300 ms.

### Fill strategies (Perlin sampler)

| strategy | median | note |
|---|---|---|
| `Image.set_pixel` per pixel | ~317–355 ms | the original implementation |
| `PackedByteArray` + `create_from_data` | ~300–338 ms | within noise of `set_pixel` |
| `PackedByteArray` + `WorkerThreadPool` (per row) | ~209–228 ms | the real win on the fill side |
| ditto, chunked one task per core | ~223 ms | no better than per-row |
| ditto, per-worker local buffers + instances | ~221 ms | no better; not contention |

Isolated (`Constant` sampler), `set_pixel` is ~8.5 ms and `PackedByteArray` is
~8.1 ms — so **replacing `set_pixel` is not a meaningful optimization here**,
contrary to the intuition that 65 536 marshaled engine calls must dominate. It
was kept because it is a prerequisite for threading, not for its own sake.

Threading is worth ~**1.4×** overall, and that is the whole win. It does *not*
scale with core count: chunking by core and giving each worker its own buffer and
its own module instance both changed nothing, so the ceiling is neither task
dispatch overhead nor write contention on the shared `PackedByteArray`. Cause not
identified; likely interpreter-level. Below ~16 384 pixels threading is a net
loss (~10 ms vs ~8 ms), which is why the addon keeps a threshold.

### Correctness fingerprints

All fill strategies produce byte-identical images (MD5
`68224c40d4a3ab6139e717818fd31ca6`), which also confirms that the addon's
`int(g * 255.0)` matches `Image.set_pixel`'s float→uint8 conversion for
`FORMAT_L8` exactly. Sampling checksum `979.401856754742` is unchanged across
every compiler variant tried.

### Update after issue 5 was fixed properly

The table above was measured with issue 5 reverted. With `b827c1e` in place,
sampling drops a further ~21% (~341 ms -> ~269 ms in interleaved A/B), so codegen
*was* worth something after all — just not the part (typed locals) that was easy.

Combined, from the original `set_pixel` addon on the stock compiler to the
current `PackedByteArray` + threads addon on `b827c1e`, a 256x256 regen goes from
roughly **317 ms to ~200 ms**.

### Conclusion

The GDScript addon's cost is dominated by the interpreter executing
`Perlin.value()`, not by the image plumbing. Replacing `set_pixel` bought
essentially nothing on its own; threading bought ~1.4x; typed arrays bought
~21%. That is roughly 1.6x total, and further codegen tweaking looks like
diminishing returns. If sampling throughput needs an order of magnitude rather
than a third, that is the argument for the native/GDExtension route or a compute
shader — not for more codegen micro-optimization.
