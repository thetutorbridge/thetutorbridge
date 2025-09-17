'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Table as TableIcon,
  Save,
  Eye,
  Upload,
  X
} from 'lucide-react';

interface BlogPostData {
  title: string;
  slug: string;
  content: any;
  excerpt: string;
  featured_image: string;
  author_name: string;
  author_linkedin: string;
  author_image: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
}

interface BlogEditorProps {
  initialData?: BlogPostData;
  onSave?: (data: BlogPostData) => Promise<void>;
  onPublish?: (data: BlogPostData) => Promise<void>;
  postId?: string;
}

function BlogEditorComponent({ 
  initialData, 
  onSave, 
  onPublish, 
  postId 
}: BlogEditorProps) {
  const [formData, setFormData] = useState<BlogPostData>({
    title: '',
    slug: '',
    content: {},
    excerpt: '',
    featured_image: '',
    author_name: 'Rishabh Jain',
    author_linkedin: 'https://www.linkedin.com/in/rishabh-jain-33b946214/',
    author_image: 'Rishabh Jain.jpeg',
    tags: [],
    status: 'draft',
    meta_title: '',
    meta_description: '',
    meta_keywords: []
  });

  const [saving, setSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize editor only on client side
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-sm mx-auto',
          style: 'max-height: 500px;'
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline bg-blue-50 px-1 rounded',
        }
      }),
      Table,
      TableRow,
      TableHeader,
      TableCell
    ],
    content: initialData?.content || '',
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      // Editor is created and ready
      console.log('Editor created successfully');
    },
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        content: editor.getJSON()
      }));
    }
  }, [isClient, initialData?.content]);

  // Define handleImageUpload after editor is available
  const handleImageUpload = useCallback(async (file: File) => {
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (postId) {
        formData.append('postId', postId);
      }

      const response = await fetch('/api/upload-blog-image', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.success && editor) {
        editor.chain().focus().setImage({ src: result.url }).run();
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploadingImage(false);
    }
  }, [editor, postId]);

  // Define handlePaste after handleImageUpload is available
  const handlePaste = useCallback((event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            event.preventDefault();
            handleImageUpload(file);
          }
        }
      }
    }
  }, [handleImageUpload]);

  // Add paste event listener when editor is created
  useEffect(() => {
    if (!editor || !isClient) {
      return;
    }

    const handlePasteEvent = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            if (file) {
              event.preventDefault();
              handleImageUpload(file);
            }
          }
        }
      }
    };

    // Add a small delay to ensure the editor is fully mounted
    const timeoutId = setTimeout(() => {
      try {
        if (editor && editor.view && editor.view.dom) {
          editor.view.dom.addEventListener('paste', handlePasteEvent);
        }
      } catch (error) {
        console.warn('Editor view not ready for paste events:', error);
      }
    }, 200);
    
    return () => {
      clearTimeout(timeoutId);
      try {
        if (editor && editor.view && editor.view.dom) {
          editor.view.dom.removeEventListener('paste', handlePasteEvent);
        }
      } catch (error) {
        console.warn('Error removing paste event listener:', error);
      }
    };
  }, [editor, handleImageUpload, isClient]);

  // Initialize form data
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (editor && initialData.content) {
        editor.commands.setContent(initialData.content);
      }
    }
  }, [initialData, editor]);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !initialData?.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, initialData?.slug]);

  // Auto-generate meta title from title
  useEffect(() => {
    if (formData.title && !formData.meta_title) {
      setFormData(prev => ({ ...prev, meta_title: formData.title }));
    }
  }, [formData.title, formData.meta_title]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.meta_keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        meta_keywords: [...prev.meta_keywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      meta_keywords: prev.meta_keywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const handleSave = async () => {
    if (!onSave) return;
    
    setSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!onPublish) return;
    
    setSaving(true);
    try {
      await onPublish({ ...formData, status: 'published' });
    } catch (error) {
      console.error('Publish error:', error);
      alert('Failed to publish post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!isClient || !editor) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading editor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            onClick={handlePublish}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="w-4 h-4" />
            {saving ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter blog post title"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-friendly-slug"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the blog post"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="featured-image-url">Image URL</Label>
                  <Input
                    id="featured-image-url"
                    value={formData.featured_image}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
                
                {formData.featured_image && (
                  <div className="featured-image-container w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={formData.featured_image}
                      alt="Featured"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Toolbar */}
              <div className="border border-gray-200 rounded-t-lg p-2 flex flex-wrap gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={editor?.isActive('bold') ? 'bg-gray-200' : ''}
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={editor?.isActive('italic') ? 'bg-gray-200' : ''}
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={editor?.isActive('bulletList') ? 'bg-gray-200' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  className={editor?.isActive('orderedList') ? 'bg-gray-200' : ''}
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const url = window.prompt('Enter URL:');
                    if (url && editor) {
                      editor.chain().focus().setLink({ href: url }).run();
                    }
                  }}
                  className={editor?.isActive('link') ? 'bg-gray-200' : ''}
                >
                  <LinkIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleImageUpload(file);
                    };
                    input.click();
                  }}
                  disabled={isUploadingImage}
                >
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                >
                  <TableIcon className="w-4 h-4" />
                </Button>
              </div>

              {/* Editor */}
              <div className="border border-t-0 border-gray-200 rounded-b-lg">
                <EditorContent 
                  editor={editor} 
                  className="prose prose-sm max-w-none p-4 min-h-[400px] focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="SEO title"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="SEO description"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label>Meta Keywords</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add keyword"
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button onClick={addKeyword} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.meta_keywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="flex items-center gap-1">
                      {keyword}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeKeyword(keyword)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Export with dynamic import to avoid SSR issues
const BlogEditor = dynamic(() => Promise.resolve(BlogEditorComponent), {
  ssr: false,
  loading: () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    </div>
  )
});

export default BlogEditor;
