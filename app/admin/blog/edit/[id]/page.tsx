"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import EnhancedBlogEditor from "@/components/blog/EnhancedBlogEditor"
import { BlogPostFormData } from '@/lib/blog'
import '@/components/blog/editor-styles.css'


interface EditBlogPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<BlogPostFormData | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const resolvedParams = await params
        const response = await fetch(`/api/blog/posts/id/${resolvedParams.id}`)
        
        if (!response.ok) {
          throw new Error('Failed to load post')
        }
        
        const result = await response.json()
        if (result.post) {
          setFormData({
            title: result.post.title,
            slug: result.post.slug,
            content: result.post.content,
            excerpt: result.post.excerpt || "",
            featured_image: result.post.featured_image || "",
            author_name: result.post.author_name || "Rishabh Jain",
            author_linkedin: result.post.author_linkedin || "https://www.linkedin.com/in/rishabh-jain-33b946214/",
            author_image: result.post.author_image || "",
            tags: result.post.tags || [],
            status: result.post.status,
            published_at: result.post.published_at || "",
            meta_title: result.post.meta_title || result.post.title,
            meta_description: result.post.meta_description || "",
            meta_keywords: result.post.meta_keywords || []
          })
        }
      } catch (error) {
        console.error('Error loading post:', error)
        alert('Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [params])

  const handleSave = async (data: BlogPostFormData) => {
    setIsSaving(true)
    try {
      const resolvedParams = await params
      const response = await fetch(`/api/blog/posts/id/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update blog post')
      }

      const result = await response.json()
      if (result.post) {
        // Trigger revalidation if the post is published
        if (data.status === 'published') {
          try {
            await fetch('/api/revalidate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_REVALIDATION_SECRET || 'ttb-revalidate-secret-key-2024'}`
              },
              body: JSON.stringify({ slug: data.slug })
            })
            console.log('✅ Page revalidated successfully')
          } catch (error) {
            console.error('❌ Failed to revalidate page:', error)
          }
        }
        router.push('/admin/blog')
      }
    } catch (error) {
      console.error('Error updating blog post:', error)
      alert('Failed to update blog post')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async (data: BlogPostFormData) => {
    setIsSaving(true)
    try {
      const resolvedParams = await params
      const response = await fetch(`/api/blog/posts/id/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, status: 'published' }),
      })

      if (!response.ok) {
        throw new Error('Failed to publish blog post')
      }

      const result = await response.json()
      if (result.post) {
        // Trigger instant revalidation after publishing
        try {
          await fetch('/api/revalidate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_REVALIDATION_SECRET || 'ttb-revalidate-secret-key-2024'}`
            },
            body: JSON.stringify({ slug: data.slug })
          })
          console.log('✅ Page revalidated successfully after publish')
        } catch (error) {
          console.error('❌ Failed to revalidate page:', error)
        }
        router.push('/admin/blog')
      }
    } catch (error) {
      console.error('Error publishing blog post:', error)
      alert('Failed to publish blog post')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Post not found</p>
          <Link href="/admin/blog">
            <Button className="mt-4">Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/blog">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <EnhancedBlogEditor
        initialData={formData}
        onSave={handleSave}
        isSaving={isSaving}
        mode="edit"
      />
    </div>
  )
} 