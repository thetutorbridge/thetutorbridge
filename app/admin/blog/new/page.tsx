"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Eye, Upload } from "lucide-react"
import { createBlogPost, uploadBlogImage, type BlogPostFormData } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: "",
    excerpt: "",
    content: "",
    author: "The Tutor Bridge Team",
    tags: [],
    featuredImage: "/resources.jpg",
    status: "draft"
  })
  const [newTag, setNewTag] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleInputChange = (field: keyof BlogPostFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const result = await uploadBlogImage(file)
        if (result.success && result.publicUrl) {
          setUploadedImage(result.publicUrl)
          setFormData(prev => ({
            ...prev,
            featuredImage: result.publicUrl
          }))
        } else {
          alert('Failed to upload image')
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Error uploading image')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await createBlogPost(formData)
      if (result) {
        alert('Blog post created successfully!')
        router.push('/admin/blog')
      } else {
        alert('Failed to create blog post')
      }
    } catch (error) {
      console.error('Error creating blog post:', error)
      alert(`Error creating blog post: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderMarkdownPreview = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>
        }
        if (line.trim() === '') {
          return <br key={index} />
        }
        if (line.trim()) {
          return <p key={index} className="mb-4 leading-relaxed">{line}</p>
        }
        return null
      })
      .filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
              <p className="text-gray-600 mt-2">Write and publish your next article</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Blog Post Details</CardTitle>
                <CardDescription>Fill in the information for your new blog post</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter blog post title"
                      required
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      placeholder="Brief description of your blog post"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      placeholder="Author name"
                      required
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label>Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      />
                      <Button type="button" onClick={handleAddTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div>
                    <Label>Featured Image</Label>
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                    </div>
                    {(uploadedImage || formData.featuredImage) && (
                      <div className="mt-2">
                        <img 
                          src={uploadedImage || formData.featuredImage} 
                          alt="Featured" 
                          className="w-32 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <Label>Status</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          value="draft"
                          checked={formData.status === 'draft'}
                          onChange={(e) => handleInputChange('status', e.target.value as 'draft' | 'published')}
                        />
                        Draft
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          value="published"
                          checked={formData.status === 'published'}
                          onChange={(e) => handleInputChange('status', e.target.value as 'draft' | 'published')}
                        />
                        Published
                      </label>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Write your blog post content in markdown format..."
                      rows={15}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Use markdown syntax for formatting (e.g., # for headings, ** for bold, - for lists)
                    </p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {isPreview ? 'Hide Preview' : 'Show Preview'}
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      <Save className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Creating...' : 'Create Post'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          {isPreview && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>How your blog post will look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none">
                    <h1 className="text-3xl font-bold mb-4">{formData.title || 'Untitled'}</h1>
                    <p className="text-gray-600 mb-6">{formData.excerpt || 'No excerpt provided'}</p>
                    <div className="mb-4">
                      <span className="text-sm text-gray-500">By {formData.author}</span>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {renderMarkdownPreview(formData.content)}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">TheTutorBridge</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's leading online tutoring platform helping students achieve academic excellence since 2020.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Doubt Solving</li>
                <li>Career Guidance</li>
                <li>Study Resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@thetutorbridge.com</li>
                <li>+91 98765 43210</li>
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
