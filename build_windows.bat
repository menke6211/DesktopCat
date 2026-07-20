@echo off
REM Desktop Cat v1.0 - Windows 構建腳本

echo.
echo 🏗️  構建 Desktop Cat v1.0 - Windows 版本
echo.

REM 檢查 Godot 是否已安裝
where godot >nul 2>nul
if errorlevel 1 (
    echo ❌ 錯誤: 未找到 Godot。請先安裝 Godot 4
    pause
    exit /b 1
)

echo ✅ 找到 Godot
echo.

REM 創建構建目錄
if not exist "build\windows" mkdir build\windows

echo 🔨 編譯 Windows 版本...
echo.

godot --headless --export-release "Windows Desktop" "build\windows\DesktopCat.exe"

if %errorlevel% equ 0 (
    echo.
    echo ✅ 構建成功！
    echo 📦 生成文件: build\windows\DesktopCat.exe
    echo.
    echo 💡 下一步:
    echo 1. 進入 build\windows 文件夾
    echo 2. 雙擊 DesktopCat.exe 運行遊戲
    echo.
) else (
    echo.
    echo ❌ 構建失敗
    echo.
    pause
    exit /b 1
)

pause
