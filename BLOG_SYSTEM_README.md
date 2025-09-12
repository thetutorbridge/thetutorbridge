# Blog System Documentation

## Overview

The Tutor Bridge blog system provides a complete content management solution with both a public-facing blog and an admin CMS for managing blog posts.

## Features

### Public Blog (`/blog`)
- **Blog Listing Page**: Displays all published blog posts with search and filtering
- **Individual Blog Posts**: Full article pages with markdown rendering
- **Search Functionality**: Search posts by title, content, author, or tags
- **Tag Filtering**: Filter posts by specific tags
- **Responsive Design**: Mobile-friendly interface
- **Related Posts**: Shows related articles based on tags
- **Social Sharing**: Share posts via native sharing or copy link

### Admin CMS (`/admin`)
- **Admin Dashboard**: Overview of blog statistics and quick actions
- **Blog Management**: List, search, and filter all blog posts
- **Post Editor**: Create and edit blog posts with rich features
- **Markdown Support**: Write content using markdown syntax
- **Preview Mode**: Preview posts before publishing
- **Bulk Operations**: Select and manage multiple posts
- **Status Management**: Draft and published post states

## File Structure

```
app/
├── blog/
│   ├── page.tsx                    # Main blog listing page
│   └── [slug]/
│       └── page.tsx                # Individual blog post page
├── admin/
│   ├── page.tsx                    # Admin dashboard
│   └── blog/
│       ├── page.tsx                # Blog management page
│       ├── new/
│       │   └── page.tsx            # New post editor
│       └── edit/[id]/
│           └── page.tsx            # Edit post page
lib/
└── blog.ts                         # Blog data and utilities
```

## Blog Data Structure

```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  featuredImage?: string;
  readTime: number;
  status: 'draft' | 'published';
}
```

## Usage

### Accessing the Blog
- **Public Blog**: Navigate to `/blog` to view all published posts
- **Admin CMS**: Navigate to `/admin` to access the management interface

### Creating a New Post
1. Go to `/admin/blog/new`
2. Fill in the post details:
   - Title (auto-generates slug)
   - Content (supports markdown)
   - Excerpt
   - Author
   - Tags
   - Featured image URL
   - Status (draft/published)
3. Use preview mode to see how the post will look
4. Save as draft or publish immediately

### Editing a Post
1. Go to `/admin/blog` to see all posts
2. Click the edit button on any post
3. Make your changes
4. Save or publish

### Managing Posts
- **Search**: Use the search bar to find specific posts
- **Filter**: Filter by status (all/published/draft)
- **Bulk Actions**: Select multiple posts for bulk operations
- **Delete**: Remove posts with confirmation dialogs

## Markdown Support

The blog system supports basic markdown syntax:

- **Headings**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Lists**: `- item` or `1. item`

## Sample Posts

The system includes 3 sample blog posts:
1. "How to Excel in Mathematics: A Complete Guide for Students"
2. "The Science of Effective Learning: Techniques That Actually Work"
3. "Career Planning for High School Students: Start Early, Succeed Often"

## Technical Details

### Data Storage
Currently uses in-memory storage with sample data. In a production environment, you would:
- Connect to a database (PostgreSQL, MongoDB, etc.)
- Implement proper data persistence
- Add user authentication for admin access
- Add image upload functionality

### Styling
- Uses Tailwind CSS for styling
- Responsive design with mobile-first approach
- Consistent with The Tutor Bridge brand colors

### Performance
- Client-side rendering for dynamic content
- Optimized image loading
- Efficient search and filtering

## Future Enhancements

- Database integration
- User authentication and authorization
- Image upload and management
- SEO optimization
- Analytics integration
- Email newsletter functionality
- Comments system
- Advanced markdown editor
- Post scheduling
- Categories and hierarchical organization

## Getting Started

1. Ensure all dependencies are installed
2. The blog system is ready to use with the sample data
3. Navigate to `/blog` to view the public blog
4. Navigate to `/admin` to access the CMS
5. Start creating and managing your blog posts!

## Support

For questions or issues with the blog system, please refer to the main project documentation or contact the development team. 