'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EnhancedBlogEditor from '@/components/blog/EnhancedBlogEditor'
import { BlogPostFormData } from '@/lib/blog'
import '@/components/blog/editor-styles.css'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const initialData: BlogPostFormData = {
    title: '',
    content: '',
    status: 'draft',
    author_name: 'Rishabh Jain',
    author_linkedin: 'https://www.linkedin.com/in/rishabh-jain-33b946214/',
    author_avatar: 'Rishabh Jain.jpeg'
  }

  const handleSave = async (formData: BlogPostFormData) => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create blog post')
      }

      const result = await response.json()
      if (result.post) {
        router.push('/admin/blog')
      }
    } catch (error) {
      console.error('Error creating blog post:', error)
      alert('Failed to create blog post')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedBlogEditor
        initialData={initialData}
        onSave={handleSave}
        isSaving={isSaving}
        mode="create"
      />
    </div>
  )
}