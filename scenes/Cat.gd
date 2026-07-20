extends CharacterBody2D

# 狀態變數
var hunger: float = 50.0
var energy: float = 70.0
var happiness: float = 60.0
var health: float = 100.0
var level: int = 1
var experience: int = 0

var mood: String = "happy"
var current_action: String = "idle"
var direction: String = "down"

var last_fed: float = 0.0
var last_played: float = 0.0
var last_slept: float = 0.0

# 動畫和行為
var animated_sprite: AnimatedSprite2D
var behavior_timer: float = 0.0
var behavior_interval: float = randf_range(3.0, 8.0)
var walk_distance: float = 0.0
var is_walking: bool = false

const MOVE_SPEED = 50.0
const SAVE_PATH = "user://cat_save.json"

func _ready() -> void:
	animated_sprite = $AnimatedSprite2D
	position = Vector2(400, 300)
	last_fed = Time.get_ticks_msec() / 1000.0
	last_played = Time.get_ticks_msec() / 1000.0
	last_slept = Time.get_ticks_msec() / 1000.0
	load_game()
	update_animation()

func _physics_process(delta: float) -> void:
	update_state(delta)
	update_behavior(delta)
	update_animation()

func update_state(delta: float) -> void:
	var current_time = Time.get_ticks_msec() / 1000.0
	
	# 飢餓度隨時間增加
	hunger = min(100.0, hunger + (current_time - last_fed) * 0.02)
	
	# 能量隨時間減少（睡眠除外）
	if current_action != "sleep":
		energy = max(0.0, energy - delta * 0.01)
	
	# 根據狀態更新快樂度
	if hunger > 80:
		happiness = max(0.0, happiness - delta * 0.1)
	if energy < 30:
		happiness = max(0.0, happiness - delta * 0.05)
	
	update_mood()
	
	# 每10秒保存一次
	if int(current_time) % 10 == 0:
		save_game()

func update_mood() -> void:
	if hunger > 80:
		mood = "hungry"
	elif energy < 30:
		mood = "sleepy"
	elif happiness > 75:
		mood = "happy"
	elif happiness < 30:
		mood = "angry"
	else:
		mood = "happy"

func update_behavior(delta: float) -> void:
	behavior_timer += delta
	
	if behavior_timer > behavior_interval:
		behavior_timer = 0.0
		behavior_interval = randf_range(3.0, 8.0)
		
		var behaviors = ["walk", "sit", "sleep", "groom"]
		var random_behavior = behaviors[randi() % behaviors.size()]
		
		match random_behavior:
			"walk":
				if randf() > 0.5:
					start_walking()
			"sleep":
				if energy < 50:
					current_action = "sleep"
			_:
				current_action = "idle"
	
	if is_walking:
		move_towards_target(delta)
	
	if current_action == "sleep":
		energy = min(100.0, energy + delta * 0.5)
		happiness = min(100.0, happiness + delta * 0.1)

func start_walking() -> void:
	is_walking = true
	current_action = "walk"
	walk_distance = randf_range(50.0, 150.0)
	
	var directions = ["up", "down", "left", "right"]
	direction = directions[randi() % directions.size()]

func move_towards_target(delta: float) -> void:
	var move_amount = MOVE_SPEED * delta
	
	match direction:
		"up":
			position.y -= move_amount
		"down":
			position.y += move_amount
		"left":
			position.x -= move_amount
		"right":
			position.x += move_amount
	
	position.x = clamp(position.x, 0, get_viewport_rect().size.x - 80)
	position.y = clamp(position.y, 0, get_viewport_rect().size.y - 80)
	
	walk_distance -= move_amount
	if walk_distance <= 0:
		is_walking = false
		current_action = "idle"

func update_animation() -> void:
	var anim_key = current_action + "_" + direction
	
	match current_action:
		"walk":
			anim_key = "walk_" + direction
		"idle":
			anim_key = "idle_" + direction
		"eat":
			anim_key = "eat"
		"play":
			anim_key = "play"
		"sleep":
			anim_key = "sleep"
		"groom":
			anim_key = "groom"
	
	if animated_sprite and animated_sprite.sprite_frames:
		if animated_sprite.animation != anim_key:
			if anim_key in animated_sprite.sprite_frames.get_animation_names():
				animated_sprite.animation = anim_key
				animated_sprite.play()

func feed() -> void:
	if hunger < 10:
		health = max(0.0, health - 5.0)
	
	hunger = max(0.0, hunger - 40.0)
	happiness = min(100.0, happiness + 15.0)
	last_fed = Time.get_ticks_msec() / 1000.0
	current_action = "eat"
	experience = min(999, experience + 10)
	update_mood()
	save_game()

func play_with_cat() -> void:
	if energy < 20:
		happiness = max(0.0, happiness - 10.0)
		health = max(0.0, health - 5.0)
		return
	
	energy = max(0.0, energy - 30.0)
	happiness = min(100.0, happiness + 25.0)
	hunger = min(100.0, hunger + 10.0)
	last_played = Time.get_ticks_msec() / 1000.0
	current_action = "play"
	experience = min(999, experience + 20)
	update_mood()
	save_game()

func sleep_cat() -> void:
	current_action = "sleep"
	energy = min(100.0, energy + 60.0)
	happiness = min(100.0, happiness + 10.0)
	last_slept = Time.get_ticks_msec() / 1000.0
	update_mood()
	save_game()

func groom_cat() -> void:
	current_action = "groom"
	health = min(100.0, health + 20.0)
	happiness = min(100.0, happiness + 5.0)
	experience = min(999, experience + 5)
	update_mood()
	save_game()

func on_cat_clicked() -> void:
	happiness = min(100.0, happiness + 5.0)
	update_mood()
	save_game()

func save_game() -> void:
	var save_data = {
		"hunger": hunger,
		"energy": energy,
		"happiness": happiness,
		"health": health,
		"level": level,
		"experience": experience,
		"position": {"x": position.x, "y": position.y},
		"last_fed": last_fed,
		"last_played": last_played,
		"last_slept": last_slept
	}
	
	var json = JSON.stringify(save_data)
	var file = FileAccess.open(SAVE_PATH, FileAccess.WRITE)
	if file:
		file.store_string(json)

func load_game() -> void:
	if ResourceLoader.exists(SAVE_PATH):
		var file = FileAccess.open(SAVE_PATH, FileAccess.READ)
		if file:
			var json_str = file.get_as_text()
			var json = JSON.new()
			if json.parse(json_str) == OK:
				var data = json.get_data()
				hunger = data.get("hunger", 50.0)
				energy = data.get("energy", 70.0)
				happiness = data.get("happiness", 60.0)
				health = data.get("health", 100.0)
				level = data.get("level", 1)
				experience = data.get("experience", 0)
				var pos_data = data.get("position", {"x": 400, "y": 300})
				position = Vector2(pos_data.x, pos_data.y)
