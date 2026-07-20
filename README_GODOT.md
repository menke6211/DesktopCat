# 🐱 Desktop Cat v1.0 - Godot Edition

一個完整功能的桌面虛擬寵物貓遊戲，用 **Godot 4** 引擎製作。

## ✨ 功能特性

### 🎮 核心遊戲系統
- ✅ **精靈動畫系統** - 四向行走、待機、睡眠、進食、玩耍、梳毛
- ✅ **完整狀態管理** - 飢餓、能量、快樂、健康四大指標
- ✅ **AI 自動行為** - 隨機行走、坐下、睡眠、自我清理
- ✅ **互動系統** - 餵食、玩耍、睡眠、梳毛四種動作
- ✅ **心情系統** - 根據狀態自動切換 5 種心情
- ✅ **進度系統** - 等級系統和經驗值累積

### 🎨 視覺效果
- ✅ 漂亮的漸變紫色背景
- ✅ 實時狀態進度條
- ✅ 響應式 UI 設計
- ✅ 流暢的動畫過渡

### 💾 數據系統
- ✅ 自動存檔 (每 10 秒)
- ✅ 遊戲進度完全保存
- ✅ 下次啟動自動恢復

## 🚀 快速開始

### 系統需求
- **Godot 4.0 或更新版本**
- 最小 200MB 硬碟空間
- 任何主流作業系統 (Windows, macOS, Linux)

### 安裝步驟

1. **下載 Godot 4**
   - 訪問 https://godotengine.org/download
   - 下載 Godot 4.1 或更新版本

2. **打開項目**
   - 啟動 Godot
   - 點擊 "Open Project"
   - 選擇 `DesktopCat-Godot` 文件夾

3. **開始遊戲**
   - 按 F5 或點擊 "Play" 按鈕
   - 遊戲窗口會彈出

### 必需的美術資源

⚠️ **重要**: 遊戲需要貓咪精靈表才能完整運作！

1. **下載或製作 `cat_sprite.png`**
   - 放置在 `assets/sprites/` 目錄
   - 尺寸: 896x320 像素 (或相應倍數)
   - 格式: PNG (透明背景)

2. **配置動畫**
   - 在 Godot 編輯器中打開精靈表
   - 自動創建 SpriteFrames 資源
   - 根據下面的結構配置各個動畫

## 🎮 遊戲玩法

### 📊 狀態系統

| 狀態 | 範圍 | 說明 |
|------|------|------|
| 🍖 **飢餓度** | 0-100 | 隨時間增加，餵食時減少 |
| ⚡ **能量** | 0-100 | 活動時減少，睡眠時恢復 |
| 😊 **快樂度** | 0-100 | 互動時增加，忽視時減少 |
| ❤️ **健康度** | 0-100 | 梳毛增加，飢餓/疲勞時減少 |

### 🎯 互動按鈕

| 按鈕 | 效果 | 條件 |
|------|------|------|
| 🍖 **餵食** | 飢餓 -40, 快樂 +15 | 飢餓度 > 0 |
| 🎾 **玩耍** | 能量 -30, 快樂 +25 | 能量 > 20 |
| 😴 **睡眠** | 能量 +60, 快樂 +10 | 無限制 |
| 🧹 **梳毛** | 健康 +20, 快樂 +5 | 無限制 |

### 😊 心情系統

- **😊 開心** - 所有狀態良好
- **😋 飢餓** - 飢餓度 > 80
- **😴 困睡** - 能量 < 30  
- **🤩 興奮** - 正在玩耍
- **😠 不開心** - 快樂度 < 30

## 📂 項目結構

```
DesktopCat-Godot/
├── scenes/
│   ├── Cat.gd                      # 貓咪邏輯腳本
│   ├── Main.gd                     # 主場景邏輯
│   ├── Main.tscn                   # 主場景
│   └── Cat.tscn                    # 貓咪場景
├── ui/
│   └── GameUI.gd                   # UI 邏輯
├── assets/
│   ├── sprites/
│   │   └── cat_sprite.png          # 貓咪精靈表 ⚠️ 需要下載
│   ├── animations/
│   │   └── cat_animations.tres     # 動畫資源
│   ├── sounds/                     # 音效文件
│   ├── music/                      # 背景音樂
│   └── icon.svg                    # 應用圖標
├── export_presets.cfg              # 導出配置
├── godot_project.godot             # 項目配置
└── README_GODOT.md                 # 本文件
```

## 🎨 精靈表結構

`cat_sprite.png` 應該有以下結構 (共 896x320 像素):

```
第 1 行 (y=0-63): 向右行走 - 7 幀
第 2 行 (y=64-127): 向左行走 - 7 幀
第 3 行 (y=128-191): 向上行走 - 14 幀
第 4 行 (y=192-255): 向下行走 - 14 幀
第 5 行 (y=256-319): 待機和特殊 - 10+ 幀
  Frame 0-7: 待機坐姿
  Frame 8: 睡眠 (閉眼)
  Frame 9: 睡眠 (打哈欠)
```

## 🛠️ 構建和發佈

### 開發構建
```bash
# 在 Godot 編輯器中
按 F5 開始遊戲
```

### 發佈構建

#### Windows
```bash
godot --headless --export-release "Windows Desktop" bin/DesktopCat.exe
```

#### macOS
```bash
godot --headless --export-release "macOS" bin/DesktopCat.dmg
```

#### Linux
```bash
godot --headless --export-release "Linux/X.11" bin/DesktopCat
```

### Steam 發佈

1. 在 Steamworks 中創建新應用
2. 構建所有平台版本
3. 上傳構建文件
4. 設置應用頁面和資產
5. 提交審核

## 🎵 音效和音樂

### 添加背景音樂
1. 將 MP3/OGG 文件放在 `assets/music/`
2. 在 Main.tscn 中添加 AudioStreamPlayer 節點
3. 設置音樂文件並播放

### 添加音效
1. 將 WAV/OGG 文件放在 `assets/sounds/`
2. 在相應的遊戲事件中播放音效

## 🔧 開發指南

### 修改貓咪行為

編輯 `scenes/Cat.gd`:

```gdscript
const MOVE_SPEED = 50.0  # 移動速度 (像素/秒)
behavior_interval = randf_range(3.0, 8.0)  # 行為變換時間 (秒)
```

### 添加新動作

1. 在 `scenes/Cat.gd` 中添加新函數:
```gdscript
func new_action() -> void:
    current_action = "new_action"
    # 添加邏輯
    save_game()
```

2. 在 `ui/GameUI.gd` 中添加按鈕:
```gdscript
func _on_new_button_pressed() -> void:
    cat.new_action()
```

3. 在 Main.tscn 中添加 UI 按鈕

### 自定義動畫

1. 在 Godot 編輯器中打開精靈表
2. 右鍵 > 選擇 "Create SpriteFrames"
3. 配置每個動畫的幀數
4. 設置播放速度 (建議 6-10 FPS)

## 📦 資源下載

### 免費精靈圖來源
- [OpenGameArt.org](https://opengameart.org/) - 免費遊戲美術
- [itch.io](https://itch.io/game-assets/free) - 免費遊戲資源
- [Kenney.nl](https://kenney.nl/assets) - 高質量免費資源
- [OpenPixelProject](http://openpixelproject.com/) - 像素藝術資源

## 🐛 故障排除

### 問題: 貓咪不顯示
**解決方案**:
- 檢查 `cat_sprite.png` 是否在 `assets/sprites/` 目錄
- 確保文件名正確 (區分大小寫)
- 檢查 Godot 控制台是否有錯誤信息

### 問題: 動畫不播放
**解決方案**:
- 確認 `cat_animations.tres` 已正確配置
- 檢查精靈表的幀尺寸是否正確 (應為 64x64)
- 驗證動畫名稱與代碼中的匹配

### 問題: 保存不工作
**解決方案**:
- 檢查 `user://` 目錄的寫入權限
- 查看 Godot 的「輸出」面板中的錯誤
- 確保保存路徑正確

### 問題: 狀態不更新
**解決方案**:
- 檢查 `_physics_process()` 是否被調用
- 驗證 `update_state()` 中的邏輯
- 查看遊戲是否暫停

## 💡 遊戲提示

1. **定期互動** - 每天至少餵食一次，保持貓咪快樂
2. **平衡狀態** - 不要讓任何一個狀態過高或過低
3. **睡眠重要** - 當能量低時讓貓咪睡眠
4. **梳毛保健** - 定期梳毛保持貓咪健康
5. **升級獎勵** - 通過互動積累經驗值升級

## 🎯 未來計劃

- [ ] 🌙 晝夜循環系統
- [ ] 🏠 家居裝飾系統
- [ ] 🛍️ 商店系統 (購買食物、玩具)
- [ ] 🏆 成就系統
- [ ] 📷 截圖功能
- [ ] 🔊 音效和背景音樂
- [ ] 👥 多貓咪支持
- [ ] 💬 貓咪對話系統
- [ ] ⚙️ 設置菜單
- [ ] 🌐 多語言支持

## 📝 許可證

MIT License - 可自由使用、修改和分發

## 👤 開發者

menke6211

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

**享受和你的虛擬貓咪一起玩耍的時光！** 🐱💕
