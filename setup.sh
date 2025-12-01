#!/bin/bash

# Habitica React Native - Setup Script
echo "🎮 Setting up Habitica React Native..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the habitica-rn directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 You can now run the app with:"
echo ""
echo "  npm start          - Start the Expo development server"
echo "  npm run android    - Run on Android emulator/device"
echo "  npm run ios        - Run on iOS simulator (macOS only)"
echo "  npm run web        - Run in web browser"
echo ""
echo "📱 Or scan the QR code with Expo Go app on your phone"
echo ""
echo "📚 Check out these files for more information:"
echo "  - README.md           - Project overview"
echo "  - QUICKSTART.md       - Quick start guide"
echo "  - PROJECT_SUMMARY.md  - Complete implementation details"
echo "  - COLOR_GUIDE.md      - Color scheme documentation"
echo ""
echo "Happy habit building! 🎯✨"
