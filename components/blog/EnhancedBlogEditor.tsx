'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import './editor-styles.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Save, 
  Eye, 
  Upload, 
  X, 
  Plus, 
  Bold as BoldIcon, 
  Italic as ItalicIcon, 
  Underline, 
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Link,
  Image as ImageIcon,
  Table as TableIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Type,
  Palette,
  Highlighter,
  Minus,
  Undo,
  Redo,
  CheckSquare,
  Square,
  FileText,
  Download,
  Copy,
  Sigma,
  Calculator
} from 'lucide-react'
import { uploadBlogImage, type BlogPostFormData } from '@/lib/blog'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import UnderlineExtension from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Mathematics from '@tiptap/extension-mathematics'


interface EnhancedBlogEditorProps {
  initialData: BlogPostFormData
  onSave: (data: BlogPostFormData) => Promise<void>
  isSaving: boolean
  mode: 'create' | 'edit'
}

interface LinkDialogProps {
  isOpen: boolean
  onClose: () => void
  onSetLink: (url: string, text: string, nofollow: boolean) => void
  currentUrl?: string
  currentText?: string
  currentNofollow?: boolean
}


function LinkDialog({ isOpen, onClose, onSetLink, currentUrl = '', currentText = '', currentNofollow = false }: LinkDialogProps) {
  const [url, setUrl] = useState(currentUrl)
  const [text, setText] = useState(currentText)
  const [nofollow, setNofollow] = useState(false) // Always default to dofollow (unchecked)

  // Update state when props change (but keep nofollow as false by default)
  useEffect(() => {
    setUrl(currentUrl)
    setText(currentText)
    // Only set nofollow to true if explicitly set, otherwise keep as false (dofollow)
    if (currentNofollow === true) {
      setNofollow(true)
    }
  }, [currentUrl, currentText, currentNofollow])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSetLink(url.trim(), text.trim() || url.trim(), nofollow)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {currentUrl ? 'Edit Link' : 'Add Link'}
        </h3>
        
        {/* Show current link info if editing */}
        {currentUrl && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800 font-medium mb-1">Current Link:</div>
            <div className="text-sm text-blue-600 break-all">{currentUrl}</div>
            {currentText && (
              <div className="text-sm text-blue-600 mt-1">Text: "{currentText}"</div>
            )}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="link-url">URL *</Label>
            <Input
              id="link-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="link-text">Link Text</Label>
            <Input
              id="link-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Link text (optional)"
              className={text ? "bg-blue-50 border-blue-200" : ""}
            />
            {text && (
              <p className="text-xs text-blue-600 mt-1">
                ✨ Auto-filled from selected text: "{text}"
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="nofollow"
              checked={nofollow}
              onChange={(e) => setNofollow(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="nofollow">Add rel="nofollow" (SEO)</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {currentUrl ? 'Update Link' : 'Add Link'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default function EnhancedBlogEditor({ initialData, onSave, isSaving, mode }: EnhancedBlogEditorProps) {
  const [formData, setFormData] = useState<BlogPostFormData>(initialData)
  const [newTag, setNewTag] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [linkDialog, setLinkDialog] = useState<{
    isOpen: boolean
    url?: string
    text?: string
    nofollow?: boolean
  }>({ isOpen: false })

  const [imageDialog, setImageDialog] = useState<{
    isOpen: boolean
    alt?: string
    description?: string
  }>({ isOpen: false })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const authorImageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        // Disable table from StarterKit to avoid conflicts
        table: false,
      }),
      UnderlineExtension,
      Strike,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
        inline: false,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
        autolink: true,
        defaultProtocol: 'https',
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Mathematics.configure({
        katexOptions: {
          macros: {
            '\\RR': '\\mathbb{R}',
            '\\NN': '\\mathbb{N}',
            '\\ZZ': '\\mathbb{Z}',
            '\\QQ': '\\mathbb{Q}',
            '\\CC': '\\mathbb{C}',
          },
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog post here...',
      }),
      Typography,
    ],
    content: formData.content || '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        content: editor.getJSON()
      }))
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-6 border border-gray-200 rounded-lg bg-white editor-content',
      },
      handleClick: (view, pos, event) => {
        const target = event.target as HTMLElement
        if (target.tagName === 'IMG') {
          handleImageClick(target as HTMLImageElement)
          return true
        }
        if (target.tagName === 'A') {
          event.preventDefault()
          handleLinkClick(target as HTMLAnchorElement)
          return true
        }
        return false
      },
      handleDoubleClick: (view, pos, event) => {
        const target = event.target as HTMLElement
        if (target.tagName === 'IMG') {
          handleImageDoubleClick(target as HTMLImageElement)
          return true
        }
        return false
      },
    },
    immediatelyRender: false,
  }, [isMounted])

  const handleInputChange = (field: keyof BlogPostFormData, value: string | string[] | any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Image interaction handlers
  const handleImageClick = (imgElement: HTMLImageElement) => {
    // Remove previous selections
    document.querySelectorAll('.ProseMirror img.selected').forEach(img => {
      img.classList.remove('selected')
    })
    
    // Add selection to clicked image
    imgElement.classList.add('selected')
    
    // Add click listener for removal
    const removeListener = () => {
      if (editor && editor.view) {
        try {
          const pos = editor.view.posAtDOM(imgElement, 0)
          editor.commands.deleteRange({ from: pos - 1, to: pos + 1 })
        } catch (error) {
          console.warn('Editor not ready for image removal:', error)
        }
      }
      imgElement.classList.remove('selected')
      imgElement.removeEventListener('click', removeListener)
    }
    
    imgElement.addEventListener('click', removeListener)
  }

  const handleImageDoubleClick = (imgElement: HTMLImageElement) => {
    const currentAlt = imgElement.getAttribute('alt') || ''
    const currentTitle = imgElement.getAttribute('title') || ''
    
    setImageDialog({
      isOpen: true,
      alt: currentAlt,
      description: currentTitle
    })
    
    // Store reference to the image element for updating
    ;(window as any).editingImageElement = imgElement
  }

  // Link interaction handler
  const handleLinkClick = (linkElement: HTMLAnchorElement) => {
    const currentHref = linkElement.getAttribute('href') || ''
    const currentText = linkElement.textContent || ''
    const currentRel = linkElement.getAttribute('rel') || ''

    setLinkDialog({
      isOpen: true,
      url: currentHref,
      text: currentText,
      nofollow: currentRel.includes('nofollow')
    })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB.')
      return
    }

    try {
      const result = await uploadBlogImage(file)
      if (result.success && result.publicUrl) {
        // Show dialog for alt text and description
        setImageDialog({
          isOpen: true,
          alt: file.name.replace(/\.[^/.]+$/, ""), // Use filename as default alt text
          description: ''
        })
        // Store the image URL temporarily to insert after dialog
        ;(window as any).pendingImageUrl = result.publicUrl
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    }
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAuthorImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const result = await uploadBlogImage(file)
        if (result.success && result.publicUrl) {
          setFormData(prev => ({
            ...prev,
            author_image: result.publicUrl
          }))
        } else {
          alert('Failed to upload author image')
        }
      } catch (error) {
        console.error('Error uploading author image:', error)
        alert('Error uploading author image')
      }
    }
  }

  const insertImageWithMetadata = (alt: string, description: string) => {
    const imageUrl = (window as any).pendingImageUrl
    const editingImageElement = (window as any).editingImageElement
    
    if (imageUrl) {
      // Inserting new image
      editor?.chain().focus().setImage({ 
        src: imageUrl, 
        alt: alt,
        title: description 
      }).run()
      delete (window as any).pendingImageUrl
    } else if (editingImageElement) {
      // Editing existing image
      if (editor) {
        const pos = editor.view.posAtDOM(editingImageElement, 0)
        editor.commands.updateAttributes('image', { 
          alt: alt,
          title: description 
        })
      }
      delete (window as any).editingImageElement
    }
    
    setImageDialog({ isOpen: false })
  }

  const addTable = () => {
    if (!editor) {
      console.error('Editor not available')
      return
    }

    // Try TipTap table insertion first
    const success = editor.chain().focus().insertTable({ 
      rows: 3, 
      cols: 3, 
      withHeaderRow: true 
    }).run()

    // If TipTap method fails, use HTML insertion as fallback
    if (!success) {
      const tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 3</td>
            </tr>
            <tr>
              <td>Cell 4</td>
              <td>Cell 5</td>
              <td>Cell 6</td>
            </tr>
          </tbody>
        </table>
      `
      editor.chain().focus().insertContent(tableHTML).run()
    }
  }

  const addTableWithMergedCells = () => {
    if (editor) {
      // Create a properly structured table with rowspan using TipTap's JSON format
      const tableContent = {
        type: 'table',
        content: [
          {
            type: 'tableRow',
            content: [
              { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Date and Time' }] }] },
              { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Subject Code' }] }] },
              { type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Subject Name' }] }] }
            ]
          },
          {
            type: 'tableRow',
            content: [
              { 
                type: 'tableCell', 
                attrs: { rowspan: 3 },
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Saturday, 15th February, 2025' }] }] 
              },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '101' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'English (Communicative)' }] }] }
            ]
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '184' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'English (Language and Literature)' }] }] }
            ]
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '002' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hindi Course-A' }] }] }
            ]
          },
          {
            type: 'tableRow',
            content: [
              { 
                type: 'tableCell', 
                attrs: { rowspan: 5 },
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Monday, 17th February, 2025' }] }] 
              },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '036' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hindustani Music (Per Ins)' }] }] }
            ]
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '131' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Rai' }] }] }
            ]
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '132' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Gurung' }] }] }
            ]
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '133' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Tamang' }] }] }
            ]
          },
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '134' }] }] },
              { type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Sherpa' }] }] }
            ]
          }
        ]
      }
      
      // Insert the table using TipTap's JSON format
      editor.chain().focus().insertContent(tableContent).run()
    }
  }

  const addMathEquation = () => {
    if (editor) {
      const equation = prompt('Enter LaTeX equation (e.g., \\forall x \\in X, (x, x) \\in R):', '\\forall x \\in X, (x, x) \\in R')
      if (equation) {
        editor.chain().focus().setMathInline(equation).run()
      }
    }
  }

  const addMathBlock = () => {
    if (editor) {
      const equation = prompt('Enter LaTeX equation for block (e.g., \\forall x \\in X, (x, x) \\in R):', '\\forall x \\in X, (x, x) \\in R')
      if (equation) {
        editor.chain().focus().setMathBlock(equation).run()
      }
    }
  }


  const handleFeaturedImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const result = await uploadBlogImage(file)
        if (result.success && result.publicUrl) {
          setFormData(prev => ({
            ...prev,
            featured_image: result.publicUrl
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

  const handleSave = async (status: 'draft' | 'published') => {
    if (!formData.title?.trim()) {
      alert('Please enter a title')
      return
    }

    if (!formData.slug?.trim()) {
      alert('Please enter a slug')
      return
    }

    if (!formData.content) {
      alert('Please enter content')
      return
    }

    try {
      await onSave({
        ...formData,
        status
      })
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  const openLinkDialog = () => {
    const { from, to } = editor?.state.selection || {}
    const selectedText = editor?.state.doc.textBetween(from || 0, to || 0, ' ').trim()

    // Check if we're editing an existing link
    const linkMark = editor?.getAttributes('link')


    setLinkDialog({
      isOpen: true,
      text: selectedText || '',
      url: linkMark?.href || '',
      nofollow: linkMark?.rel?.includes('nofollow') || false,
    })
  }

  const setLink = (url: string, text: string, nofollow: boolean) => {
    if (!editor) return

    const attributes: any = { href: url }

    // Check if the link is internal (relative or same domain)
    const isInternal = url.startsWith('/') ||
                      url.startsWith('#') ||
                      url.includes('thetutorbridge.com') ||
                      url.includes('localhost')

    if (isInternal) {
      // Internal links: no target, no rel attributes (dofollow, same tab)
      // Don't add any rel or target attributes for internal links
    } else {
      // External links
      if (nofollow) {
        attributes.rel = 'noopener noreferrer nofollow'
        attributes.target = '_blank'
      } else {
        // For external dofollow links, add noopener noreferrer for security
        attributes.rel = 'noopener noreferrer'
        attributes.target = '_blank'
      }
    }

    // If we're editing an existing link, update it
    if (editor.isActive('link')) {
      // Need to unset and reset the link to properly update all attributes
      // Because updateAttributes doesn't remove old attributes, only adds/updates
      editor.chain().focus().extendMarkRange('link').unsetLink().setLink(attributes).run()
    } else if (text.trim()) {
      // Insert new link with text
      let linkHtml = `<a href="${url}"`
      if (attributes.rel) {
        linkHtml += ` rel="${attributes.rel}"`
      }
      if (attributes.target) {
        linkHtml += ` target="${attributes.target}"`
      }
      linkHtml += `>${text.trim()}</a>`
      editor.chain().focus().insertContent(linkHtml).run()
    } else {
      // Set link on selected text (fallback)
      editor.chain().focus().setLink(attributes).run()
    }

    setLinkDialog({ isOpen: false })
  }


  const MenuButton = ({ onClick, isActive, children, title }: { onClick: () => void, isActive?: boolean, children: React.ReactNode, title: string }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-200' : ''}`}
      title={title}
    >
      {children}
    </button>
  )

  const MenuSeparator = () => <div className="w-px h-6 bg-gray-300 mx-1" />

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Loading editor...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[400px] flex items-center justify-center border border-gray-200 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <div className="text-gray-600">Loading rich text editor...</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Content</CardTitle>
            <CardDescription>Write your blog post content with rich text editing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => {
                  handleInputChange('title', e.target.value)
                  // Auto-generate slug from title
                  if (!formData.slug || formData.slug === '') {
                    const slug = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                      .trim()
                    handleInputChange('slug', slug)
                  }
                }}
                placeholder="Enter blog post title"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug || ''}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="url-friendly-slug"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                URL: /blog/{formData.slug || 'your-slug'}
              </p>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt || ''}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Brief description of your blog post"
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Content *</Label>
              
              {/* Toolbar */}
              <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                {/* History */}
                <MenuButton onClick={() => editor?.chain().focus().undo().run()} title="Undo">
                  <Undo className="h-4 w-4" />
                </MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().redo().run()} title="Redo">
                  <Redo className="h-4 w-4" />
                </MenuButton>
                <MenuSeparator />

                {/* Headings */}
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} 
                  isActive={editor?.isActive('heading', { level: 1 })}
                  title="Heading 1"
                >
                  <Heading1 className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
                  isActive={editor?.isActive('heading', { level: 2 })}
                  title="Heading 2"
                >
                  <Heading2 className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} 
                  isActive={editor?.isActive('heading', { level: 3 })}
                  title="Heading 3"
                >
                  <Heading3 className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()} 
                  isActive={editor?.isActive('heading', { level: 4 })}
                  title="Heading 4"
                >
                  <Heading4 className="h-4 w-4" />
                </MenuButton>
                <MenuSeparator />

                {/* Text Formatting */}
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleBold().run()} 
                  isActive={editor?.isActive('bold')}
                  title="Bold"
                >
                  <BoldIcon className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleItalic().run()} 
                  isActive={editor?.isActive('italic')}
                  title="Italic"
                >
                  <ItalicIcon className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleUnderline().run()} 
                  isActive={editor?.isActive('underline')}
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleStrike().run()} 
                  isActive={editor?.isActive('strike')}
                  title="Strikethrough"
                >
                  <Strikethrough className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleCode().run()} 
                  isActive={editor?.isActive('code')}
                  title="Code"
                >
                  <Code className="h-4 w-4" />
                </MenuButton>
                <MenuSeparator />

                {/* Lists */}
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleBulletList().run()} 
                  isActive={editor?.isActive('bulletList')}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()} 
                  isActive={editor?.isActive('orderedList')}
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </MenuButton>
                <MenuSeparator />

                {/* Block Elements */}
                <MenuButton 
                  onClick={() => editor?.chain().focus().toggleBlockquote().run()} 
                  isActive={editor?.isActive('blockquote')}
                  title="Quote"
                >
                  <Quote className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => editor?.chain().focus().setHorizontalRule().run()} 
                  title="Horizontal Rule"
                >
                  <Minus className="h-4 w-4" />
                </MenuButton>
                <MenuButton
                  onClick={addTable} 
                  title="Insert Table"
                >
                  <TableIcon className="h-4 w-4" />
                </MenuButton>
                <MenuButton
                  onClick={addTableWithMergedCells} 
                  title="Insert Table with Merged Cells Support"
                >
                  <TableIcon className="h-4 w-4" />
                  <span className="text-xs ml-1">+</span>
                </MenuButton>
                <MenuButton
                  onClick={addMathEquation} 
                  title="Insert Inline Math Equation"
                >
                  <Sigma className="h-4 w-4" />
                </MenuButton>
                <MenuButton
                  onClick={addMathBlock} 
                  title="Insert Math Block"
                >
                  <Calculator className="h-4 w-4" />
                </MenuButton>
                <MenuSeparator />

                {/* Links and Media */}
                <MenuButton 
                  onClick={openLinkDialog} 
                  isActive={editor?.isActive('link')}
                  title="Add Link"
                >
                  <Link className="h-4 w-4" />
                </MenuButton>
                <MenuButton 
                  onClick={() => fileInputRef.current?.click()} 
                  title="Insert Image"
                >
                  <ImageIcon className="h-4 w-4" />
                </MenuButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Editor */}
              <div className="border border-t-0 border-gray-200 rounded-b-lg">
                <EditorContent editor={editor} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author_name">Author Name</Label>
                  <Input
                    id="author_name"
                    value={formData.author_name || ''}
                    onChange={(e) => handleInputChange('author_name', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Author Avatar</Label>
                  <div className="mt-2 space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleAuthorImageUpload}
                      ref={authorImageInputRef}
                      className="cursor-pointer"
                    />
                    <div className="text-sm text-gray-500">Or enter URL manually:</div>
                    <Input
                      id="author_image"
                      value={formData.author_image || ''}
                      onChange={(e) => handleInputChange('author_image', e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                  {formData.author_image && (
                    <div className="mt-2">
                      <img
                        src={formData.author_image}
                        alt="Author Avatar"
                        className="w-16 h-16 object-cover rounded-full border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="author_linkedin">Author LinkedIn</Label>
                  <Input
                    id="author_linkedin"
                    value={formData.author_linkedin || ''}
                    onChange={(e) => handleInputChange('author_linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Featured Image</Label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFeaturedImageUpload}
                      className="cursor-pointer"
                    />
                  </div>
                  {formData.featured_image && (
                    <div className="mt-2 relative">
                      <img 
                        src={formData.featured_image} 
                        alt="Featured" 
                        className="w-full h-32 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleInputChange('featured_image', '')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        title="Remove featured image"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status || 'draft'} onValueChange={(value: 'draft' | 'published') => handleInputChange('status', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="published_at">Published Date</Label>
                  <Input
                    id="published_at"
                    type="datetime-local"
                    value={formData.published_at ? new Date(formData.published_at).toISOString().slice(0, 16) : ''}
                    onChange={(e) => {
                      const value = e.target.value ? new Date(e.target.value).toISOString() : '';
                      handleInputChange('published_at', value);
                    }}
                    className="mt-1"
                    placeholder="Select publication date"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty to use current date when publishing
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag) => (
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
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title || ''}
                    onChange={(e) => handleInputChange('meta_title', e.target.value)}
                    placeholder="SEO title (defaults to post title)"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description || ''}
                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                    placeholder="SEO description (defaults to excerpt)"
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button
            onClick={() => handleSave('draft')}
            disabled={isSaving}
            variant="outline"
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave('published')}
            disabled={isSaving}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            <Eye className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>

        <Button
          onClick={() => setIsPreview(!isPreview)}
          variant="outline"
          className="w-full"
        >
          <Eye className="h-4 w-4 mr-2" />
          {isPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>

      {/* Preview */}
      {isPreview && (
        <div className="lg:col-span-4">
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
                  <span className="text-sm text-gray-500">By {formData.author_name || 'Unknown Author'}</span>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="prose prose-lg max-w-none">
                  {editor && <EditorContent editor={editor} editable={false} />}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Link Dialog */}
      <LinkDialog
        isOpen={linkDialog.isOpen}
        onClose={() => setLinkDialog({ isOpen: false })}
        onSetLink={setLink}
        currentUrl={linkDialog.url}
        currentText={linkDialog.text}
        currentNofollow={linkDialog.nofollow}
      />


      {/* Image Dialog */}
      {imageDialog.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {(window as any).pendingImageUrl ? 'Add Image Details' : 'Edit Image Details'}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-alt">Alt Text (required for accessibility)</Label>
                <Input
                  id="image-alt"
                  value={imageDialog.alt || ''}
                  onChange={(e) => setImageDialog(prev => ({ ...prev, alt: e.target.value }))}
                  placeholder="Describe the image for screen readers"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="image-description">Description (optional)</Label>
                <Textarea
                  id="image-description"
                  value={imageDialog.description || ''}
                  onChange={(e) => setImageDialog(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional description or caption"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => insertImageWithMetadata(imageDialog.alt || '', imageDialog.description || '')}
                disabled={!imageDialog.alt?.trim()}
                className="flex-1"
              >
                {(window as any).pendingImageUrl ? 'Insert Image' : 'Update Image'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setImageDialog({ isOpen: false })}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
