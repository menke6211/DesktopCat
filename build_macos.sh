#!/bin/bash
# Desktop Cat v1.0 - macOS 構建腳本

echo "🏗️  構建 Desktop Cat v1.0 - macOS 版本"

# 檢查 Godot 是否已安裝
if ! command -v godot &> /dev/null; then
    echo "❌ 錯誤: 未找到 Godot。請先安裝 Godot 4"
    echo "訪問: https://godotengine.org/download"
    exit 1
fi

echo "✅ 找到 Godot"

# 創建構建目錄
mkdir -p build/macos

echo "🔨 編譯 macOS 版本..."
godot --headless --export-release "macOS" "build/macos/DesktopCat.dmg"

if [ $? -eq 0 ]; then
    echo "✅ 構建成功！"
    echo "📦 生成文件: build/macos/DesktopCat.dmg"
else
    echo "❌ 構建失敗"
    exit 1
fi
