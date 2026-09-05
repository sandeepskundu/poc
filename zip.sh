#!/bin/bash

rm zipmtt_*

echo "🔍 Cleaning project (up to 4 levels deep)..."

# Delete directories
find . -maxdepth 4 -type d \( -name "node_modules" -o -name "build" -o -name "scrap" \) -prune -exec rm -rf '{}' +

# Delete files
find . -maxdepth 4 -type f -name "package-lock.json" -exec rm -f '{}' +

echo "✅ Cleanup completed"

# Create zip file with timestamp
ZIP_NAME="zipmtt_$(date +%d-%m-%y__%H-%M-%S).zip"

echo "📦 Creating zip: $ZIP_NAME"

zip -r "$ZIP_NAME" . -x "node_modules/*"

echo "✅ Zip created: $ZIP_NAME"