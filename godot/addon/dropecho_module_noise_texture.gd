@tool
class_name DropechoNoiseModuleTexture
extends ImageTexture
## A Texture2D backed by any dropecho.noise *source* module.
##
## Where DropechoPerlinNoiseTexture is hard-wired to `Perlin`, this resource lets
## you pick any module that generates noise on its own — i.e. one that does NOT
## take other modules as input (Perlin, Simplex, Billow, Ridged, CheckerBoard,
## Cones, Cylinders, Spheres, Worley, CellularF2F1, Voronoi, Constant). Combinator
## modules (Add, Blend, Displace, …) are excluded because they need input modules
## that can't be wired up from the inspector.
##
## Create one via the resource dropdown ("New DropechoNoiseModuleTexture"), choose
## a Module in the inspector, then tweak the params that apply to it; the preview
## regenerates live in the editor (`@tool`). Only the params relevant to the
## selected module are shown.

## Source modules: every noise generator whose constructor takes no input module.
enum Module {
	PERLIN,
	SIMPLEX,
	BILLOW,
	RIDGED,
	CHECKERBOARD,
	CONES,
	CYLINDERS,
	SPHERES,
	WORLEY,
	CELLULAR_F2_F1,
	VORONOI,
	CONSTANT,
}

## Distance metric for the Voronoi module. Mirrors dropecho.noise.Voronoi.DistanceType.
enum VoronoiDistance {
	EUCLIDEAN,
	MANHATTAN,
	CHEBYSHEV,
}

@export_group("Size")
@export_range(1, 2048, 1) var width: int = 256:
	set(v):
		width = v
		_queue_regen()
@export_range(1, 2048, 1) var height: int = 256:
	set(v):
		height = v
		_queue_regen()

@export_group("Preview")
## When on, the texture rebuilds automatically as you change values. Rebuilding
## calls set_image(), which makes the editor refresh this row and briefly steals
## focus from a slider mid-edit. Turn this off to drag/type values with focus
## kept, then press Regenerate to rebuild once.
@export var auto_regenerate: bool = true:
	set(v):
		auto_regenerate = v
		if v:
			_queue_regen()
## Acts as a button: flip it to force a one-off rebuild (handy with Auto
## Regenerate off). It never stays on.
@export var regenerate: bool = false:
	set(v):
		regenerate = false
		_regen()

@export_group("Module")
@export var module: Module = Module.PERLIN:
	set(v):
		module = v
		# Different modules expose different params; refresh which ones show.
		notify_property_list_changed()
		_queue_regen()

@export_group("Parameters")
## Base frequency; higher = finer/zoomed-in detail. Applies to every module except Constant.
@export_range(0.001, 0.2, 0.001) var frequency: float = 0.02:
	set(v):
		frequency = v
		_queue_regen()
## Number of fractal octaves summed together. Fractal modules only (Perlin/Simplex/Billow/Ridged).
@export_range(1, 8, 1) var octaves: int = 4:
	set(v):
		octaves = v
		_queue_regen()
## Per-octave frequency multiplier. Fractal modules only.
@export_range(1.0, 4.0, 0.01) var lacunarity: float = 2.0:
	set(v):
		lacunarity = v
		_queue_regen()
## Per-octave amplitude multiplier. Fractal modules only.
@export_range(0.0, 1.0, 0.01) var persistence: float = 0.5:
	set(v):
		persistence = v
		_queue_regen()
## Output value. Constant module only.
@export_range(-1.0, 1.0, 0.01) var constant_value: float = 0.0:
	set(v):
		constant_value = v
		_queue_regen()
## Distance metric. Voronoi module only.
@export var voronoi_distance: VoronoiDistance = VoronoiDistance.EUCLIDEAN:
	set(v):
		voronoi_distance = v
		_queue_regen()

# Quiet period (seconds) to wait after the last change before rebuilding.
const _REGEN_DELAY: float = 0.15

# Bumped on every queued regen; only the newest survives the debounce window.
var _regen_token: int = 0

func _init() -> void:
	_regen()

# Debounce regeneration. Dragging an inspector slider fires the setter many times
# per second; regenerating on each one calls set_image() (which emits `changed`),
# rebuilding the inspector and stealing focus from the slider mid-drag. Instead we
# wait for a short quiet period and rebuild once, after the user stops changing
# values. Each call invalidates the previous one via the token, so only the last
# change in a burst actually regenerates.
func _queue_regen() -> void:
	if not auto_regenerate:
		return
	_regen_token += 1
	var token: int = _regen_token
	var loop := Engine.get_main_loop() as SceneTree
	if loop == null:
		_regen()
		return
	await loop.create_timer(_REGEN_DELAY).timeout
	# A newer change arrived during the wait; let that one regenerate instead.
	if token == _regen_token:
		_regen()

# Fractal modules share the (octaves, frequency, lacunarity, persistence) shape.
func _is_fractal() -> bool:
	return module == Module.PERLIN or module == Module.SIMPLEX \
		or module == Module.BILLOW or module == Module.RIDGED

# Hide params that don't apply to the selected module, so the inspector only
# shows what actually affects the output.
func _validate_property(property: Dictionary) -> void:
	var prop_name: String = property.name
	if prop_name in ["octaves", "lacunarity", "persistence"] and not _is_fractal():
		property.usage &= ~PROPERTY_USAGE_EDITOR
	elif prop_name == "frequency" and module == Module.CONSTANT:
		property.usage &= ~PROPERTY_USAGE_EDITOR
	elif prop_name == "constant_value" and module != Module.CONSTANT:
		property.usage &= ~PROPERTY_USAGE_EDITOR
	elif prop_name == "voronoi_distance" and module != Module.VORONOI:
		property.usage &= ~PROPERTY_USAGE_EDITOR

# Build the selected source module. Returns an object exposing value(x, y) -> float
# (the dropecho.noise IModule2D contract; the interface itself is erased in GDScript).
func _make_module() -> Object:
	match module:
		Module.PERLIN:
			return dropecho_Perlin.new(octaves, frequency, lacunarity, persistence)
		Module.SIMPLEX:
			return dropecho_Simplex.new(octaves, frequency, lacunarity, persistence)
		Module.BILLOW:
			return dropecho_Billow.new(octaves, frequency, lacunarity, persistence)
		Module.RIDGED:
			return dropecho_Ridged.new(octaves, frequency, lacunarity, persistence)
		Module.CHECKERBOARD:
			return dropecho_CheckerBoard.new(frequency)
		Module.CONES:
			return dropecho_Cones.new(frequency)
		Module.CYLINDERS:
			return dropecho_Cylinders.new(frequency)
		Module.SPHERES:
			return dropecho_Spheres.new(frequency)
		Module.WORLEY:
			return dropecho_Worley.new(frequency)
		Module.CELLULAR_F2_F1:
			return dropecho_CellularF2F1.new(frequency)
		Module.VORONOI:
			return dropecho_Voronoi.new(frequency, int(voronoi_distance))
		Module.CONSTANT:
			return dropecho_Constant.new(constant_value)
	return dropecho_Perlin.new(octaves, frequency, lacunarity, persistence)

# Below this pixel count, fill on the calling thread: dispatching to the pool and
# waiting costs more than the rows save.
const _THREAD_THRESHOLD: int = 16384

# Fill state, shared with _fill_row while a threaded regen is in flight. Only
# _regen writes these, and only before dispatching; the workers read them.
var _fill_w: int = 0
var _fill_module: Object = null
var _fill_data: PackedByteArray

func _regen() -> void:
	var w: int = maxi(1, width)
	var h: int = maxi(1, height)
	_fill_w = w
	# Constructing the module here (main thread) also forces Godot to load the
	# generated script and run its _static_init(), so the workers never race to
	# initialize shared static tables (e.g. Perlin's permutation table).
	_fill_module = _make_module()
	_fill_data = PackedByteArray()
	_fill_data.resize(w * h)

	# Every module in the picker is a source module, and IModule2D requires
	# value() to be a pure function of its coordinates, so rows can be filled
	# concurrently with no synchronization: each writes a disjoint byte range.
	# (Cache is the one module with mutable state — it takes an input module, so
	# it isn't selectable here. Don't thread this loop over a Cache.)
	if w * h >= _THREAD_THRESHOLD:
		var task_id := WorkerThreadPool.add_group_task(_fill_row, h)
		WorkerThreadPool.wait_for_group_task_completion(task_id)
	else:
		for y in h:
			_fill_row(y)

	set_image(Image.create_from_data(w, h, false, Image.FORMAT_L8, _fill_data))
	_fill_module = null
	_fill_data = PackedByteArray()

# Fill one row of the L8 buffer. Writing bytes directly rather than calling
# Image.set_pixel() per pixel avoids a marshaled engine call and a Color
# allocation for every pixel.
func _fill_row(y: int) -> void:
	var base: int = y * _fill_w
	var fy: float = float(y)
	for x in _fill_w:
		# value() returns roughly [-1, 1]; map to [0, 1] for grayscale.
		var n: float = _fill_module.value(float(x), fy)
		var g: float = clampf(n * 0.5 + 0.5, 0.0, 1.0)
		# Matches Image.set_pixel()'s float -> uint8 conversion for FORMAT_L8.
		_fill_data[base + x] = int(g * 255.0)
