import { Metadata } from "next"

// Generate metadata for SEO (this runs on the server)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${resolvedParams.slug}&select=title,meta_title,meta_description,meta_keywords,featured_image,author_name,published_at&status=eq.published`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return {
        title: 'Blog Post',
        description: 'Read educational insights and study tips on The Tutor Bridge blog.',
      }
    }

    const posts = await response.json()
    if (!posts || posts.length === 0) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      }
    }

    const post = posts[0]
    const title = post.meta_title || post.title || 'Blog Post'
    const description = post.meta_description || 'Read educational insights and study tips on The Tutor Bridge blog.'
    const keywords = post.meta_keywords || []
    const imageUrl = post.featured_image || '/og-image.jpg'
    const publishedDate = post.published_at
    const author = post.author_name || 'The Tutor Bridge'

    return {
      title,
      description,
      keywords,
      authors: [{ name: author }],
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: publishedDate,
        authors: [author],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        siteName: 'The Tutor Bridge',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://thetutorbridge.com/blog/${resolvedParams.slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post',
      description: 'Read educational insights and study tips on The Tutor Bridge blog.',
    }
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
