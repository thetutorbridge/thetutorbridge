export interface BlogPost {
  id: string
  title: string
  slug: string
  content: any // JSONB content from TipTap
  excerpt: string | null
  featured_image: string | null
  author_name: string | null
  author_avatar: string | null
  author_linkedin: string | null
  status: 'draft' | 'published'
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  tags: string[]
  view_count: number
  created_at: string
  updated_at: string
}

export interface BlogPostFormData {
  title: string
  slug?: string
  excerpt?: string
  content: any // JSONB content from TipTap
  author_name?: string
  author_avatar?: string
  author_linkedin?: string
  tags?: string[]
  featured_image?: string
  status: 'draft' | 'published'
  meta_title?: string
  meta_description?: string
}

// Get all blog posts from API
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/api/blog/posts')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const posts = await response.json()
    return posts || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Get all blog posts for admin (including drafts)
export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/api/blog/posts?admin=true')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const posts = await response.json()
    return posts || []
  } catch (error) {
    console.error('Error fetching admin blog posts:', error)
    return []
  }
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blog/posts/${encodeURIComponent(slug)}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const post = await response.json()
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

// Get blog post by ID
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blog/posts/id/${encodeURIComponent(id)}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const post = await response.json()
    return post
  } catch (error) {
    console.error('Error fetching blog post by ID:', error)
    return null
  }
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.tags.includes(tag))
}

// Search blog posts
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  const searchTerm = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

// Create a new blog post via API
export async function createBlogPost(postData: BlogPostFormData): Promise<BlogPost | null> {
  try {
    const response = await fetch('/api/blog/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error in createBlogPost:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to create blog post: ${error.message}`)
    } else {
      throw new Error('Failed to create blog post: Unknown error')
    }
  }
}

// Update an existing blog post via API
export async function updateBlogPost(id: string, postData: BlogPostFormData): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blog/posts/id/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error in updateBlogPost:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to update blog post: ${error.message}`)
    } else {
      throw new Error('Failed to update blog post: Unknown error')
    }
  }
}

// Delete a blog post via API
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/blog/posts/id/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error('Error in deleteBlogPost:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete blog post: ${error.message}`)
    } else {
      throw new Error('Failed to delete blog post: Unknown error')
    }
  }
}

// Utility functions
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Image management functions
export interface ImageUploadResult {
  success: boolean
  publicUrl?: string
  fileName?: string
  error?: string
}

export async function uploadBlogImage(file: File): Promise<ImageUploadResult> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/blog/upload-image', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.error || 'Upload failed'
      }
    }

    const result = await response.json()
    return {
      success: true,
      publicUrl: result.publicUrl,
      fileName: result.fileName
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Helper function to transform data to match the interface
export function transformBlogPost(post: BlogPost): BlogPost {
  return post
} 