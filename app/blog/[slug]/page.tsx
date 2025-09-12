"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import '@/components/blog/editor-styles.css'

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
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
      
      try {
        const resolvedParams = await params
        const response = await fetch(`/api/blog/posts/${resolvedParams.slug}`)
        
        if (!response.ok) {
          notFound()
        }
        
        const result = await response.json()
        if (!result.post) {
          notFound()
        }
        
        setPost(result.post)

        // Get related posts (same tags)
        const allPostsResponse = await fetch('/api/blog/posts?status=published')
        if (allPostsResponse.ok) {
          const allPostsResult = await allPostsResponse.json()
          const allPosts = allPostsResult.posts || []
          const related = allPosts
            .filter((p: BlogPost) => p.id !== result.post.id && p.tags.some(tag => result.post.tags.includes(tag)))
            .slice(0, 3)
          setRelatedPosts(related)
        }
      } catch (error) {
        console.error('Error loading post:', error)
        notFound()
      }
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

  const getAuthorImageUrl = (imagePath: string | null) => {
    if (!imagePath) return null
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath
    }
    
    // If it's just a filename, try to construct the path
    // Check if it's in the public directory directly
    if (imagePath.includes('.')) {
      return `/${imagePath}`
    }
    
    return null
  }

  const renderTextContent = (content: any[]): React.ReactNode[] => {
    if (!content) return []
    
    return content.map((textNode: any, textIndex: number) => {
      if (textNode.type === 'text') {
        let text = textNode.text || ''
        if (textNode.marks) {
          textNode.marks.forEach((mark: any) => {
            if (mark.type === 'bold') {
              text = <strong key={textIndex} className="font-semibold">{text}</strong>
            }
            if (mark.type === 'italic') {
              text = <em key={textIndex} className="italic">{text}</em>
            }
            if (mark.type === 'underline') {
              text = <u key={textIndex}>{text}</u>
            }
            if (mark.type === 'link') {
              text = (
                <a 
                  key={textIndex}
                  href={mark.attrs?.href} 
                  target={mark.attrs?.target || "_blank"}
                  rel={mark.attrs?.rel || "noopener noreferrer"}
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                >
                  {text}
                </a>
              )
            }
          })
        }
        return text
      }
      if (textNode.type === 'paragraph') {
        // Handle paragraph nodes that contain text content
        return (
          <span key={textIndex}>
            {textNode.content ? renderTextContent(textNode.content) : ''}
          </span>
        )
      }
      if (textNode.type === 'link') {
        return (
          <a 
            key={textIndex}
            href={textNode.attrs?.href} 
            target={textNode.attrs?.target || "_blank"}
            rel={textNode.attrs?.rel || "noopener noreferrer"}
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            {textNode.content ? renderTextContent(textNode.content) : textNode.text}
          </a>
        )
      }
      return null
    }).filter(Boolean)
  }

  const renderContent = (content: any) => {
    // Handle JSONB content (TipTap format)
    if (content && typeof content === 'object' && content.type === 'doc' && content.content) {
      return content.content.map((node: any, index: number) => {
        if (node.type === 'heading') {
          const HeadingTag = `h${node.attrs?.level || 1}` as keyof JSX.IntrinsicElements
          const level = node.attrs?.level || 1
          const headingClasses = {
            1: 'text-3xl font-bold mt-8 mb-4 text-primary',
            2: 'text-2xl font-bold mt-6 mb-3 text-primary',
            3: 'text-xl font-bold mt-4 mb-2 text-secondary',
            4: 'text-lg font-bold mt-3 mb-2 text-primary'
          }
          return (
            <HeadingTag key={index} className={headingClasses[level as keyof typeof headingClasses] || headingClasses[1]}>
              {node.content?.map((textNode: any, textIndex: number) => 
                textNode.type === 'text' ? textNode.text : ''
              ).join('')}
            </HeadingTag>
          )
        }
        if (node.type === 'paragraph') {
          return (
            <p key={index} className="mb-4 leading-relaxed text-gray-700">
              {renderTextContent(node.content || [])}
            </p>
          )
        }
        if (node.type === 'bulletList') {
          return (
            <ul key={index} className="list-disc ml-6 mb-4 space-y-2">
              {node.content?.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="text-gray-700 leading-relaxed">
                  {item.content?.map((paragraphNode: any, paragraphIndex: number) => {
                    if (paragraphNode.type === 'paragraph') {
                      return (
                        <span key={paragraphIndex}>
                          {paragraphNode.content?.map((textNode: any, textIndex: number) => {
                            if (textNode.type === 'text') {
                              let text = textNode.text || ''
                              if (textNode.marks) {
                                textNode.marks.forEach((mark: any) => {
                                  if (mark.type === 'bold') {
                                    text = <strong key={textIndex} className="font-semibold text-primary">{text}</strong>
                                  }
                                  if (mark.type === 'italic') {
                                    text = <em key={textIndex} className="italic text-secondary">{text}</em>
                                  }
                                  if (mark.type === 'underline') {
                                    text = <u key={textIndex}>{text}</u>
                                  }
                                  if (mark.type === 'link') {
                                    text = (
                                      <a 
                                        key={textIndex}
                                        href={mark.attrs?.href} 
                                        target={mark.attrs?.target || "_blank"}
                                        rel={mark.attrs?.rel || "noopener noreferrer"}
                                        className="text-primary underline hover:text-secondary transition-colors"
                                      >
                                        {text}
                                      </a>
                                    )
                                  }
                                })
                              }
                              return text
                            }
                            if (textNode.type === 'link') {
                              return (
                                <a 
                                  key={textIndex}
                                  href={textNode.attrs?.href} 
                                  target={textNode.attrs?.target || "_blank"}
                                  rel={textNode.attrs?.rel || "noopener noreferrer"}
                                  className="text-primary underline hover:text-secondary transition-colors"
                                >
                                  {textNode.content?.[0]?.text || ''}
                                </a>
                              )
                            }
                            return textNode.text || ''
                          })}
                        </span>
                      )
                    }
                    // Handle direct text content (fallback)
                    if (paragraphNode.type === 'text') {
                      let text = paragraphNode.text || ''
                      if (paragraphNode.marks) {
                        paragraphNode.marks.forEach((mark: any) => {
                          if (mark.type === 'bold') {
                            text = <strong key={paragraphIndex} className="font-semibold text-primary">{text}</strong>
                          }
                          if (mark.type === 'italic') {
                            text = <em key={paragraphIndex} className="italic text-secondary">{text}</em>
                          }
                          if (mark.type === 'underline') {
                            text = <u key={paragraphIndex}>{text}</u>
                          }
                        })
                      }
                      return text
                    }
                    return paragraphNode.text || ''
                  })}
                </li>
              ))}
            </ul>
          )
        }
        if (node.type === 'orderedList') {
          return (
            <ol key={index} className="list-decimal ml-6 mb-4 space-y-2">
              {node.content?.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="text-gray-700 leading-relaxed">
                  {item.content?.map((paragraphNode: any, paragraphIndex: number) => {
                    if (paragraphNode.type === 'paragraph') {
                      return (
                        <span key={paragraphIndex}>
                          {paragraphNode.content?.map((textNode: any, textIndex: number) => {
                            if (textNode.type === 'text') {
                              let text = textNode.text || ''
                              if (textNode.marks) {
                                textNode.marks.forEach((mark: any) => {
                                  if (mark.type === 'bold') {
                                    text = <strong key={textIndex} className="font-semibold text-primary">{text}</strong>
                                  }
                                  if (mark.type === 'italic') {
                                    text = <em key={textIndex} className="italic text-secondary">{text}</em>
                                  }
                                  if (mark.type === 'underline') {
                                    text = <u key={textIndex}>{text}</u>
                                  }
                                  if (mark.type === 'link') {
                                    text = (
                                      <a 
                                        key={textIndex}
                                        href={mark.attrs?.href} 
                                        target={mark.attrs?.target || "_blank"}
                                        rel={mark.attrs?.rel || "noopener noreferrer"}
                                        className="text-primary underline hover:text-secondary transition-colors"
                                      >
                                        {text}
                                      </a>
                                    )
                                  }
                                })
                              }
                              return text
                            }
                            if (textNode.type === 'link') {
                              return (
                                <a 
                                  key={textIndex}
                                  href={textNode.attrs?.href} 
                                  target={textNode.attrs?.target || "_blank"}
                                  rel={textNode.attrs?.rel || "noopener noreferrer"}
                                  className="text-primary underline hover:text-secondary transition-colors"
                                >
                                  {textNode.content?.[0]?.text || ''}
                                </a>
                              )
                            }
                            return textNode.text || ''
                          })}
                        </span>
                      )
                    }
                    // Handle direct text content (fallback)
                    if (paragraphNode.type === 'text') {
                      let text = paragraphNode.text || ''
                      if (paragraphNode.marks) {
                        paragraphNode.marks.forEach((mark: any) => {
                          if (mark.type === 'bold') {
                            text = <strong key={paragraphIndex} className="font-semibold text-primary">{text}</strong>
                          }
                          if (mark.type === 'italic') {
                            text = <em key={paragraphIndex} className="italic text-secondary">{text}</em>
                          }
                          if (mark.type === 'underline') {
                            text = <u key={paragraphIndex}>{text}</u>
                          }
                        })
                      }
                      return text
                    }
                    return paragraphNode.text || ''
                  })}
                </li>
              ))}
            </ol>
          )
        }
        if (node.type === 'image') {
          return (
            <div key={index} className="my-8 text-center">
              <img 
                src={node.attrs?.src} 
                alt={node.attrs?.alt || 'Image'} 
                className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                style={{ maxHeight: '500px' }}
                loading="lazy"
              />
              {node.attrs?.alt && (
                <p className="text-sm text-gray-600 mt-2 italic">{node.attrs.alt}</p>
              )}
            </div>
          )
        }
        if (node.type === 'blockquote') {
          return (
            <blockquote key={index} className="border-l-4 border-accent bg-accent/5 p-4 my-6 italic text-gray-700">
              {node.content?.map((textNode: any, textIndex: number) => {
                if (textNode.type === 'text') {
                  let text = textNode.text || ''
                  if (textNode.marks) {
                    textNode.marks.forEach((mark: any) => {
                      if (mark.type === 'bold') {
                        text = <strong key={textIndex} className="font-semibold text-primary">{text}</strong>
                      }
                      if (mark.type === 'italic') {
                        text = <em key={textIndex} className="italic text-secondary">{text}</em>
                      }
                      if (mark.type === 'link') {
                        text = (
                          <a 
                            key={textIndex}
                            href={mark.attrs?.href} 
                            target={mark.attrs?.target || "_blank"}
                            rel={mark.attrs?.rel || "noopener noreferrer"}
                            className="text-primary underline hover:text-secondary transition-colors"
                          >
                            {text}
                          </a>
                        )
                      }
                    })
                  }
                  return text
                }
                return textNode.text || ''
              })}
            </blockquote>
          )
        }
        if (node.type === 'codeBlock') {
          return (
            <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
              <code className="text-sm text-gray-800">
                {node.content?.map((textNode: any, textIndex: number) => 
                  textNode.type === 'text' ? textNode.text : ''
                ).join('')}
              </code>
            </pre>
          )
        }
        if (node.type === 'table') {
          const rows = node.content || []
          
          if (rows.length === 0) {
            return null
          }
          
          const headerRow = rows[0]
          const dataRows = rows.slice(1)
          
          return (
            <div key={index} className="overflow-x-auto my-8">
              <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-secondary">
                    {headerRow.content?.map((cell: any, cellIndex: number) => (
                      <th 
                        key={cellIndex} 
                        className="border border-gray-300 px-4 py-3 text-left font-semibold text-white"
                      >
                        {cell.content ? renderTextContent(cell.content) : ''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row: any, rowIndex: number) => (
                    <tr key={rowIndex} className={`hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      {row.content?.map((cell: any, cellIndex: number) => (
                        <td 
                          key={cellIndex} 
                          className="border border-gray-300 px-4 py-3 text-gray-700"
                        >
                          {cell.content ? renderTextContent(cell.content) : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        if (node.type === 'horizontalRule') {
          return <hr key={index} className="my-8 border-t-2 border-gray-300" />
        }
        return null
      }).filter(Boolean)
    }

    // Handle string content (markdown)
    if (typeof content === 'string') {
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

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-3">
                  {/* Author Image */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {getAuthorImageUrl(post.author_image) ? (
                      <Image
                        src={getAuthorImageUrl(post.author_image)!}
                        alt={post.author_name || 'Author'}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          // Show fallback avatar
                          const fallback = target.parentElement?.querySelector('.fallback-avatar') as HTMLElement
                          if (fallback) fallback.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="fallback-avatar absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg" style={{ display: getAuthorImageUrl(post.author_image) ? 'none' : 'flex' }}>
                      {(post.author_name || 'A').charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  {/* Author Info */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {post.author_name || 'Unknown Author'}
                      </span>
                      {post.author_linkedin && (
                        <a
                          href={post.author_linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View LinkedIn Profile"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                  {formatDate(post.published_at)}
                </div>
                </div>
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  {/* Author Image */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {getAuthorImageUrl(post.author_image) ? (
                      <Image
                        src={getAuthorImageUrl(post.author_image)!}
                        alt={post.author_name || 'Author'}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          // Show fallback avatar
                          const fallback = target.parentElement?.querySelector('.fallback-avatar') as HTMLElement
                          if (fallback) fallback.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="fallback-avatar absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl" style={{ display: getAuthorImageUrl(post.author_image) ? 'none' : 'flex' }}>
                      {(post.author_name || 'A').charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  {/* Author Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.author_name || 'The Author'}
                      </h3>
                      {post.author_linkedin && (
                        <a
                          href={post.author_linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View LinkedIn Profile"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                <p className="text-gray-600">
                  {post.author_name || 'The author'} is an experienced educator and content creator at The Tutor Bridge, 
                  dedicated to helping students achieve their academic goals through expert guidance 
                  and proven learning strategies.
                </p>
                  </div>
                </div>
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
          <div className="mt-12 bg-gradient-to-r from-brand-blue to-brand-teal text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Excel in Your Studies?</h2>
            <p className="text-white/90 mb-6">
              Get personalized tutoring, instant doubt solving, and expert guidance from our experienced educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo-class">
                <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                  Book Free Session
                </Button>
              </Link>
              <Link href="/doubt-solving">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">TheTutorBridge</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's leading online tutoring platform helping students achieve academic excellence since 2020.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/thetutorbridge/" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://t.me/thetutorbridge" className="text-gray-400 hover:text-white transition-colors">
                  Telegram
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/doubt-solving" className="hover:text-white transition-colors">
                    Doubt Solving
                  </Link>
                </li>
                <li>
                  <Link href="/career-guidance" className="hover:text-white transition-colors">
                    Career Guidance
                  </Link>
                </li>
                <li>
                  <Link href="/study-resources" className="hover:text-white transition-colors">
                    Study Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@thetutorbridge.com</li>
                <li>+91 9310096171</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} The Tutor Bridge. All rights reserved. | Helping students excel since 2020
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}