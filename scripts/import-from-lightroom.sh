#!/bin/bash

# Import photos from Lightroom - Updated for www/ structure
# Lightroom publishes directly to src/content/www/
# This script optionally creates metadata in src/content/photos/

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Lightroom Photo Project Setup${NC}"
echo "================================"
echo ""
echo "Note: Lightroom should already have published photos to src/content/www/"
echo ""

# Check if www directory exists
if [ ! -d "src/content/www" ]; then
    echo -e "${YELLOW}Warning: src/content/www/ does not exist${NC}"
    echo "Make sure Lightroom is publishing to this directory"
    exit 1
fi

# List available project folders in www
echo "Available projects in src/content/www/:"
ls -1 src/content/www/
echo ""

# Prompt for project folder name
read -p "Enter the project folder name (from www/): " PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
    echo "Error: Project name cannot be empty"
    exit 1
fi

WWW_PATH="src/content/www/$PROJECT_NAME"
if [ ! -d "$WWW_PATH" ]; then
    echo "Error: Project $WWW_PATH does not exist"
    echo "Make sure Lightroom has published to this folder"
    exit 1
fi

# Count images
IMAGE_COUNT=$(find "$WWW_PATH" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | wc -l)
echo ""
echo -e "${GREEN}Found $IMAGE_COUNT images in $WWW_PATH${NC}"
echo ""

# Ask if user wants to create metadata
read -p "Create metadata file for this project? (y/n) [n]: " CREATE_METADATA
CREATE_METADATA=${CREATE_METADATA:-n}

if [[ ! "$CREATE_METADATA" =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${GREEN}Project ready!${NC}"
    echo ""
    echo "Your project will auto-discover with:"
    echo "  - Title: Auto-generated from folder name"
    echo "  - Cover: Highest rated photo"
    echo "  - Date: Newest photo date"
    echo ""
    echo "View at: http://localhost:4321/portfolio/$PROJECT_NAME"
    echo ""
    echo "Run 'npm run dev' to preview or 'npm run build' to build"
    exit 0
fi

# Create metadata
echo ""
echo "Creating metadata file..."
echo ""

# Prompt for metadata
read -p "Project title: " PROJECT_TITLE
read -p "Project description: " PROJECT_DESCRIPTION
read -p "Project date (YYYY-MM-DD) [$(date +%Y-%m-%d)]: " PROJECT_DATE
PROJECT_DATE=${PROJECT_DATE:-$(date +%Y-%m-%d)}

read -p "Featured on homepage? (true/false) [false]: " PROJECT_FEATURED
PROJECT_FEATURED=${PROJECT_FEATURED:-false}

read -p "Display EXIF data? (on/off/inherit) [inherit]: " EXIF_DISPLAY
EXIF_DISPLAY=${EXIF_DISPLAY:-inherit}

# Optional: specify cover image
echo ""
echo "Recent photos in project:"
find "$WWW_PATH" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -exec basename {} \; | head -10
echo ""
read -p "Specify cover image filename (or leave blank for auto-select): " COVER_IMAGE

# Create metadata directory
METADATA_PATH="src/content/photos/$PROJECT_NAME"
mkdir -p "$METADATA_PATH"

# Create project.md
cat > "$METADATA_PATH/project.md" << EOF
---
title: "$PROJECT_TITLE"
description: "$PROJECT_DESCRIPTION"
date: $PROJECT_DATE
featured: $PROJECT_FEATURED
${COVER_IMAGE:+coverImage: "$COVER_IMAGE"}
exifDisplay: "$EXIF_DISPLAY"
---

$PROJECT_DESCRIPTION

## About This Project

Add more details about this photography project here. You can use markdown formatting:

- Write about the location
- Describe the shooting conditions
- Share the story behind the photos
- Add any technical details you want to highlight

Edit this file at \`$METADATA_PATH/project.md\`
EOF

echo -e "${GREEN}✓ Created $METADATA_PATH/project.md${NC}"

# Summary
echo ""
echo -e "${GREEN}Import complete!${NC}"
echo ""
echo "Project details:"
echo "  - Photos: $IMAGE_COUNT images in $WWW_PATH"
echo "  - Metadata: $METADATA_PATH/project.md"
echo "  - Featured: $PROJECT_FEATURED"
echo ""
echo "Next steps:"
echo "1. Edit $METADATA_PATH/project.md to add more details"
echo "2. Run 'npm run build' to generate the site"
echo "3. Run 'npm run dev' to preview locally"
echo ""
echo "Your project will be available at: http://localhost:4321/portfolio/$PROJECT_NAME"
