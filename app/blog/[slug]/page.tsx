"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Tag, Share2, BookOpen } from "lucide-react"
import { 
  getBlogPostBySlug, 
  getAllBlogPosts, 
  getBlogComments,
  createBlogComment,
  getCommentCount,
  type BlogPost,
  type BlogComment,
  type CommentFormData
} from "@/lib/blog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const loadPost = async () => {
      if (!isClient) return
      
      const resolvedParams = await params
      const foundPost = await getBlogPostBySlug(resolvedParams.slug)
      if (!foundPost) {
        notFound()
      }
      setPost(foundPost)

      // Get related posts (same tags)
      const allPosts = await getAllBlogPosts()
      const related = allPosts
        .filter(p => p.id !== foundPost.id && p.tags.some(tag => foundPost.tags.includes(tag)))
        .slice(0, 3)
      setRelatedPosts(related)
    }

    loadPost()
  }, [isClient, params])

  if (!isClient || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-lg mb-4">Loading...</div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published'
    const date = new Date(dateString)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const getActualImageUrl = (url: string) => {
    // Extract actual image URL from Google search results
    if (url.includes('google.com/imgres') && url.includes('imgurl=')) {
      const imgurlMatch = url.match(/imgurl=([^&]+)/)
      if (imgurlMatch) {
        return decodeURIComponent(imgurlMatch[1])
      }
    }
    return url
  }

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering for headings, bold, italic, lists, links, and images
    return content
      .split('\n')
      .map((line, index) => {
        // Headings
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>
        }
        if (line.startsWith('#### ')) {
          return <h4 key={index} className="text-lg font-bold mt-3 mb-2">{line.substring(5)}</h4>
        }

        // Lists
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>
        }
        if (line.startsWith('1. ')) {
          return <li key={index} className="ml-4 mb-1">{line.substring(3)}</li>
        }

        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />
        }

        // Handle images separately
        if (/!\[([^\]]*)\]\(([^)]+)\)/.test(line.trim())) {
          const match = line.trim().match(/!\[([^\]]*)\]\(([^)]+)\)/)
          if (match) {
            const [, alt, url] = match
            let actualUrl = url.trim()
            
            // Extract actual image URL from Google search results (legacy support)
            if (url.includes('google.com/imgres') && url.includes('imgurl=')) {
              const imgurlMatch = url.match(/imgurl=([^&]+)/)
              if (imgurlMatch) {
                actualUrl = decodeURIComponent(imgurlMatch[1])
              }
            }
            
            return (
              <div key={index} className="my-8 text-center">
                <img 
                  src={actualUrl} 
                  alt={alt || 'Image'} 
                  className="max-w-full h-auto rounded-lg shadow-lg border mx-auto"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                  onLoad={() => {
                    console.log('✅ Image loaded successfully:', actualUrl)
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    console.error('❌ Failed to load image:', actualUrl)
                    target.style.display = 'none'
                    // Show a placeholder or error message
                    const errorDiv = document.createElement('div')
                    errorDiv.className = 'text-gray-500 text-sm italic py-4'
                    errorDiv.textContent = `Failed to load image: ${alt || 'Image'}`
                    if (target.parentElement) {
                      target.parentElement.appendChild(errorDiv)
                    }
                  }}
                  loading="lazy"
                />
                {alt && (
                  <p className="text-sm text-gray-600 mt-2 italic">{alt}</p>
                )}
              </div>
            )
          }
        }

        // Regular paragraphs
        if (line.trim()) {
          // Handle bold, italic, and links (but not images - they're handled above)
          let processedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:underline">$1</a>')
          
          return (
            <p key={index} 
               className="mb-4 leading-relaxed"
               dangerouslySetInnerHTML={{ __html: processedLine }}
            />
          )
        }

        return null
      })
      .filter(Boolean)
  }

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Back to Blog */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.featured_image && (
              <div className="relative h-64 md:h-96">
                <Image
                  src={getActualImageUrl(post.featured_image)}
                  alt={post.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Hide the image container if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.style.display = 'none'
                  }}
                />
              </div>
            )}

            <div className="p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.read_time} min read
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  By {post.author}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={sharePost}
                  className="ml-auto"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>

              <Separator className="mb-8" />

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {renderMarkdown(post.content)}
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">About the Author</h3>
                <p className="text-gray-600">
                  {post.author} is an experienced educator and content creator at The Tutor Bridge, 
                  dedicated to helping students achieve their academic goals through expert guidance 
                  and proven learning strategies.
                </p>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      {relatedPost.featured_image && (
                        <div className="relative h-48">
                          <Image
                            src={getActualImageUrl(relatedPost.featured_image)}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              // Hide the image container if image fails to load
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              target.parentElement!.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {formatDate(relatedPost.published_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Excel in Your Studies?</h2>
            <p className="text-red-100 mb-6">
              Get personalized tutoring, instant doubt solving, and expert guidance from our experienced educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo-class">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  Book Free Demo Class
                </Button>
              </Link>
              <Link href="/doubt-solving">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  Ask a Doubt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 