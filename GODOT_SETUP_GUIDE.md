# 🐱 Desktop Cat - Godot 完整設置指南

## 📥 安裝步驟

### 1️⃣ 下載和安裝 Godot 4

訪問 [https://godotengine.org/download](https://godotengine.org/download)

選擇你的作業系統：
- **Windows** - 下載 `Godot_v4.x.x_win64.exe`
- **macOS** - 下載 `Godot_v4.x.x_macos.universal.zip`
- **Linux** - 下載 `Godot_v4.x.x_linux.x86_64`

### 2️⃣ 克隆或下載項目

```bash
# 使用 Git 克隆
git clone https://github.com/menke6211/DesktopCat.git
cd DesktopCat

# 或直接下載 ZIP
# 訪問 https://github.com/menke6211/DesktopCat
# 點擊 "Code" > "Download ZIP"
```

### 3️⃣ 在 Godot 中打開項目

1. 啟動 Godot
2. 點擊 "Open Project"
3. 瀏覽到 `DesktopCat` 文件夾
4. 點擊 "Select Current Folder"
5. 點擊 "Open" 打開項目

### 4️⃣ ⚠️ 添加必需的美術資源

**遊戲需要貓咪精靈表才能完整運作！**

#### 選項 A：使用你已有的精靈表

1. 將 `cat_sprite.png` 複製到 `assets/sprites/` 目錄
2. 確保文件名正確 (區分大小寫)
3. 精靈表應為 896x320 像素

#### 選項 B：下載免費精靈表

從以下網站下載貓咪精靈表：

1. **OpenGameArt.org**
   - 訪問 https://opengameart.org/
   - 搜索 "cat sprite"
   - 下載喜歡的精靈表

2. **itch.io**
   - 訪問 https://itch.io/game-assets/free
   - 搜索 "cat character"
   - 下載精靈表

3. **Kenney.nl**
   - 訪問 https://kenney.nl/assets
   - 下載 "Characters" 資源包

#### 選項 C：使用簡單的替代品

如果暫時沒有精靈表，可以用彩色方塊作為臨時替代：

1. 在 Godot 中創建簡單的 ColorRect 節點
2. 在 `scenes/Cat.gd` 中使用 `_draw()` 進行簡單繪製
3. 後期再替換為真正的精靈表

### 5️⃣ 配置動畫

在 Godot 編輯器中：

1. 打開 `File System` 面板
2. 瀏覽到 `assets/sprites/cat_sprite.png`
3. 右鍵點擊 > "Create SpriteFrames"
4. 在彈出的對話框中配置：
   - 動畫名稱 (walk_right, walk_left, idle_down, 等)
   - 每個動畫的幀數
   - 播放速度 (建議 8 FPS)
5. 保存為 `assets/animations/cat_animations.tres`

### 6️⃣ 開始遊戲

按 **F5** 或點擊編輯器上的 "Play" 按鈕

🎉 遊戲應該現在開始運行了！

## 🎨 精靈表配置詳解

### 精靈表結構

你的 `cat_sprite.png` 應該有以下結構：

```
┌──────┬──────┬──────┬──────┬──────┬──────┬──────┐  ← y=0
│Walk→ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │
├──────┼──────┼──────┼──────┼──────┼──────┼──────┤  ← y=64
│Walk← 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │
├──────┼──────┼───────────────────┼───────────────┤  ← y=128
│Walk↑ 1 │ 2 │ ... (14 frames) ... │
├──────┼──────┼───────────────────┼───────────────┤  ← y=192
│Walk↓ 1 │ 2 │ ... (14 frames) ... │
├──────┼──────┼──────┼──────┼──────┼──────┼──────┤  ← y=256
│Idle  1 │ 2 │ 3 │ 4 │ 5 │ ... │Sleep│
└──────┴──────┴──────┴──────┴──────┴──────┴──────┘
```

### 在 Godot 中創建 SpriteFrames

1. **創建動畫 "walk_right"**
   - 選擇第 1 行的前 7 幀
   - 設置循環播放
   - 速度: 8 FPS

2. **創建動畫 "walk_left"**
   - 選擇第 2 行的前 7 幀
   - 設置循環播放
   - 速度: 8 FPS

3. **創建動畫 "idle_down"**
   - 選擇第 5 行的前 8 幀
   - 設置循環播放
   - 速度: 4 FPS (更慢)

4. **類似配置其他動畫...**

## 🔊 添加音效

### 背景音樂

1. 將 MP3 或 OGG 文件放在 `assets/music/`
2. 在 `scenes/Main.tscn` 中添加 `AudioStreamPlayer` 節點
3. 設置 `Stream` 屬性為你的音樂文件
4. 啟用 "Playing" 選項

### 互動音效

1. 將 WAV 或 OGG 文件放在 `assets/sounds/`
2. 在 `scenes/Cat.gd` 中添加：

```gdscript
func play_sound(sound_name: String) -> void:
    var sound = load("res://assets/sounds/" + sound_name + ".ogg")
    var audio_player = AudioStreamPlayer.new()
    add_child(audio_player)
    audio_player.stream = sound
    audio_player.play()
    await audio_player.finished
    audio_player.queue_free()
```

3. 在互動函數中調用：
```gdscript
func feed() -> void:
    # ... 現有代碼 ...
    play_sound("eat")
```

## 📦 構建可執行文件

### Windows 構建

1. 在編輯器中：菜單 > Project > Export > Add Preset > Windows Desktop
2. 配置設置
3. 點擊 "Export Project"
4. 選擇輸出位置
5. 將生成 `.exe` 文件

### macOS 構建

1. 在編輯器中：菜單 > Project > Export > Add Preset > macOS
2. 配置設置
3. 點擊 "Export Project"
4. 將生成 `.dmg` 文件

### Linux 構建

1. 在編輯器中：菜單 > Project > Export > Add Preset > Linux/X.11
2. 配置設置
3. 點擊 "Export Project"
4. 將生成可執行文件

## 🚀 發佈到 Steam

1. **創建 Steamworks 帳號**
   - 訪問 https://steamcommunity.com/steamworks/
   - 填寫遊戲信息

2. **構建所有平台版本**
   - Windows (.exe)
   - macOS (.dmg)
   - Linux (binary)

3. **在 Steamworks 中上傳**
   - 進入 "Packages" 部分
   - 上傳構建文件
   - 配置應用設置

4. **設置商店頁面**
   - 添加描述和截圖
   - 設置價格
   - 上傳遊戲圖標

5. **提交審核**
   - Steam 通常需要 2-3 天審核

## 🆘 常見問題

### Q: 如何改變窗口大小？
A: 編輯 `godot_project.godot`：
```ini
[display]
window/size/viewport_width=1024
window/size/viewport_height=768
```

### Q: 如何添加新的互動按鈕？
A: 
1. 在 `scenes/Cat.gd` 中添加新函數
2. 在 `ui/GameUI.gd` 中連接按鈕
3. 在 `scenes/Main.tscn` 中添加 UI 按鈕

### Q: 如何改變貓咪的��動速度？
A: 編輯 `scenes/Cat.gd`：
```gdscript
const MOVE_SPEED = 50.0  # 改為你想要的速度
```

### Q: 如何禁用自動存檔？
A: 在 `scenes/Cat.gd` 中註釋掉保存代碼

## 📚 學習資源

- [Godot 官方文檔](https://docs.godotengine.org/)
- [Godot 教程](https://docs.godotengine.org/en/stable/community/tutorials.html)
- [GDScript 參考](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/index.html)

## ✅ 檢查列表

- [ ] 已安裝 Godot 4
- [ ] 已克隆項目
- [ ] 已下載/添加貓咪精靈表
- [ ] 已在 Godot 中打開項目
- [ ] 已配置動畫
- [ ] 已按 F5 測試遊戲
- [ ] 已構建可執行文件
- [ ] 已準備 Steam 發佈

---

**祝你好運！如有問題，請查看 GitHub Issues 或 Godot 社區論壇！** 🚀
