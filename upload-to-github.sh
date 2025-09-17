#!/bin/bash

# Upload files to GitHub repository
echo "🚀 Uploading files to GitHub repository..."

# Create a temporary directory for the upload
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Clone the repository using GitHub CLI
gh repo clone njt-design/fox-creek-hoa

cd fox-creek-hoa

# Copy all files from the current directory to the repository
cp -r /Users/h564537/Fox\ Creek/* .

# Add all files to git
git add .

# Commit the changes
git commit -m "Initial commit: Fox Creek HOA website with all features"

# Push to main branch
git push origin main

# Create production branch
git checkout -b prod
git push origin prod

echo "✅ Successfully uploaded to GitHub!"
echo "📁 Repository: https://github.com/njt-design/fox-creek-hoa"
echo "🌐 Main branch: https://github.com/njt-design/fox-creek-hoa/tree/main"
echo "🚀 Prod branch: https://github.com/njt-design/fox-creek-hoa/tree/prod"

# Clean up
cd /Users/h564537/Fox\ Creek
rm -rf "$TEMP_DIR"
