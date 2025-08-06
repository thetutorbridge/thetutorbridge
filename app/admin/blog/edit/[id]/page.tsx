"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye, Plus, X, Bold, Italic, Link as LinkIcon, Type, Palette, Image as ImageIcon } from "lucide-react"
import { 
  getBlogPostById, 
  generateSlug, 
  calculateReadTime, 
  updateBlogPost, 
  createImageMarkdown,
  type BlogPostFormData
} from "@/lib/blog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"

interface EditBlogPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    tags: [],
    featuredImage: "",
    status: "draft"
  })
  const [newTag, setNewTag] = useState("")
  const [previewMode, setPreviewMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showColorDialog, setShowColorDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [selectedColor, setSelectedColor] = useState("#000000")
  const [selectedFontSize, setSelectedFontSize] = useState("16px")
  const [imageUrl, setImageUrl] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const loadPost = async () => {
      const resolvedParams = await params
      const post = await getBlogPostById(resolvedParams.id)
      if (post) {
        setFormData({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          tags: post.tags,
          featuredImage: post.featured_image || "",
          status: post.status
        })
      }
      setLoading(false)
    }
    loadPost()
  }, [params])

  const handleInputChange = (field: keyof BlogPostFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange("tags", [...formData.tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange("tags", formData.tags.filter(tag => tag !== tagToRemove))
  }

  // Rich text formatting functions
  const insertText = (text: string) => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    
    const newContent = formData.content.substring(0, start) + text + formData.content.substring(end)
    handleInputChange("content", newContent)
    
    // Set cursor position after inserted text
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(start + text.length, start + text.length)
      }
    }, 0)
  }

  const formatBold = () => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    
    if (selectedText) {
      const newText = `**${selectedText}**`
      const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end)
      handleInputChange("content", newContent)
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(start + 2, start + 2 + selectedText.length)
        }
      }, 0)
    } else {
      insertText("**bold text**")
    }
  }

  const formatItalic = () => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    
    if (selectedText) {
      const newText = `*${selectedText}*`
      const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end)
      handleInputChange("content", newContent)
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(start + 1, start + 1 + selectedText.length)
        }
      }, 0)
    } else {
      insertText("*italic text*")
    }
  }

  const insertLink = () => {
    if (!linkUrl.trim()) return
    
    const linkTextValue = linkText.trim() || linkUrl
    const linkMarkdown = `[${linkTextValue}](${linkUrl})`
    insertText(linkMarkdown)
    
    setLinkUrl("")
    setLinkText("")
    setShowLinkDialog(false)
  }



  const insertColor = () => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    
    if (selectedText) {
      const newText = `<span style="color: ${selectedColor}">${selectedText}</span>`
      const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end)
      handleInputChange("content", newContent)
    } else {
      insertText(`<span style="color: ${selectedColor}">colored text</span>`)
    }
    
    setShowColorDialog(false)
  }

  const insertFontSize = () => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    
    if (selectedText) {
      const newText = `<span style="font-size: ${selectedFontSize}">${selectedText}</span>`
      const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end)
      handleInputChange("content", newContent)
    } else {
      insertText(`<span style="font-size: ${selectedFontSize}">resized text</span>`)
    }
  }

  // Image insert functions
  const resetImageDialog = () => {
    setImageUrl("")
  }

  const handleInsertImage = () => {
    if (imageUrl.trim()) {
      const markdown = createImageMarkdown(imageUrl.trim(), 'Image')
      insertText(markdown)
      setShowImageDialog(false)
      resetImageDialog()
    } else {
      alert("Please enter an image URL")
    }
  }

  const handleSave = async () => {
    const resolvedParams = await params
    const result = await updateBlogPost(resolvedParams.id, formData)
    if (result) {
      alert("Post updated successfully!")
      router.push("/admin/blog")
    } else {
      alert("Error updating post. Please try again.")
    }
  }

  const handlePublish = async () => {
    handleInputChange("status", "published")
    await handleSave()
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
        if (/!\[([^\]]*)\]\(([^)]+)\)/.test(line)) {
          const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/)
          if (match)
            return (
              <img key={index} src={match[2]} alt={match[1]} className="my-4 rounded shadow max-w-full" />
            )
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>
        }
        if (line.trim() === '') {
          return <br key={index} />
        }
        if (line.trim()) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  const estimatedReadTime = calculateReadTime(formData.content)
  const generatedSlug = generateSlug(formData.title)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/blog">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
                <p className="text-gray-600 text-sm">Update your blog post</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? "Edit" : "Preview"}
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handlePublish} className="bg-red-600 hover:bg-red-700">
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle>Post Title</CardTitle>
                <CardDescription>
                  Enter a compelling title for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-xl"
                />
                {formData.title && (
                  <p className="text-sm text-gray-500 mt-2">
                    Generated slug: {generatedSlug}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Write your blog post content using markdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                {previewMode ? (
                  <div className="prose prose-lg max-w-none min-h-[400px] p-4 border rounded-md bg-white">
                    {formData.content ? (
                      renderMarkdownPreview(formData.content)
                    ) : (
                      <p className="text-gray-500 italic">No content to preview</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Formatting Toolbar */}
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={formatBold}
                        className="flex items-center gap-1"
                      >
                        <Bold className="h-4 w-4" />
                        Bold
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={formatItalic}
                        className="flex items-center gap-1"
                      >
                        <Italic className="h-4 w-4" />
                        Italic
                      </Button>
                      
                      <Separator orientation="vertical" className="h-6" />
                      
                      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <LinkIcon className="h-4 w-4" />
                            Link
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Insert Link</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="linkText">Link Text</Label>
                              <Input
                                id="linkText"
                                placeholder="Enter link text"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="linkUrl">URL</Label>
                              <Input
                                id="linkUrl"
                                placeholder="https://example.com"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={insertLink} className="flex-1">Insert Link</Button>
                              <Button variant="outline" onClick={() => setShowLinkDialog(false)}>Cancel</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Separator orientation="vertical" className="h-6" />
                      
                      {/* IMAGE BUTTON */}
                      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <ImageIcon className="h-4 w-4" />
                            Image
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Insert Image</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="imageUrl">Image URL</Label>
                              <Input
                                id="imageUrl"
                                placeholder="https://example.com/image.jpg"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Enter the direct URL of an image (JPG, PNG, GIF, WebP)
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={handleInsertImage}
                                className="flex-1"
                                disabled={!imageUrl.trim()}
                              >
                                Insert Image
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setShowImageDialog(false)
                                  resetImageDialog()
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Separator orientation="vertical" className="h-6" />
                      
                      <div className="flex items-center gap-2">
                        <Label htmlFor="fontSize" className="text-sm">Size:</Label>
                        <Select value={selectedFontSize} onValueChange={setSelectedFontSize}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12px">12px</SelectItem>
                            <SelectItem value="14px">14px</SelectItem>
                            <SelectItem value="16px">16px</SelectItem>
                            <SelectItem value="18px">18px</SelectItem>
                            <SelectItem value="20px">20px</SelectItem>
                            <SelectItem value="24px">24px</SelectItem>
                            <SelectItem value="28px">28px</SelectItem>
                            <SelectItem value="32px">32px</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={insertFontSize}
                          className="flex items-center gap-1"
                        >
                          <Type className="h-4 w-4" />
                          Apply
                        </Button>
                      </div>
                      
                      <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Palette className="h-4 w-4" />
                            Color
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Select Color</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="colorPicker">Color</Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id="colorPicker"
                                  type="color"
                                  value={selectedColor}
                                  onChange={(e) => setSelectedColor(e.target.value)}
                                  className="w-16 h-10"
                                />
                                <Input
                                  value={selectedColor}
                                  onChange={(e) => setSelectedColor(e.target.value)}
                                  placeholder="#000000"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={insertColor} className="flex-1">Apply Color</Button>
                              <Button variant="outline" onClick={() => setShowColorDialog(false)}>Cancel</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <Textarea
                      ref={textareaRef}
                      placeholder="Write your blog post content here... You can use markdown formatting like **bold**, *italic*, # headings, and - lists"
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      className="min-h-[400px] font-mono text-sm"
                    />
                  </div>
                )}
                {formData.content && (
                  <p className="text-sm text-gray-500 mt-2">
                    Estimated read time: {estimatedReadTime} minutes
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Excerpt */}
            <Card>
              <CardHeader>
                <CardTitle>Excerpt</CardTitle>
                <CardDescription>
                  A brief summary of your post (displayed in blog listings)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter a brief excerpt..."
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: "draft" | "published") => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    placeholder="Enter image URL"
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to help categorize your post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Post Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Post Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Title</Label>
                    <p className="text-sm text-gray-600">{formData.title || "No title"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Author</Label>
                    <p className="text-sm text-gray-600">{formData.author || "No author"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge className={formData.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {formData.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Read Time</Label>
                    <p className="text-sm text-gray-600">{estimatedReadTime} minutes</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.tags.length > 0 ? (
                        formData.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No tags</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 