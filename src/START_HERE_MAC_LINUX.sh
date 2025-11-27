#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "============================================"
echo "  EAZYPG - Quick Start Installation"
echo "============================================"
echo ""
echo "This script will:"
echo " 1. Install all dependencies"
echo " 2. Start the development server"
echo ""
echo "Please wait..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo -e "${RED}ERROR: Node.js is not installed!${NC}"
    echo ""
    echo "Please download and install Node.js from:"
    echo "https://nodejs.org/"
    echo ""
    exit 1
fi

echo -e "${GREEN}Node.js found!${NC} Version:"
node --version
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    echo "This may take a few minutes..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${RED}ERROR: Installation failed!${NC}"
        echo "Please check your internet connection and try again."
        echo ""
        exit 1
    fi
else
    echo -e "${GREEN}Dependencies already installed!${NC}"
    echo ""
fi

echo ""
echo "============================================"
echo "  Starting Development Server..."
echo "============================================"
echo ""
echo -e "${GREEN}The browser will open automatically at:${NC}"
echo "http://localhost:5173"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

# Start the development server
npm run dev
