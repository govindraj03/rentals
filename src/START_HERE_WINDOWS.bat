@echo off
color 0A
title Eazypg - Quick Start

echo.
echo ============================================
echo   EAZYPG - Quick Start Installation
echo ============================================
echo.
echo This script will:
echo  1. Install all dependencies
echo  2. Start the development server
echo.
echo Please wait...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js found! Version:
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Installation failed!
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed!
    echo.
)

echo.
echo ============================================
echo   Starting Development Server...
echo ============================================
echo.
echo The browser will open automatically at:
echo http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
call npm run dev

pause
