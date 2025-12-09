# Dan Cardamore - Personal Website

A personal photography portfolio and blog built with Astro, featuring automatic EXIF extraction, Lightroom Classic integration, and auto-discovery of photo projects.

## Features

- 📸 **Auto-Discovering Portfolio**: Projects automatically discovered from photos
- 📝 **Blog**: Markdown-based blog posts with full formatting support
- 🎨 **Minimalist Design**: Clean, distraction-free presentation
- 📊 **EXIF Data**: Automatic extraction and display with rating-based cover selection
- 🚀 **Performance**: Static site generation with optimized images
- 🐳 **Docker Ready**: Production deployment with Docker + nginx
- 📂 **Lightroom Integration**: Direct publishing from Lightroom Classic

## Architecture

### Photo Storage (Lightroom Managed)
```
src/content/www/           # Lightroom publishes here
├── Street/                # Auto-discovered as project
├── Portraits/
├── Wildlife/
└── Travel/
    └── Japan/             # Nested folders = separate projects
```

### Metadata (Optional)
```
src/content/photos/        # Optional project metadata
├── Street/
│   └── project.md         # Featured project with description
├── Portraits/
│   └── project.md
└── Travel/
    └── Japan/
        └── project.md
```

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:4321
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Lightroom Workflow

### Setup
1. Configure **JF Folder Publisher** in Lightroom Classic
2. Set publish location to: `/path/to/project/src/content/www/`
3. Create publish collections

### Publishing Photos
1. Add photos to a publish collection (e.g., "Street", "Wildlife")
2. Click **Publish** in Lightroom
3. Photos appear in `src/content/www/{collection-name}/`
4. **Project auto-discovers** - no manual setup needed!

### Adding Metadata (Optional)
```bash
# After Lightroom publishes
./scripts/import-from-lightroom.sh

# Or manually create:
# src/content/photos/{project-name}/project.md
```

## Project Behavior

### Without Metadata
Projects automatically work with:
- **Title**: Auto-generated from folder name ("street" → "Street")
- **Cover**: Highest EXIF-rated photo, then first alphabetically  
- **Date**: Newest photo's EXIF date
- **Description**: None
- **Featured**: No (won't show on homepage)

### With Metadata
Override any auto-generated values:
```yaml
---
title: "Street Photography"
description: "Candid urban moments"
date: 2024-01-01
featured: true           # Show on homepage
coverImage: "IMG_001.jpg"  # Override auto-selection
exifDisplay: "on"
---

Additional markdown content here...
```

## Adding Content

### New Photo Project (Auto-Discovery)
1. **Lightroom**: Publish to `www/{project-name}/`
2. **Done!** Project appears automatically

### Featured Project (Needs Metadata)
```bash
mkdir -p src/content/photos/my-project
cat > src/content/photos/my-project/project.md << EOF
---
title: "My Project"
description: "Description here"
date: 2024-12-09
featured: true
---
EOF
```

### Blog Post
```bash
# Create: src/content/blog/my-post.md
---
title: "Post Title"
description: "Post description"
pubDate: 2024-12-09
author: "Dan"
tags: ["photography"]
---

Your content here...
```

## Configuration

### EXIF Display
Edit `src/config/exif.ts`:
```typescript
export const exifConfig = {
  defaultDisplay: true,
  defaultFields: ['model', 'lens', 'focalLength', 'fNumber', 'exposureTime', 'iso'],
  // ...
};
```

### Site Settings
Edit `astro.config.mjs`:
```javascript
export default defineConfig({
  site: "https://dan.cardamore.ca",
  // ...
});
```

## Deployment

### Docker
```bash
# Build image
docker build -t dan-portfolio .

# Run container
docker run -p 80:80 dan-portfolio
```

### Static Hosting
Deploy the `dist/` directory to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## Project Structure

```
/
├── src/
│   ├── content/
│   │   ├── www/           # Photos from Lightroom (Lightroom owns)
│   │   ├── photos/        # Optional metadata (you own)
│   │   └── blog/          # Blog posts
│   ├── components/        # UI components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Routes
│   ├── utils/             # EXIF extraction, project discovery
│   └── config/            # Configuration
├── scripts/               # Helper scripts
├── public/                # Static assets
└── astro.config.mjs       # Astro configuration
```

## Tech Stack

- **Framework**: [Astro 5](https://astro.build)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **EXIF**: [exifr](https://www.npmjs.com/package/exifr)
- **Deployment**: Docker + nginx
- **Content**: Markdown with frontmatter

## Key Features Explained

### Auto-Discovery
- Every folder in `www/` becomes a project
- Nested folders = separate projects (`Travel/Japan` is different from `Travel`)
- No manual configuration required

### Cover Image Selection
1. Manual: `coverImage` in project.md
2. Automatic: Highest EXIF Rating (from Lightroom stars)
3. Fallback: First alphabetically

### EXIF Display Cascade
1. Project-level: `exifDisplay` in project.md
2. Global: `defaultDisplay` in src/config/exif.ts

### Featured Projects
- Requires metadata file with `featured: true`
- Shows on homepage (up to 3 projects)
- All other projects visible on /portfolio

## Development

```bash
# Start dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Type check
npm run astro check
```

## License

© 2024 Dan Cardamore. All rights reserved.
