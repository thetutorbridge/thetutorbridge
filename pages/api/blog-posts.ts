import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

// Ensure blog directory exists
function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }
}

// Get all blog posts from markdown files
function getAllBlogPosts() {
  try {
    ensureBlogDir()
    
    if (!fs.existsSync(BLOG_DIR)) {
      return []
    }

    const files = fs.readdirSync(BLOG_DIR)
    const posts = []

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(BLOG_DIR, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        
        if (data.status === 'published') {
          const post = {
            id: data.id || file.replace('.md', ''),
            title: data.title || 'Untitled',
            slug: data.slug || file.replace('.md', ''),
            excerpt: data.excerpt || '',
            content: content,
            author: data.author || 'The Tutor Bridge',
            tags: data.tags || [],
            featured_image: data.featured_image || data.featuredImage || '/resources.jpg',
            read_time: data.read_time || calculateReadTime(content),
            status: data.status || 'published',
            published_at: data.published_at || data.date || new Date().toISOString(),
            created_at: data.created_at || data.date || new Date().toISOString()
          }
          posts.push(post)
        }
      }
    }

    // Sort by published date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at)
      const dateB = new Date(b.published_at || b.created_at)
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

// Get all blog posts for admin (including drafts)
function getAllBlogPostsAdmin() {
  try {
    ensureBlogDir()
    
    if (!fs.existsSync(BLOG_DIR)) {
      return []
    }

    const files = fs.readdirSync(BLOG_DIR)
    const posts = []

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(BLOG_DIR, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        
        const post = {
          id: data.id || file.replace('.md', ''),
          title: data.title || 'Untitled',
          slug: data.slug || file.replace('.md', ''),
          excerpt: data.excerpt || '',
          content: content,
          author: data.author || 'The Tutor Bridge',
          tags: data.tags || [],
          featured_image: data.featured_image || data.featuredImage || '/resources.jpg',
          read_time: data.read_time || calculateReadTime(content),
          status: data.status || 'published',
          published_at: data.published_at || data.date || new Date().toISOString(),
          created_at: data.created_at || data.date || new Date().toISOString()
        }
        posts.push(post)
      }
    }

    // Sort by created date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

// Get blog post by slug
function getBlogPostBySlug(slug: string) {
  try {
    ensureBlogDir()
    
    if (!fs.existsSync(BLOG_DIR)) {
      return null
    }

    const files = fs.readdirSync(BLOG_DIR)
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(BLOG_DIR, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)
        
        if (data.slug === slug && data.status === 'published') {
          return {
            id: data.id || file.replace('.md', ''),
            title: data.title || 'Untitled',
            slug: data.slug || file.replace('.md', ''),
            excerpt: data.excerpt || '',
            content: content,
            author: data.author || 'The Tutor Bridge',
            tags: data.tags || [],
            featured_image: data.featured_image || data.featuredImage || '/resources.jpg',
            read_time: data.read_time || calculateReadTime(content),
            status: data.status || 'published',
            published_at: data.published_at || data.date || new Date().toISOString(),
            created_at: data.created_at || data.date || new Date().toISOString()
          }
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error reading blog post:', error)
    return null
  }
}

// Utility functions
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Create a new blog post (save as markdown file)
function createBlogPost(postData: any) {
  try {
    ensureBlogDir()
    
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
    const id = generateId()
    const now = new Date().toISOString()

    const post = {
      id,
      title: postData.title.trim(),
      slug,
      excerpt: postData.excerpt.trim(),
      content: postData.content.trim(),
      author: postData.author.trim(),
      tags: postData.tags || [],
      featured_image: postData.featuredImage?.trim() || '/resources.jpg',
      read_time: readTime,
      status: postData.status,
      published_at: postData.status === 'published' ? now : null,
      created_at: now
    }

    // Create frontmatter
    const frontmatter = matter.stringify(postData.content.trim(), {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      author: post.author,
      tags: post.tags,
      featured_image: post.featured_image,
      read_time: post.read_time,
      status: post.status,
      published_at: post.published_at,
      created_at: post.created_at
    })

    // Save to file
    const fileName = `${slug}.md`
    const filePath = path.join(BLOG_DIR, fileName)
    fs.writeFileSync(filePath, frontmatter)

    console.log('Blog post created successfully:', filePath)
    return post
  } catch (error) {
    console.error('Error in createBlogPost:', error)
    throw error
  }
}

// Update an existing blog post
function updateBlogPost(id: string, postData: any) {
  try {
    ensureBlogDir()
    
    if (!fs.existsSync(BLOG_DIR)) {
      throw new Error('Blog directory does not exist')
    }

    const files = fs.readdirSync(BLOG_DIR)
    let existingFile = null
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(BLOG_DIR, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContent)
        
        if (data.id === id) {
          existingFile = { name: file, path: filePath }
          break
        }
      }
    }

    if (!existingFile) {
      throw new Error('Blog post not found')
    }

    const readTime = calculateReadTime(postData.content)
    const slug = generateSlug(postData.title)
    const now = new Date().toISOString()

    const post = {
      id,
      title: postData.title.trim(),
      slug,
      excerpt: postData.excerpt.trim(),
      content: postData.content.trim(),
      author: postData.author.trim(),
      tags: postData.tags || [],
      featured_image: postData.featuredImage?.trim() || '/resources.jpg',
      read_time: readTime,
      status: postData.status,
      published_at: postData.status === 'published' ? now : null,
      created_at: now
    }

    // Create frontmatter
    const frontmatter = matter.stringify(postData.content.trim(), {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      author: post.author,
      tags: post.tags,
      featured_image: post.featured_image,
      read_time: post.read_time,
      status: post.status,
      published_at: post.published_at,
      created_at: post.created_at
    })

    // Update file
    const newFileName = `${slug}.md`
    const newFilePath = path.join(BLOG_DIR, newFileName)
    
    // Delete old file if filename changed
    if (existingFile.name !== newFileName) {
      fs.unlinkSync(existingFile.path)
    }
    
    // Write new file
    fs.writeFileSync(newFilePath, frontmatter)

    console.log('Blog post updated successfully:', newFilePath)
    return post
  } catch (error) {
    console.error('Error in updateBlogPost:', error)
    throw error
  }
}

// Delete a blog post
function deleteBlogPost(id: string) {
  try {
    ensureBlogDir()
    
    if (!fs.existsSync(BLOG_DIR)) {
      throw new Error('Blog directory does not exist')
    }

    const files = fs.readdirSync(BLOG_DIR)
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(BLOG_DIR, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContent)
        
        if (data.id === id) {
          fs.unlinkSync(filePath)
          console.log('Blog post deleted successfully:', filePath)
          return true
        }
      }
    }

    throw new Error('Blog post not found')
  } catch (error) {
    console.error('Error in deleteBlogPost:', error)
    throw error
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req

  try {
    switch (method) {
      case 'GET':
        if (query.slug) {
          // Get single post by slug
          const post = getBlogPostBySlug(query.slug as string)
          if (post) {
            res.status(200).json(post)
          } else {
            res.status(404).json({ error: 'Post not found' })
          }
        } else if (query.admin === 'true') {
          // Get all posts for admin
          const adminPosts = getAllBlogPostsAdmin()
          res.status(200).json(adminPosts)
        } else {
          // Get published posts
          const posts = getAllBlogPosts()
          res.status(200).json(posts)
        }
        break

      case 'POST':
        if (query.action === 'create') {
          // Create new post
          const newPost = createBlogPost(body)
          res.status(201).json(newPost)
        } else if (query.action === 'update') {
          // Update existing post
          const updatedPost = updateBlogPost(body.id, body)
          res.status(200).json(updatedPost)
        } else {
          res.status(400).json({ error: 'Invalid action' })
        }
        break

      case 'DELETE':
        if (query.id) {
          // Delete post
          const success = deleteBlogPost(query.id as string)
          if (success) {
            res.status(200).json({ message: 'Post deleted successfully' })
          } else {
            res.status(404).json({ error: 'Post not found' })
          }
        } else {
          res.status(400).json({ error: 'Post ID required' })
        }
        break

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
} 