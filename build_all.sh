#!/bin/bash
# Desktop Cat v1.0 - 完整構建腳本 (所有平台)

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  🐱 Desktop Cat v1.0 - 完整構建系統  🐱   ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# 檢查 Godot
if ! command -v godot &> /dev/null; then
    echo "❌ 錯誤: 未找到 Godot 4"
    echo "請先從 https://godotengine.org/download 安裝 Godot 4"
    exit 1
fi

echo "✅ Godot 已找到"
echo ""

# 顯示菜單
echo "選擇要構建的平台:"
echo "1. Windows (.exe)"
echo "2. macOS (.dmg)"
echo "3. Linux (binary)"
echo "4. 全部構建"
echo ""
read -p "請輸入選擇 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🔨 構建 Windows 版本..."
        mkdir -p build/windows
        godot --headless --export-release "Windows Desktop" "build/windows/DesktopCat.exe"
        echo "✅ Windows 版本構建完成: build/windows/DesktopCat.exe"
        ;;
    2)
        echo ""
        echo "🔨 構建 macOS 版本..."
        mkdir -p build/macos
        godot --headless --export-release "macOS" "build/macos/DesktopCat.dmg"
        echo "✅ macOS 版本構建完成: build/macos/DesktopCat.dmg"
        ;;
    3)
        echo ""
        echo "🔨 構建 Linux 版本..."
        mkdir -p build/linux
        godot --headless --export-release "Linux/X.11" "build/linux/DesktopCat"
        chmod +x build/linux/DesktopCat
        echo "✅ Linux 版本構建完成: build/linux/DesktopCat"
        ;;
    4)
        echo ""
        echo "🔨 構建 Windows 版本..."
        mkdir -p build/windows
        godot --headless --export-release "Windows Desktop" "build/windows/DesktopCat.exe"
        echo "✅ Windows 版本完成"
        echo ""
        echo "🔨 構建 macOS 版本..."
        mkdir -p build/macos
        godot --headless --export-release "macOS" "build/macos/DesktopCat.dmg"
        echo "✅ macOS 版本完成"
        echo ""
        echo "🔨 構建 Linux 版本..."
        mkdir -p build/linux
        godot --headless --export-release "Linux/X.11" "build/linux/DesktopCat"
        chmod +x build/linux/DesktopCat
        echo "✅ Linux 版本完成"
        echo ""
        echo "✅ 所有平台構建完成！"
        ;;
    *)
        echo "❌ 無效選擇"
        exit 1
        ;;
esac

echo ""
echo "📦 所有文件位於 build/ 文件夾"
echo ""
