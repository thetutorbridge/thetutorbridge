import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  author_linkedin: string;
  author_image: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  view_count: number;
  read_time: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
}

// Get all blog posts
export function getAllBlogPosts(includeUnpublished: boolean = false): BlogPost[] {
  try {
    // Ensure directory exists
    if (!fs.existsSync(blogDirectory)) {
      console.warn('Blog directory does not exist:', blogDirectory)
      return []
    }

    const fileNames = fs.readdirSync(blogDirectory)
    const allPosts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(blogDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          id: slug,
          title: data.title || '',
          slug: data.slug || slug,
          excerpt: data.excerpt || '',
          content: content,
          featured_image: data.featured_image || '',
          author_name: data.author_name || '',
          author_linkedin: data.author_linkedin || '',
          author_image: data.author_image || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          status: data.status || 'published',
          published_at: data.published_at || null,
          created_at: data.created_at || '',
          updated_at: data.updated_at || '',
          view_count: data.view_count || 0,
          read_time: data.read_time || 0,
          meta_title: data.meta_title || data.title || '',
          meta_description: data.meta_description || data.excerpt || '',
          meta_keywords: Array.isArray(data.meta_keywords) ? data.meta_keywords : [],
        }
      })

    // Filter by status
    const filteredPosts = includeUnpublished
      ? allPosts
      : allPosts.filter(post => post.status === 'published')

    // Sort by published_at date (most recent first)
    return filteredPosts.sort((a, b) => {
      const dateA = a.published_at ? new Date(a.published_at).getTime() : 0
      const dateB = b.published_at ? new Date(b.published_at).getTime() : 0
      return dateB - dateA
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

// Get a single blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      console.warn('Blog post not found:', slug)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      id: slug,
      title: data.title || '',
      slug: data.slug || slug,
      excerpt: data.excerpt || '',
      content: content,
      featured_image: data.featured_image || '',
      author_name: data.author_name || '',
      author_linkedin: data.author_linkedin || '',
      author_image: data.author_image || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      status: data.status || 'published',
      published_at: data.published_at || null,
      created_at: data.created_at || '',
      updated_at: data.updated_at || '',
      view_count: data.view_count || 0,
      read_time: data.read_time || 0,
      meta_title: data.meta_title || data.title || '',
      meta_description: data.meta_description || data.excerpt || '',
      meta_keywords: Array.isArray(data.meta_keywords) ? data.meta_keywords : [],
    }
  } catch (error) {
    console.error('Error reading blog post:', slug, error)
    return null
  }
}

// Get all blog slugs for static generation
export function getAllBlogSlugs(): string[] {
  try {
    if (!fs.existsSync(blogDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(blogDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error getting blog slugs:', error)
    return []
  }
}

// Get related posts based on tags
export function getRelatedPosts(post: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts()

  // Exclude current post
  const otherPosts = allPosts.filter(p => p.slug !== post.slug)

  // Find posts with overlapping tags
  const tagMatches = otherPosts.filter(p =>
    p.tags && post.tags && p.tags.some(tag => post.tags.includes(tag))
  )

  // If we have enough tag matches, return them
  if (tagMatches.length >= limit) {
    return tagMatches.slice(0, limit)
  }

  // Otherwise, return most recent posts
  return otherPosts.slice(0, limit)
}
