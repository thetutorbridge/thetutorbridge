import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { createAdminClient } from "@/lib/supabase"
import { BlogSearchClient } from "./BlogSearchClient"

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

export const metadata: Metadata = {
  title: "TheTutorBridge Blog - Expert Study Tips & Educational Resources",
  description: "Expert insights, study tips, and educational resources to help you excel in your academic journey",
  openGraph: {
    title: "TheTutorBridge Blog",
    description: "Expert insights, study tips, and educational resources",
    url: "https://www.thetutorbridge.com/blog",
    siteName: "TheTutorBridge",
    type: "website",
  },
}

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

async function getPosts(): Promise<BlogPost[]> {
  try {
    console.time('Fetching blog posts');
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image, author_name, author_linkedin, author_image, tags, status, published_at, created_at, updated_at, view_count, read_time, meta_title, meta_description, meta_keywords')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    console.timeEnd('Fetching blog posts');

    if (error) {
      console.error('Database error fetching posts:', error);
      return [];
    }

    console.log(`✅ Fetched ${data?.length || 0} blog posts`);
    return data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published'
    const date = new Date(dateString)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-amber text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              TheTutorBridge Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Expert insights, study tips, and educational resources to help you excel in your academic journey
            </p>
            {/* Search component will be a client component */}
            <BlogSearchClient initialPosts={posts} />
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Blog Posts Grid - Server-rendered */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">
              No posts available.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-posts-grid">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                data-post-id={post.id}
                data-post-title={post.title}
                data-post-excerpt={post.excerpt}
              >
                {post.featured_image && (
                  <div className="relative w-full aspect-video bg-gray-100 overflow-hidden border-b border-gray-200">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-brand-teal transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.published_at)}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">By {post.author_name || 'Unknown Author'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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
