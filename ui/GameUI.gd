extends CanvasLayer

func _ready() -> void:
	$Panel/VBoxContainer/ButtonContainer/FeedButton.pressed.connect(_on_feed_button_pressed)
	$Panel/VBoxContainer/ButtonContainer/PlayButton.pressed.connect(_on_play_button_pressed)
	$Panel/VBoxContainer/ButtonContainer/SleepButton.pressed.connect(_on_sleep_button_pressed)
	$Panel/VBoxContainer/ButtonContainer/GroomButton.pressed.connect(_on_groom_button_pressed)

func _process(_delta: float) -> void:
	var cat = get_tree().root.get_node("Main/Cat")
	if cat:
		update_ui(cat)

func update_ui(cat: Node) -> void:
	$Panel/VBoxContainer/StatsContainer/HungerBar.value = cat.hunger
	$Panel/VBoxContainer/StatsContainer/EnergyBar.value = cat.energy
	$Panel/VBoxContainer/StatsContainer/HappinessBar.value = cat.happiness
	$Panel/VBoxContainer/StatsContainer/HealthBar.value = cat.health
	
	$Panel/VBoxContainer/LevelInfo/LevelLabel.text = "Level: %d" % cat.level
	$Panel/VBoxContainer/LevelInfo/ExpLabel.text = "Exp: %d/100" % cat.experience
	
	var mood_emoji = get_mood_emoji(cat.mood)
	$Panel/VBoxContainer/MoodLabel.text = "心情: %s" % mood_emoji

func get_mood_emoji(mood: String) -> String:
	match mood:
		"happy":
			return "😊 開心"
		"hungry":
			return "😋 飢餓"
		"sleepy":
			return "😴 困睡"
		"playing":
			return "🤩 興奮"
		"angry":
			return "😠 不開心"
		_:
			return "😊 普通"

func _on_feed_button_pressed() -> void:
	var cat = get_tree().root.get_node("Main/Cat")
	if cat:
		cat.feed()

func _on_play_button_pressed() -> void:
	var cat = get_tree().root.get_node("Main/Cat")
	if cat:
		cat.play_with_cat()

func _on_sleep_button_pressed() -> void:
	var cat = get_tree().root.get_node("Main/Cat")
	if cat:
		cat.sleep_cat()

func _on_groom_button_pressed() -> void:
	var cat = get_tree().root.get_node("Main/Cat")
	if cat:
		cat.groom_cat()
