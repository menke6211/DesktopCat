# Desktop Cat v1.0 - Godot 版本
# 完整的虛擬寵物貓遊戲

## 📋 快速開始

### 1️⃣ 下載並安裝 Godot 4
訪問: https://godotengine.org/download
下載 Godot 4.1 或更新版本

### 2️⃣ 打開此項目
1. 啟動 Godot
2. 點擊 "Open Project"
3. 選擇此文件夾
4. 點擊 "Open"

### 3️⃣ 添加貓咪精靈表 (重要!)
將你的 `cat_sprite.png` 複製到 `assets/sprites/` 文件夾
- 尺寸: 896 x 320 像素
- 格式: PNG (透明背景)

### 4️⃣ 配置動畫
1. 在 Godot 中打開 `assets/sprites/cat_sprite.png`
2. 右鍵 > "Create SpriteFrames"
3. 按照下列配置:
   - walk_right: 7幀 @ 8 FPS
   - walk_left: 7幀 @ 8 FPS
   - walk_up: 14幀 @ 8 FPS
   - walk_down: 14幀 @ 8 FPS
   - idle_down: 8幀 @ 4 FPS
   - sleep: 4幀 @ 2 FPS
4. 保存為 `assets/animations/cat_animations.tres`

### 5️⃣ 運行遊戲
按 F5 或點擊 "Play" 按鈕

## 🎮 遊戲說明

- 拖動貓咪移動位置
- 🍖 餵食: 降低飢餓度
- 🎾 玩耍: 增加快樂度
- 😴 睡眠: 恢復能量
- 🧹 梳毛: 增加健康度

## 📚 詳細文檔

- `README_GODOT.md` - 完整中文說明
- `GODOT_SETUP_GUIDE.md` - 詳細設置指南

## 🚀 構建發佈版本

### Windows
菜單 > Project > Export > Add Preset > Windows Desktop
點擊 "Export Project"

### macOS  
菜單 > Project > Export > Add Preset > macOS
點擊 "Export Project"

### Linux
菜單 > Project > Export > Add Preset > Linux/X.11
點擊 "Export Project"

## 📂 文件結構

```
DesktopCat-Godot/
├── scenes/
│   ├── Cat.gd                 # 貓咪遊戲邏輯
│   ├── Cat.tscn               # 貓咪場景
│   ├── Main.gd                # 主場景邏輯
│   └── Main.tscn              # 主場景
├── ui/
│   └── GameUI.gd              # UI 控制邏輯
├── assets/
│   ├── sprites/
│   │   ├── cat_sprite.png     # 🌟 需要下載/添加
│   │   └── README.md
│   ├── animations/
│   │   └── cat_animations.tres # 動畫資源
│   ├── sounds/                # 音效文件夾
│   └── music/                 # 音樂文件夾
├── godot_project.godot        # 項目配置
├── export_presets.cfg         # 導出配置
├── README.md                  # 本文件
├── README_GODOT.md            # 詳細中文說明
└── GODOT_SETUP_GUIDE.md       # 完整設置指南
```

## ⚙️ 系統需求

- Godot 4.0 或更新版本
- 最小 200MB 硬碟空間
- 任何主流作業系統 (Windows, macOS, Linux)

## 🎯 功能特性

✅ 精靈動畫系統 - 四向行走、待機、睡眠等
✅ AI 行為系統 - 自動行走、坐下、睡眠、梳毛
✅ 完整狀態管理 - 飢餓、能量、快樂、健康
✅ 心情系統 - 5 種不同心情
✅ 進度系統 - 等級和經驗值
✅ 自動存檔 - 每 10 秒保存一次
✅ 響應式 UI - 美觀的遊戲界面

## 📥 資源下載

### 貓咪精靈表
免費下載地點:
- https://opengameart.org/ (搜索 "cat sprite")
- https://itch.io/game-assets (搜索 "cat character")
- https://kenney.nl/assets (下載 Characters 包)

### 音效和音樂
- https://freesound.org/
- https://incompetech.com/
- https://opengameart.org/

## 🐛 問題排除

**遊戲不啟動?**
- 確保 Godot 版本為 4.0+
- 檢查 `godot_project.godot` 文件完整性

**看不到貓咪?**
- 檢查 `cat_sprite.png` 是否在 `assets/sprites/` 文件夾
- 檢查動畫是否正確配置

**狀態不更新?**
- 檢查 `Cat.gd` 是否正確附加到場景
- 查看 Godot 控制台的錯誤信息

## 🎓 學習資源

- Godot 官方文檔: https://docs.godotengine.org/
- GDScript 教程: https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/
- Godot 社區論壇: https://forum.godotengine.org/

## 📜 許可證

MIT License - 可自由使用、修改和分發

## 👨‍💻 開發者

menke6211

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request!

---

**享受和你的虛擬貓咪一起玩耍的時光！🐱💕**

需要幫助? 查看 `GODOT_SETUP_GUIDE.md` 或訪問 GitHub Issues
