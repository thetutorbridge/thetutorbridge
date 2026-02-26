import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cache } from "react"
import { ArrowLeft, Calendar, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import { createAdminClient } from "@/lib/supabase"
import { BlogPostContent } from "./BlogPostContent"
import '@/components/blog/editor-styles.css'

// Enable ISR - revalidate every hour for SEO stability
// Shorter intervals can confuse search engines with constantly changing cache headers
export const revalidate = 3600

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

// Generate static params for all published blog posts
export async function generateStaticParams() {
  try {
    const supabase = createAdminClient()
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published')

    return posts?.map((post) => ({
      slug: post.slug,
    })) || []
  } catch (error) {
    return []
  }
}

// Fetch post data with React cache to prevent duplicate calls
// generateMetadata and page component share the same cached result
const getPost = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      return null
    }

    return data as BlogPost
  } catch (error) {
    return null
  }
})

// Fetch related posts - try tag matching first, fall back to recent posts
async function getRelatedPosts(post: BlogPost): Promise<BlogPost[]> {
  try {
    const supabase = createAdminClient()
    // Only fetch 10 posts since we only display 3
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image, author_name, published_at, tags')
      .eq('status', 'published')
      .neq('id', post.id)
      .order('published_at', { ascending: false })
      .limit(10)

    if (!data || data.length === 0) return []

    // Try to find posts with overlapping tags first
    const tagMatches = data
      .filter(p => p.tags && post.tags && p.tags.some((tag: string) => post.tags.includes(tag)))
      .slice(0, 3)

    // If we found tag matches, return them
    if (tagMatches.length >= 3) {
      return tagMatches as BlogPost[]
    }

    // Otherwise, fall back to most recent posts (excluding current)
    // This ensures Related Articles ALWAYS shows something for internal linking
    const recentPosts = data.slice(0, 3)
    return recentPosts as BlogPost[]
  } catch (error) {
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.meta_keywords,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: [post.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published'
    const date = new Date(dateString)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const getActualImageUrl = (url: string) => {
    if (url.includes('supabase.co')) {
      return url
    }
    if (url.includes('thetutorbridge.com')) {
      return url
    }
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
    if (imagePath.startsWith('http')) {
      return imagePath
    }
    if (imagePath.includes('.')) {
      return `/${imagePath}`
    }
    return null
  }

  // Generate Article JSON-LD structured data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.meta_title || post.title,
    "description": post.meta_description || post.excerpt,
    "image": post.featured_image ? [getActualImageUrl(post.featured_image)] : [],
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Person",
      "name": post.author_name || "The Tutor Bridge",
      "url": post.author_linkedin || "https://www.thetutorbridge.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Tutor Bridge",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thetutorbridge.com/TheTutorBridge Logo New.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.thetutorbridge.com/blog/${slug}`
    },
    "keywords": post.meta_keywords?.join(", ") || post.tags?.join(", "),
    "articleSection": "Education",
    "wordCount": post.read_time ? post.read_time * 200 : undefined,
    "inLanguage": "en-US"
  }

  // Generate BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.thetutorbridge.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.thetutorbridge.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.thetutorbridge.com/blog/${slug}`
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navigation />
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
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.featured_image && post.featured_image.trim() !== '' && (
              <div className="relative w-full aspect-video bg-gray-100">
                <Image
                  src={getActualImageUrl(post.featured_image)}
                  alt={post.title}
                  fill
                  className="object-contain"
                  priority
                  unoptimized={!post.featured_image.includes('supabase.co')}
                />
              </div>
            )}

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {getAuthorImageUrl(post.author_image) ? (
                      <Image
                        src={getAuthorImageUrl(post.author_image)!}
                        alt={post.author_name || 'Author'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                        {(post.author_name || 'A').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {post.author_name || 'Unknown Author'}
                      </span>
                      {post.author_linkedin && (
                        <a
                          href={post.author_linkedin}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
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

              <BlogPostContent content={post.content} />

              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {getAuthorImageUrl(post.author_image) ? (
                      <Image
                        src={getAuthorImageUrl(post.author_image)!}
                        alt={post.author_name || 'Author'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
                        {(post.author_name || 'A').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.author_name || 'The Author'}
                      </h3>
                      {post.author_linkedin && (
                        <a
                          href={post.author_linkedin}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
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

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      {relatedPost.featured_image && relatedPost.featured_image.trim() !== '' && (
                        <div className="relative h-48">
                          <Image
                            src={getActualImageUrl(relatedPost.featured_image)}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
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

          <div className="mt-12 bg-gradient-to-r from-brand-blue to-brand-teal text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Excel in Your Studies?</h2>
            <p className="text-white/90 mb-6">
              Get personalized tutoring, instant doubt solving, and expert guidance from our experienced educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutoring/free-consultation">
                <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                  Book Free Session
                </Button>
              </Link>
              <Link href="/homework-help">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/TheTutorBridge Logo New.png" width={32} height={32} alt="The Tutor Bridge Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">The Tutor Bridge</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Expert online tutoring platform helping students achieve academic excellence. Personalized homework help and 1-on-1 tutoring for grades 6-12.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/thetutorbridge/" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://t.me/thetutorbridge" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-400 hover:text-white transition-colors">
                  Telegram
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/homework-help" className="hover:text-white transition-colors">
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
