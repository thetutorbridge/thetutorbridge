import { supabase } from './supabase'
import type { Database } from './supabase'

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export interface BlogPostFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  featuredImage?: string;
  status: 'draft' | 'published';
}

// Utility functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data || []
}

export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data || []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .contains('tags', [tag])
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts by tag:', error)
    return []
  }

  return data || []
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error searching blog posts:', error)
    return []
  }

  return data || []
}

export async function createBlogPost(postData: BlogPostFormData): Promise<BlogPost | null> {
  try {
    console.log('Starting createBlogPost with data:', postData)
    
    // Validate required fields
    if (!postData.title?.trim()) {
      throw new Error('Title is required')
    }
    if (!postData.content?.trim()) {
      throw new Error('Content is required')
    }
    if (!postData.author?.trim()) {
      throw new Error('Author is required')
    }
    if (!postData.excerpt?.trim()) {
      throw new Error('Excerpt is required')
    }
    
    const readTime = calculateReadTime(postData.content)
    const slug = generateSlug(postData.title)

    console.log('Calculated read time:', readTime)
    console.log('Generated slug:', slug)

    const insertData: BlogPostInsert = {
      title: postData.title.trim(),
      slug,
      excerpt: postData.excerpt.trim(),
      content: postData.content.trim(),
      author: postData.author.trim(),
      tags: postData.tags || [],
      featured_image: postData.featuredImage?.trim() || null,
      read_time: readTime,
      status: postData.status,
      published_at: postData.status === 'published' ? new Date().toISOString() : null
    }

    console.log('Prepared insert data:', insertData)
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Supabase key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    // Check if Supabase client is properly initialized
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Supabase error creating blog post:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      throw new Error(`Database error: ${error.message}`)
    }

    console.log('Blog post created successfully:', data)
    return data
  } catch (error) {
    console.error('Error in createBlogPost:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to create blog post: ${error.message}`)
    } else {
      throw new Error('Failed to create blog post: Unknown error')
    }
  }
}

export async function updateBlogPost(id: string, postData: BlogPostFormData): Promise<BlogPost | null> {
  const readTime = calculateReadTime(postData.content)
  const slug = generateSlug(postData.title)

  const updateData: BlogPostUpdate = {
    title: postData.title,
    slug,
    excerpt: postData.excerpt,
    content: postData.content,
    author: postData.author,
    tags: postData.tags,
    featured_image: postData.featuredImage || null,
    read_time: readTime,
    status: postData.status,
    published_at: postData.status === 'published' ? new Date().toISOString() : null
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating blog post:', error)
    return null
  }

  return data
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    return false
  }

  return true
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to transform database data to match the old interface
export function transformBlogPost(dbPost: BlogPost): BlogPost {
  return dbPost
} 