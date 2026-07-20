# Desktop Cat v0.1.0 🐱

一個簡單可愛的桌面透明貓咪寵物，可以拖曳、餵食、互動和睡覺！

## 功能特性 ✨

- 🐱 **透明桌面貓咪** - 在桌面上顯示一隻可愛的透明貓咪
- 🖱️ **拖曳移動** - 用滑鼠拖動貓咪到任何位置
- 🍖 **餵食系統** - 點擊餵食按鈕來降低飢餓度
- 🎾 **玩耍互動** - 和貓咪一起玩耍，提升快樂度
- 😴 **睡眠系統** - 讓貓咪睡覺來恢復能量
- 💾 **狀態保存** - 自動保存貓咪的位置和狀態
- 😊 **心情系統** - 根據飢餓度、能量和快樂度改變心情

## 快速開始 🚀

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm start
```

這會同時啟動 Vite 開發服務器和 Electron 應用。

### 構建

```bash
npm run build
npm run electron-build
```

## 文件結構 📁

```
.
├── src/
│   ├── main.ts              # Electron 主進程
│   ├── preload.ts          # IPC 預加載腳本
│   ├── App.vue             # Vue 主應用組件
│   ├── main.ts.old         # Vue 應用入口（待優化）
│   ├── main.css            # 全局樣式
│   ├── index.html          # HTML 模板
│   └── utils/
│       └── stateManager.ts # 貓咪狀態管理
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 技術棧 🛠️

- **Electron** - 跨平台桌面應用
- **Vue 3** - UI 框架
- **TypeScript** - 類型安全
- **Vite** - 前端構建工具
- **CSS** - 樣式和動畫

## 狀態管理 📊

貓咪有以下狀態：

- **飢餓度 (Hunger)** - 0-100，隨時間增加
- **能量 (Energy)** - 0-100，隨著玩耍減少，睡眠時恢復
- **快樂度 (Happiness)** - 0-100，通過玩耍和餵食增加
- **心情 (Mood)** - happy、hungry、sleepy、playing

## 待實現功能 🎯

- [ ] 更多互動方式
- [ ] 聲音效果
- [ ] 不同皮膚選擇
- [ ] 設置菜單
- [ ] 多語言支持
- [ ] 自動行為（遊走、清理等）

## 許可證 📄

MIT License
