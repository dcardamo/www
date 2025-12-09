# Getting Started

Your photography portfolio and blog website is ready! Here's how to use it.

## ✅ What's Ready

- 📸 **Auto-discovering portfolio** from `src/content/www/`
- 📝 **Blog** with markdown posts
- 🎯 **4 Featured projects**: Street, Portraits, Wildlife, Travel/Japan
- 📊 **EXIF extraction** with rating-based cover selection
- 🎨 **Minimalist design**

## 🚀 Quick Start

### 1. Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:4321**

You should see:
- **Home page** with 4 featured projects
- **Portfolio** with all projects from `www/`
- **Blog** with welcome post

### 2. Your Photos Are Already There!

Your `src/content/www/` folder already has:
- Colour
- Nature
- Portraits
- Signs
- Street
- Travel (Japan, Miami, Ottawa)
- Wildlife

All these projects are **automatically discovered** and working!

## 📸 Lightroom Integration

### Current Setup
Your Lightroom is already publishing to `src/content/www/`. Perfect!

### Publishing More Photos
1. In Lightroom Classic: Select photos
2. Add to publish collection
3. Click **Publish**
4. Photos appear in `src/content/www/{collection}/`
5. **Refresh your browser** - new project appears!

No build needed for development (hot reload). Only build for production.

## 🎯 Featured Projects

Currently featured on homepage:
1. **Street** - Has metadata
2. **Portraits** - Has metadata
3. **Wildlife** - Has metadata
4. **Travel/Japan** - Has metadata

### Make Another Project Featured

```bash
# Create metadata for any existing project
mkdir -p src/content/photos/Signs
cat > src/content/photos/Signs/project.md << 'EOF'
---
title: "Signs"
description: "Urban signage photography"
date: 2024-01-01
featured: true
---

Collection of interesting signs and typography found in urban environments.
EOF
```

Refresh browser - Signs now shows on homepage!

## 📝 Blog Posts

### View Existing Post
Visit: http://localhost:4321/blog

### Add New Post

```bash
cat > src/content/blog/my-new-post.md << 'EOF'
---
title: "My Photography Journey"
description: "How I got started in photography"
pubDate: 2024-12-09
author: "Dan"
tags: ["photography", "personal"]
---

Write your blog content here in markdown...

## Heading

- List item
- Another item

![Alt text](image-url)
EOF
```

## 🎨 Customization

### Change Site Name
Edit `src/layouts/BaseLayout.astro`:
```astro
<a href="/" class="text-xl">
  Your Name Here  <!-- Change this -->
</a>
```

### EXIF Display
Edit `src/config/exif.ts`:
```typescript
defaultFields: ['model', 'lens', 'focalLength', 'fNumber', 'exposureTime', 'iso']
// Add or remove fields
```

### Colors
Edit `src/styles/global.css` for Tailwind customization.

## 🔧 Common Tasks

### Add Project Description
```bash
# For any existing project in www/
mkdir -p src/content/photos/Nature
nano src/content/photos/Nature/project.md
```

Add:
```yaml
---
title: "Nature Photography"  
description: "Beautiful natural scenes"
date: 2024-01-01
---

Additional description in markdown...
```

### Change Cover Image
In project.md:
```yaml
---
title: "My Project"
coverImage: "specific-photo.jpg"  # Override auto-selection
---
```

### Hide EXIF for Project
```yaml
---
title: "My Project"
exifDisplay: "off"  # on, off, or inherit
---
```

## 📦 Building for Production

```bash
# Build static site
npm run build

# Output in dist/ folder
# Deploy dist/ to your hosting
```

## 🐳 Docker Deployment

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 80:80 portfolio

# Visit http://localhost
```

## 📊 Project URLs

### Current Projects
- http://localhost:4321/portfolio/Street
- http://localhost:4321/portfolio/Portraits
- http://localhost:4321/portfolio/Wildlife
- http://localhost:4321/portfolio/Travel/Japan
- http://localhost:4321/portfolio/Colour
- http://localhost:4321/portfolio/Nature
- http://localhost:4321/portfolio/Signs
- http://localhost:4321/portfolio/Travel/Miami
- http://localhost:4321/portfolio/Travel/Ottawa

All auto-discovered from `www/`!

## 🎯 Key Concepts

### Projects Work Automatically
- Any folder in `www/` with photos = project
- No setup needed
- Cover image = highest rated (Lightroom stars)
- Title = folder name humanized

### Metadata is Optional
- Add metadata to:
  - Make project featured
  - Add description
  - Override title/cover
  - Control EXIF display

### Nested Folders
- `www/Travel/Japan/` is separate from `www/Travel/`
- Each subfolder = own project
- URL: `/portfolio/Travel/Japan`

## 🆘 Troubleshooting

### Project not showing?
- Check `src/content/www/{project}/` has photos
- Refresh browser (dev server has hot reload)
- Check for errors in console

### Cover image wrong?
- Add `coverImage: "filename.jpg"` to project.md
- Or rate photos in Lightroom (highest rated = cover)

### Not featured on homepage?
- Create `src/content/photos/{project}/project.md`
- Add `featured: true`

## 📚 Next Steps

1. ✅ Your photos are already visible!
2. Add descriptions to favorite projects
3. Write blog posts
4. Customize design
5. Deploy to https://dan.cardamore.ca

Enjoy your photography portfolio! 📸✨
