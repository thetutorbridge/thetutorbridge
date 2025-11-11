"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Edit, Trash2, Eye, Calendar, Clock, Tag, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"

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

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const loadPosts = async () => {
      if (!isClient) return
      
      setIsLoading(true)
      try {
        const response = await fetch('/api/blog/posts?status=all')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const result = await response.json()
        setPosts(result.posts || [])
        console.log('🔍 Admin Blog Debug:')
        console.log('- API URL called:', '/api/blog/posts?status=all')
        console.log('- Response status:', response.status)
        console.log('- Total posts loaded:', result.posts?.length || 0)
        console.log('- Posts data:', result.posts)
        console.log('- Draft posts:', result.posts?.filter(p => p.status === 'draft') || [])
        console.log('- All post statuses:', result.posts?.map(p => p.status) || [])
      } catch (error) {
        console.error('Error loading blog posts:', error)
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }
    
    loadPosts()
  }, [isClient])

  // Filter posts based on status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter(post => post.status === statusFilter))
    }
  }, [posts, statusFilter])

  const handleDeletePost = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/blog/posts/id/${id}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete post')
        }
        
        // Reload posts after deletion
        const updatedResponse = await fetch('/api/blog/posts?status=all')
        if (updatedResponse.ok) {
          const result = await updatedResponse.json()
          setPosts(result.posts || [])
        }
      } catch (error) {
        console.error('Error deleting blog post:', error)
        alert('Failed to delete blog post')
      }
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published'
    const date = new Date(dateString)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200';
      case 'draft': return 'bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-200 font-semibold';
      case 'archived': return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200';
      default: return 'bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200';
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-lg mb-4">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
              <p className="text-gray-600 mt-2">Manage your blog posts and content</p>
            </div>
            <Link href="/admin/blog/new">
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                New Blog Post
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Controls */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts ({posts.length})</SelectItem>
                <SelectItem value="published">Published ({posts.filter(p => p.status === 'published').length})</SelectItem>
                <SelectItem value="draft">Drafts ({posts.filter(p => p.status === 'draft').length})</SelectItem>
                <SelectItem value="archived">Archived ({posts.filter(p => p.status === 'archived').length})</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-xs text-gray-600">
            Debug: Total posts loaded: {posts.length}, Currently showing: {filteredPosts.length}, Filter: {statusFilter}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">Loading posts...</div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">
              {statusFilter === 'all' ? 'No blog posts found.' : `No ${statusFilter} posts found.`}
            </div>
            <Link href="/admin/blog/new">
              <Button>Create Your First Blog Post</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                {post.featured_image && (
                  <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {post.status === 'draft' && <span className="text-orange-500 mr-2">📝</span>}
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.published_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.view_count || 0} views
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-600">By {post.author_name || 'Unknown Author'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags && post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags && post.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 3} more
                      </Badge>
                    )}
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