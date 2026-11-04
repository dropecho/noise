@tool
class_name DropechoPerlinNoiseTexture
extends ImageTexture
## A Texture2D backed by dropecho.noise `Perlin`.
##
## Use it anywhere a Texture2D is accepted (Sprite2D, TextureRect, a material
## slot, …) — the dropecho equivalent of Godot's built-in NoiseTexture2D. Create
## one via the resource dropdown ("New DropechoPerlinNoiseTexture"), then tweak
## the exported params below in the inspector; the preview regenerates live in
## the editor (`@tool`).
##
## Note: Godot's built-in `Noise` base class does not expose script-overridable
## virtuals, so a custom noise cannot be plugged into a `NoiseTexture2D`. This
## resource instead generates the image itself, mirroring what NoiseTexture2D
## does but sampling `dropecho_Perlin` (the generated global class).

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

@export_group("Perlin")
## Number of fractal octaves summed together.
@export_range(1, 8, 1) var octaves: int = 4:
	set(v):
		octaves = v
		_queue_regen()
## Base frequency; higher = finer/zoomed-in detail.
@export_range(0.001, 0.2, 0.001) var frequency: float = 0.02:
	set(v):
		frequency = v
		_queue_regen()
## Per-octave frequency multiplier.
@export_range(1.0, 4.0, 0.01) var lacunarity: float = 2.0:
	set(v):
		lacunarity = v
		_queue_regen()
## Per-octave amplitude multiplier.
@export_range(0.0, 1.0, 0.01) var persistence: float = 0.5:
	set(v):
		persistence = v
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

# Below this pixel count, fill on the calling thread: dispatching to the pool and
# waiting costs more than the rows save.
const _THREAD_THRESHOLD: int = 16384

# Fill state, shared with _fill_row while a threaded regen is in flight. Only
# _regen writes these, and only before dispatching; the workers read them.
var _fill_w: int = 0
var _fill_perlin: dropecho_Perlin = null
var _fill_data: PackedByteArray

func _regen() -> void:
	var w: int = maxi(1, width)
	var h: int = maxi(1, height)
	_fill_w = w
	# Constructing Perlin here (main thread) also forces Godot to load the
	# generated script and run its _static_init(), so the workers never race to
	# initialize the shared permutation and gradient tables.
	_fill_perlin = dropecho_Perlin.new(octaves, frequency, lacunarity, persistence)
	_fill_data = PackedByteArray()
	_fill_data.resize(w * h)

	# IModule2D requires value() to be a pure function of its coordinates and
	# Perlin's tables are immutable once initialized, so rows can be filled
	# concurrently with no synchronization: each writes a disjoint byte range.
	if w * h >= _THREAD_THRESHOLD:
		var task_id := WorkerThreadPool.add_group_task(_fill_row, h)
		WorkerThreadPool.wait_for_group_task_completion(task_id)
	else:
		for y in h:
			_fill_row(y)

	set_image(Image.create_from_data(w, h, false, Image.FORMAT_L8, _fill_data))
	_fill_perlin = null
	_fill_data = PackedByteArray()

# Fill one row of the L8 buffer. Writing bytes directly rather than calling
# Image.set_pixel() per pixel avoids a marshaled engine call and a Color
# allocation for every pixel.
func _fill_row(y: int) -> void:
	var base: int = y * _fill_w
	var fy: float = float(y)
	for x in _fill_w:
		# value() returns roughly [-1, 1]; map to [0, 1] for grayscale.
		var n: float = _fill_perlin.value(float(x), fy)
		var g: float = clampf(n * 0.5 + 0.5, 0.0, 1.0)
		# Matches Image.set_pixel()'s float -> uint8 conversion for FORMAT_L8.
		_fill_data[base + x] = int(g * 255.0)
