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
  try {
    console.log('🔍 Fetching all blog posts...')
    
    // Check if Supabase client is properly initialized
    if (!supabase) {
      console.error('❌ Supabase client not initialized')
      throw new Error('Supabase client not initialized')
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching blog posts:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      
      // Fallback to API route if direct Supabase call fails
      console.log('🔄 Trying fallback API route...')
      try {
        const response = await fetch('/api/blog-posts')
        if (!response.ok) {
          throw new Error(`API route failed: ${response.status}`)
        }
        const apiData = await response.json()
        console.log('✅ Blog posts fetched via API route:', apiData.length, 'posts')
        return apiData
      } catch (apiError) {
        console.error('❌ API route also failed:', apiError)
        throw new Error(`Database error: ${error.message}`)
      }
    }

    console.log('✅ Blog posts fetched successfully:', data?.length || 0, 'posts')
    return data || []
  } catch (error) {
    console.error('❌ Error in getAllBlogPosts:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to fetch blog posts: ${error.message}`)
    } else {
      throw new Error('Failed to fetch blog posts: Unknown error')
    }
  }
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
  try {
    console.log('Attempting to delete blog post with ID:', id)
    
    // Check if Supabase client is properly initialized
    if (!supabase) {
      console.error('Supabase client not initialized')
      throw new Error('Supabase client not initialized')
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error deleting blog post:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      throw new Error(`Database error: ${error.message}`)
    }

    console.log('Blog post deleted successfully')
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

// Image upload and management functions
export interface ImageUploadResult {
  success: boolean;
  publicUrl?: string;
  error?: string;
  filePath?: string;
}

export interface ImageUploadOptions {
  fileName?: string;
  folder?: string;
  maxSizeBytes?: number;
}

/**
 * Upload an image to Supabase storage and return the public URL
 * @param file - The image file to upload
 * @param options - Upload options including custom filename and folder
 * @returns Promise with upload result including public URL
 */
export async function uploadBlogImage(
  file: File, 
  options: ImageUploadOptions = {}
): Promise<ImageUploadResult> {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.'
      };
    }

    // Validate file size (default 5MB limit)
    const maxSize = options.maxSizeBytes || 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: `File size too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.`
      };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName = options.fileName || `${timestamp}-${randomString}.${fileExt}`;
    
    // Set folder path
    const folder = options.folder || 'blog-images';
    const filePath = `${folder}/${fileName}`;

    console.log('Uploading image:', { fileName, filePath, fileSize: file.size });

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return {
        success: false,
        error: `Upload failed: ${uploadError.message}`
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      return {
        success: false,
        error: 'Failed to get public URL for uploaded image'
      };
    }

    console.log('Image uploaded successfully:', urlData.publicUrl);

    return {
      success: true,
      publicUrl: urlData.publicUrl,
      filePath: filePath
    };

  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Get the public URL for an image stored in Supabase storage
 * @param filePath - The path to the file in storage
 * @returns The public URL or null if error
 */
export function getBlogImageUrl(filePath: string): string | null {
  try {
    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return data?.publicUrl || null;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return null;
  }
}

/**
 * Delete an image from Supabase storage
 * @param filePath - The path to the file in storage
 * @returns Promise with deletion result
 */
export async function deleteBlogImage(filePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from('blog-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return {
        success: false,
        error: error.message
      };
    }

    console.log('Image deleted successfully:', filePath);
    return { success: true };

  } catch (error) {
    console.error('Error deleting image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * List all images in the blog-images bucket
 * @param folder - Optional folder to filter by
 * @param limit - Maximum number of images to return
 * @returns Promise with list of image files
 */
export async function listBlogImages(folder?: string, limit: number = 50) {
  try {
    const { data, error } = await supabase.storage
      .from('blog-images')
      .list(folder || '', {
        limit: limit,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('Error listing images:', error);
      return { success: false, error: error.message };
    }

    // Add public URLs to each file
    const filesWithUrls = data?.map(file => {
      const filePath = folder ? `${folder}/${file.name}` : file.name;
      const publicUrl = getBlogImageUrl(filePath);
      return {
        ...file,
        filePath,
        publicUrl
      };
    }) || [];

    return {
      success: true,
      files: filesWithUrls
    };

  } catch (error) {
    console.error('Error listing images:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Upload multiple images at once
 * @param files - Array of files to upload
 * @param options - Upload options
 * @returns Promise with array of upload results
 */
export async function uploadMultipleBlogImages(
  files: File[], 
  options: ImageUploadOptions = {}
): Promise<ImageUploadResult[]> {
  const results: ImageUploadResult[] = [];
  
  for (const file of files) {
    const result = await uploadBlogImage(file, options);
    results.push(result);
  }
  
  return results;
}

/**
 * Create markdown image syntax from uploaded image
 * @param publicUrl - The public URL of the uploaded image
 * @param altText - Alt text for the image
 * @param title - Optional title for the image
 * @returns Markdown image syntax
 */
export function createImageMarkdown(publicUrl: string, altText: string = 'Image', title?: string): string {
  if (title) {
    return `![${altText}](${publicUrl} "${title}")`;
  }
  return `![${altText}](${publicUrl})`;
}

/**
 * Extract image URLs from markdown content
 * @param content - Markdown content
 * @returns Array of image URLs found in the content
 */
export function extractImageUrlsFromMarkdown(content: string): string[] {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const urls: string[] = [];
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    urls.push(match[2]);
  }
  
  return urls;
}

/**
 * Validate if a URL is a valid blog image URL from our storage
 * @param url - URL to validate
 * @returns Boolean indicating if URL is from our blog images storage
 */
export function isBlogImageUrl(url: string): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return false;
  
  return url.includes(`${supabaseUrl}/storage/v1/object/public/blog-images/`);
}



// Helper function to transform database data to match the old interface
export function transformBlogPost(dbPost: BlogPost): BlogPost {
  return dbPost
} 