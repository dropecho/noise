# AGENTS.md — dropecho.noise

Single source of truth for all AI agents working on this project.

## Agent Instructions

- **Always use the `haxe` skill** when reading or writing any `.hx` or `.hxml` file.
- **Always use the Haxe LSP** (`LSP` tool) for navigating code — go-to-definition, find
  references, hover types — before grepping or reading files manually.
- **Never co-author or co-sign commits — no exceptions.** Commit messages must contain
  **zero** attribution, authorship, or sign-off trailers. This explicitly forbids
  `Co-Authored-By`, `Signed-off-by`, `Co-developed-by`, `Reviewed-by`, `Acked-by`,
  `Tested-by`, `Generated-by`, or any `*-by:` line, as well as "Generated with"/tool-credit
  footers and any agent or AI attribution. This applies to every commit, amend, rebase, and
  squash, regardless of any default or tool-provided template. If a template or upstream
  message contains such a trailer, strip it before committing.
- **Never add section/region divider comments** (e.g. `// ── Foo ──`, `// --- Foo ---`,
  `#region`). Organize code with ordering and doc comments instead.

---

## Project Overview

**dropecho.noise** (`haxelib: dropecho.noise`, npm: `@dropecho/noise`) is a Haxe library of
**2D noise generation** tools that compiles to multiple targets and is published to both
haxelib and npm.

Every noise type implements `IModule2D` — a single `value(x:F32, y:F32):F32` method — so
modules compose: a generator can feed a modifier, which can feed a combinator, building up
arbitrarily complex noise pipelines. Modules are immutable after construction (all config is
passed to the constructor), so a module can be shared and sampled safely.

- **Generators** (produce noise from coordinates): `Perlin`, `Simplex` / `Simplex2D`,
  `Worley`, `Voronoi`, `CellularF2F1`, `Billow`, `Ridged`, `FractalWarp`, plus shape/pattern
  sources `Spheres`, `Cones`, `Cylinders`, `CheckerBoard`, `Constant`.
- **Modifiers** (transform one source's output): `Abs`, `Invert`, `Clamp`, `Scale`,
  `ScaleBias`, `Normalize`, `Pow`, `Exponent`, `Curve`, `Terrace`, `Threshold`, `Turbulence`,
  `Cache`.
- **Combinators** (combine multiple sources): `Add`, `Sub`, `Multiply`, `Min`, `Max`,
  `Blend`, `Select`.
- **Transforms** (warp the input coordinates): `RotatePoint`, `TranslatePoint`, `Displace`.
- **Utilities** (`src/dropecho/utils/`): `FastMath` (with the `F32`/`I32` abstracts),
  `MathUtils`, `Coords`, `Vector`, `VectorMath`.

- **Targets:** JS CommonJS and JS ES module (+ `.d.ts` via genes) from `build.hxml`; a Godot
  GDScript addon from the separate `build-godot.hxml`. A C# (DLL) target exists in
  `targets/cs.hxml` but is **commented out** of both `build.hxml` and `test.hxml` while the
  Haxe C# target is in flux upstream — do not describe it as a live target.
- **Test runner:** `dropecho.testing` (auto-discovery) over `utest`; `instrument` for coverage.
- **Dependencies:** managed by [lix](https://github.com/lix-pm/lix.client). The Haxe version
  is pinned in `.haxerc`; each target's libs are pinned in `haxe_libraries/*.hxml`. Library
  deps: `format`, `seedyrng` (seeded RNG), `dropecho.macros` (the `@:build` constructor
  macro). `dropecho.testing`, `utest`, `genes`, and `hxnodejs` support build/test. The Godot
  build additionally uses `reflaxe` + `gdscript` (reflaxe.GDScript), both pinned to **forks**
  — see the Godot section below.
- **Source root:** `src/` · **Tests root:** `test/`
- **Releases:** automated via `semantic-release` (+ `semantic-release-haxelib`), off the
  `main` branch. The release also builds the Godot addon and attaches it to the GitHub
  release as a zip (`@semantic-release/exec` prepare step in `.releaserc.json`).

---

## Directory Layout

```
src/dropecho/noise/     # the noise modules (one IModule2D per file)
src/dropecho/utils/     # FastMath (F32/I32 abstracts), MathUtils, Coords, Vector, VectorMath
test/noise/             # utest cases, auto-discovered by filename (*Tests.hx)
test/utils/
build.hxml              # multi-target build (shared opts + --each/--next)
build-godot.hxml        # Godot GDScript addon build (separate on purpose — beta toolchain)
targets/                # one hxml per target (js, js-esm, cs, gdscript)
test.hxml               # test build (libs/targets only — no -main)
tools/GdNamespace.hx    # Godot-build-only macro: stamps @:nativeName for class_name namespacing
godot-overrides/        # GDScript-only std shadows (seedyrng.Random 32-bit rotate fix)
godot/addon/            # hand-written .gd files copied into the built addon
.dropecho.testing.json  # test-runner config (coverage, root_package, hxml)
.haxerc                 # lix: pinned Haxe version + scoped lib resolution
haxe_libraries/         # lix: one hxml per pinned dep (keep manual macro/-D lines when re-pinning)
upstream-issues.md      # reflaxe.GDScript bugs found here + Godot benchmark numbers
dist/                   # compiled output
artifacts/              # compiled test output + coverage reports
```

There is no hand-written test main/suite: `dropecho.testing` generates the entry point and
registers every `*Tests.hx` class on the classpath (note the plural — `Test.hx` files are
**not** discovered).

---

## Build & Test

Prefer `npm` scripts over invoking Haxe tools directly.

```bash
npm install         # → lix download   (fetch the pinned Haxe + libs into the lix cache)
npm run build       # → clean, then haxe build.hxml   (JS cjs + JS esm), then copy esm to docs/
npm test            # → lix dropecho.testing
npm run build:godot # → haxe build-godot.hxml, then copy godot/addon/ over the output
npm run package:godot # → build:godot, then zip dist/godot/addons into a release zip
npm run clean       # remove dist/ and artifacts/
```

`npm install` runs `lix download` (via the `prepare` lifecycle script) to materialize the deps
pinned in `.haxerc` + `haxe_libraries/`. To add a dependency, run `lix install haxelib:<name>`
— lix writes its pinned `haxe_libraries/<name>.hxml` — then add a matching `-lib <name>` to
`build.hxml`/`test.hxml`. Commit the generated hxml.

- `build.hxml` puts shared options (class path, the `addGlobalMetadata` + `include` macros,
  library deps, `-D analyzer-optimize`/`-D analyzer-user-var-fusion`) before `--each`, then
  builds each `targets/*.hxml` separated by `--next`. The
  `addGlobalMetadata('dropecho', '@:expose', true, true)` macro applies `@:expose` to every
  type under `dropecho`, so each module is exported into the JS bundle without per-class
  annotations.
- `test.hxml` lists libs/targets only — **no `-main`**. The `dropecho.testing` runner injects
  `--main dropecho.testing.AutoTest` (plus instrument/coverage from `.dropecho.testing.json`),
  then builds and runs the suite on its enabled targets (JS via Node and Python; the C# block
  is commented out alongside the one in `build.hxml`).

To type-check quickly without generating output: `haxe build.hxml --no-output`.

---

## Godot / GDScript addon

`build-godot.hxml` compiles the whole library to GDScript 2.0 via
[reflaxe.GDScript](https://github.com/SomeRanDev/reflaxe.GDScript), emitting an installable
addon (including a generated `plugin.cfg`) into `dist/godot/addons/dropecho_noise`. It is
**deliberately separate** from `build.hxml`: the target is beta, so it stays out of the stable
npm/haxelib path. Read the header comment in `build-godot.hxml` before changing anything there
— it documents each non-obvious line and why removing it breaks the build.

Things to know before touching this build:

- **The pins are forks, not upstream.** `haxe_libraries/reflaxe.hxml` and
  `haxe_libraries/gdscript.hxml` point at `vantreeseba/reflaxe` and
  `vantreeseba/reflaxe.GDScript`, which carry fixes for eight-plus miscompiles of this
  library. `upstream-issues.md` catalogues every one with a minimal repro and its status.
- **Re-pinning the gdscript fork means editing two files.** The commit hash appears both in
  `haxe_libraries/gdscript.hxml` and in the `-cp .../std` and `.../std/gdscript/_std` lines of
  `build-godot.hxml`; the std overrides must be on the real command-line classpath because
  core types bind before init macros run.
- **`godot-overrides/` is loaded via `--macro addClassPath`,** not `-cp`, because lix hoists
  `-lib` classpaths ahead of command-line `-cp` and the real `seedyrng` would win.
- **Measure perf changes in Godot before believing them.** `upstream-issues.md` records the
  benchmark methodology and the actual numbers; one codegen "fix" there compiled, read
  correctly, and still broke the addon at runtime. Sampling is ~97% of the cost — fill-loop
  work has almost nothing to win.

---

## Key Conventions

- Every noise module implements `IModule2D` and is **immutable after construction** — no
  public mutable state or setters; `value(x, y)` must be a pure function of the coordinates
  and the values fixed at construction.
- Most modules use `@:build(dropecho.macros.Constructor.fromArgs())` to generate the
  constructor body from the `new(...)` signature; keep that pattern when adding modules.
- Use the `F32`/`I32` abstracts from `dropecho.utils.FastMath` for noise math rather than raw
  `Float`/`Int`.
- `@:expose` is applied globally via the build macro (see Build & Test) — you do not annotate
  individual classes.
- Give every public function a full doc comment with `@param`/`@return`.
- Tests are `utest` cases: each class is named `*Tests.hx`, `extends utest.Test`, with
  `test_`-prefixed methods using `utest.Assert` (use `Assert.floatEquals` for floats).
