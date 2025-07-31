"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, Clock, Tag, ArrowRight } from "lucide-react"
import { getAllBlogPosts, searchBlogPosts, getBlogPostsByTag, type BlogPost } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [allTags, setAllTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true)
      const allPosts = await getAllBlogPosts()
      setPosts(allPosts)
      
      // Extract unique tags
      const tags = Array.from(new Set(allPosts.flatMap(post => post.tags)))
      setAllTags(tags)
      setIsLoading(false)
    }
    
    if (isClient) {
      loadPosts()
    }
  }, [isClient])

  useEffect(() => {
    const filterPosts = async () => {
      if (!isClient) return
      
      setIsLoading(true)
      let filteredPosts: BlogPost[] = []

      if (searchQuery) {
        filteredPosts = await searchBlogPosts(searchQuery)
      } else if (selectedTag) {
        filteredPosts = await getBlogPostsByTag(selectedTag)
      } else {
        filteredPosts = await getAllBlogPosts()
      }

      setPosts(filteredPosts)
      setIsLoading(false)
    }

    filterPosts()
  }, [searchQuery, selectedTag, isClient])

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Tutor Bridge Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Expert insights, study tips, and educational resources to help you excel in your academic journey
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder:text-red-200 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            onClick={() => setSelectedTag(null)}
            className="rounded-full"
          >
            All Posts
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className="rounded-full"
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        {!isClient ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">Loading...</div>
          </div>
        ) : isLoading ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">Loading posts...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">
              {searchQuery || selectedTag ? "No posts found matching your criteria." : "No posts available."}
            </div>
            {(searchQuery || selectedTag) && (
              <Button onClick={() => { setSearchQuery(""); setSelectedTag(null); }}>
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                {post.featured_image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getActualImageUrl(post.featured_image)}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Hide the image container if image fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-red-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.published_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.read_time} min read
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">By {post.author}</span>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="group-hover:text-red-600">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Get the latest educational insights, study tips, and career guidance delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-red-600 hover:bg-red-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 