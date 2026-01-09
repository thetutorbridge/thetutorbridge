# Static Blog System for TheTutorBridge

This document explains how to use the new static blog system that replaces the database integration.

## Overview

The blog system now uses static markdown files stored in the `content/blog/` directory instead of a database. This makes it easy to create and manage blog posts directly from your code editor (like Cursor) without needing database setup.

## How It Works

### 1. Blog Post Storage
- Blog posts are stored as markdown files in `content/blog/`
- Each file has frontmatter (YAML metadata) at the top
- The content below is the actual blog post in markdown format

### 2. File Naming Convention
- Files should be named using the slug: `slug-name.md`
- Example: `welcome-to-thetutorbridge.md`

### 3. Frontmatter Structure
Each blog post must have this frontmatter structure:

```yaml
---
id: unique-post-id
title: "Your Blog Post Title"
slug: your-blog-post-slug
excerpt: "Brief description of your blog post"
author: "Author Name"
tags: ["tag1", "tag2", "tag3"]
featured_image: "/path/to/image.jpg"
read_time: 5
status: "published"
published_at: "2026-01-15T10:00:00Z"
created_at: "2026-01-15T10:00:00Z"
---
```

## Creating a New Blog Post

### Method 1: Using the Admin Interface
1. Go to `/admin/blog/new`
2. Fill out the form
3. Click "Create Post"
4. The system will automatically create a markdown file

### Method 2: Creating Manually in Cursor
1. Create a new `.md` file in `content/blog/`
2. Add the frontmatter with all required fields
3. Write your content below in markdown format
4. Save the file

## Frontmatter Fields Explained

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `id` | Yes | Unique identifier for the post | `welcome-post` |
| `title` | Yes | The title of your blog post | `"Welcome to TheTutorBridge"` |
| `slug` | Yes | URL-friendly version of title | `welcome-to-thetutorbridge` |
| `excerpt` | Yes | Brief summary (shown in listings) | `"Discover our platform..."` |
| `author` | Yes | Author name | `"The Tutor Bridge Team"` |
| `tags` | No | Array of tags for categorization | `["education", "tutoring"]` |
| `featured_image` | No | Path to featured image | `"/bannerHome4.jpg"` |
| `read_time` | No | Estimated reading time in minutes | `5` |
| `status` | Yes | `"draft"` or `"published"` | `"published"` |
| `published_at` | No | Publication date (ISO format) | `"2026-01-15T10:00:00Z"` |
| `created_at` | No | Creation date (ISO format) | `"2026-01-15T10:00:00Z"` |

## Default Values

If you don't specify certain fields, the system will use these defaults:
- `featured_image`: `/resources.jpg` or `/bannerHome4.jpg`
- `author`: "The Tutor Bridge"
- `status`: "published"
- `read_time`: Automatically calculated from content
- `created_at` and `published_at`: Current timestamp

## Markdown Content

Write your blog post content below the frontmatter using standard markdown:

```markdown
# Main Heading

## Subheading

This is a paragraph with **bold text** and *italic text*.

### Lists
- Item 1
- Item 2
- Item 3

### Links
[Link text](https://example.com)

### Images
![Alt text](/path/to/image.jpg)
```

## Managing Blog Posts

### Viewing Posts
- Public posts: `/blog`
- Individual post: `/blog/[slug]`
- Admin view: `/admin/blog`

### Editing Posts
- Go to `/admin/blog/edit/[id]`
- Make changes
- Save updates

### Deleting Posts
- Use the delete button in `/admin/blog`
- This will remove the markdown file

## Image Management

### Featured Images
- Store images in the `public/` directory
- Reference them with paths like `/bannerHome4.jpg`
- Supported formats: JPG, PNG, GIF, WebP

### Inline Images
- Use standard markdown image syntax
- Images can be stored locally or referenced from external URLs

## Benefits of Static System

1. **No Database Required**: Works without database setup
2. **Version Control**: Blog posts are tracked in git
3. **Easy Editing**: Use any text editor or Cursor
4. **Fast Performance**: No database queries
5. **Portable**: Easy to backup and migrate
6. **SEO Friendly**: Static files are great for search engines

## Migration from Database

If you had existing blog posts in a database:
1. Export the data
2. Convert to markdown format
3. Add proper frontmatter
4. Place files in `content/blog/`

## Troubleshooting

### Post Not Appearing
- Check that `status` is set to `"published"`
- Verify the markdown file is in `content/blog/`
- Ensure frontmatter is properly formatted

### Image Not Loading
- Check image path in `public/` directory
- Verify file permissions
- Use absolute paths from public directory

### Markdown Not Rendering
- Ensure content is below the frontmatter
- Check markdown syntax
- Verify the file has `.md` extension

## Example Blog Post

Here's a complete example of a blog post file:

```markdown
---
id: study-tips-post
title: "10 Effective Study Techniques That Actually Work"
slug: effective-study-techniques
excerpt: "Discover proven study methods that can transform your learning experience and help you achieve better grades with less stress."
author: "Dr. Priya Sharma"
tags: ["study-tips", "academic-success", "learning-methods", "productivity"]
featured_image: "/resources.jpg"
read_time: 8
status: "published"
published_at: "2026-01-20T14:30:00Z"
created_at: "2026-01-20T14:30:00Z"
---

# 10 Effective Study Techniques That Actually Work

Your blog post content goes here...

## Section 1

More content...

## Section 2

Even more content...
```

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify file permissions and paths
3. Ensure all required frontmatter fields are present
4. Check that markdown syntax is correct

The system is designed to be simple and reliable. Happy blogging! 📚✨
