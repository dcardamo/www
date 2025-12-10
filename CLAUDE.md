# Project Context for Claude Code

## Project Overview
This is Dan's personal photography website and blog built with Astro. The site showcases photography work and includes a blog for sharing thoughts and experiences about photography.

## Blog Post System

### Architecture
- **Framework**: Astro with content collections
- **Storage**: Markdown files in `src/content/blog/`
- **Schema**: Defined in `src/content/config.ts` using Zod validation
- **Routing**:
  - List page: `/blog` (`src/pages/blog/index.astro`)
  - Individual posts: `/blog/[slug]` (`src/pages/blog/[slug].astro`)

### Blog Post Frontmatter Structure
```yaml
---
title: "Post Title"
description: "Short description for previews"
pubDate: YYYY-MM-DD
author: "Dan"
status: "draft" | "published"  # New field
featured: false                 # Boolean for featured posts
tags: ["tag1", "tag2"]         # Optional tags
updatedDate: YYYY-MM-DD        # Optional - for updated posts
---
```

### Status System

**Draft Posts**:
- `status: draft` in frontmatter
- Not visible in blog list (`/blog`)
- Not accessible via URL (404 if visited directly)
- Default status for all new blog posts

**Published Posts**:
- `status: published` in frontmatter
- Visible in blog list
- Accessible via URL
- Shown to all visitors

## Blog Post Workflow

### 1. Brainstorming (Mobile)
Use Claude Code on mobile to create new blog post ideas:
```bash
# Create a new draft blog post
# File: src/content/blog/my-new-idea.md
```

**Default template**:
```markdown
---
title: "Working Title"
description: "Brief description"
pubDate: YYYY-MM-DD
author: "Dan"
status: "draft"
featured: false
tags: []
---

[Initial thoughts and ideas...]
```

### 2. Development (Desktop/Later)
- Open the draft post file
- Expand ideas, add content
- Add images if needed
- Refine title and description
- Add appropriate tags
- Keep `status: draft` while working

### 3. Publishing
When ready to publish:
- Review content for completeness
- Change `status: "draft"` to `status: "published"`
- Verify `pubDate` is correct
- Set `featured: true` if this should be highlighted
- Commit and push changes

### 4. Updates
For post-publication updates:
- Edit the content as needed
- Add or update `updatedDate: YYYY-MM-DD`
- Commit and push changes

## Important Reminders for Claude

1. **All new blog posts start as drafts** - Always set `status: "draft"` in new posts
2. **Default author is "Dan"** - Use this unless specified otherwise
3. **Date format**: Use YYYY-MM-DD format for dates
4. **Featured posts**: Only set `featured: true` when explicitly requested
5. **Tags**: Add relevant tags when creating posts
6. **Images**: Images are stored in `public/` directory and referenced with `/path/to/image.jpg`

## Common Tasks

### Creating a New Blog Post
```bash
# Template for new posts
---
title: "[Title Here]"
description: "[Description]"
pubDate: [Today's Date]
author: "Dan"
status: "draft"
featured: false
tags: ["photography", "tutorial"]  # Adjust as needed
---

[Content here]
```

### Publishing a Draft
Find and change:
```yaml
status: "draft"
```
To:
```yaml
status: "published"
```

### Listing All Drafts
Search for `status: "draft"` in `src/content/blog/` directory

## Development Branch
- **Current branch**: `claude/blog-post-status-01H1GodR2BZDoHzEdgpSFoTp`
- Always commit and push to this branch
- Use clear commit messages describing changes

## Project Structure
```
www/
├── src/
│   ├── content/
│   │   ├── blog/           # Blog post markdown files
│   │   └── config.ts       # Content collection schemas
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog list page
│   │   │   └── [slug].astro     # Individual post page
│   │   └── ...
│   ├── components/
│   │   ├── BlogPostCard.astro   # Blog post preview card
│   │   └── ...
│   └── layouts/
├── public/                 # Static assets (images, etc.)
└── CLAUDE.md              # This file
```

## Helpful Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Notes
- This site uses Astro's content collections for type-safe content management
- Blog posts are statically generated at build time
- All content is stored in markdown files with YAML frontmatter
- The site includes image galleries and blog functionality
