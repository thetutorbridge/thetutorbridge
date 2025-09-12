# Blog Image Upload and Management Guide

This guide explains how to use the new image upload and management functionality in the blog system.

## Features Added

### 1. Image Upload Functions (`lib/blog.ts`)

- **`uploadBlogImage(file, options)`** - Upload a single image to Supabase storage
- **`uploadMultipleBlogImages(files, options)`** - Upload multiple images at once
- **`getBlogImageUrl(filePath)`** - Get public URL for a stored image
- **`deleteBlogImage(filePath)`** - Delete an image from storage
- **`listBlogImages(folder, limit)`** - List all images in storage
- **`createImageMarkdown(publicUrl, altText, title)`** - Generate markdown for images
- **`extractImageUrlsFromMarkdown(content)`** - Extract image URLs from markdown content
- **`isBlogImageUrl(url)`** - Validate if URL is from our storage

### 2. UI Integration

- **New Blog Post Page** (`app/admin/blog/new/page.tsx`) - Updated with improved image upload
- **Edit Blog Post Page** (`app/admin/blog/edit/[id]/page.tsx`) - Added image upload capability
- **Preview Functionality** - Both pages now properly render uploaded images in preview mode
- **Blog Display Page** (`app/blog/[slug]/page.tsx`) - Fixed to properly render images in published blog posts
- **Blog Listing Page** (`app/blog/page.tsx`) - Enhanced error handling for featured images

## How to Use

### Setting Up Storage (One-time setup)

1. **Create Storage Bucket in Supabase Dashboard:**
   - Go to your Supabase project dashboard
   - Navigate to Storage section
   - Create a new bucket named `blog-images`
   - Set it to **Public** (important for image display)
   - Configure these settings:
     - Allowed MIME types: `image/jpeg, image/jpg, image/png, image/gif, image/webp`
     - File size limit: `5242880` (5MB)

2. **Environment Variables Required:**
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

3. **Alternative: Manual SQL Setup**
   If you prefer SQL commands, run this in your Supabase SQL editor:
   ```sql
   -- Create the storage bucket
   INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
   VALUES (
     'blog-images', 
     'blog-images', 
     true, 
     5242880,
     '{"image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"}'
   );
   ```

### Using Image Links in Blog Editor

#### Add Image via URL
1. Click the "Image" button in the formatting toolbar
2. Enter the direct image URL in the "Image URL" field
3. Click "Insert Image"
4. The markdown will be inserted: `![Image](your-image-url)`

**Supported image formats:** JPEG, PNG, GIF, WebP
**Example URLs:**
- `https://example.com/image.jpg`
- `https://your-supabase-project.supabase.co/storage/v1/object/public/blog-images/image.png`

### Image Specifications

- **Supported formats:** JPEG, JPG, PNG, GIF, WebP
- **Input method:** Direct URL links only
- **External hosting:** Images must be hosted externally (e.g., image hosting services, CDNs, etc.)
- **Public access:** Image URLs must be publicly accessible

### Generated URLs

Images are stored with unique filenames and accessible via URLs like:
```
https://your-project-id.supabase.co/storage/v1/object/public/blog-images/1234567890-abc123.jpg
```

### Markdown Format

The system automatically generates proper markdown:
```markdown
![Image](https://your-project-id.supabase.co/storage/v1/object/public/blog-images/1234567890-abc123.jpg)
```

## Advanced Usage

### Programmatic Upload

```javascript
import { uploadBlogImage, createImageMarkdown } from '@/lib/blog'

// Upload image with custom options
const result = await uploadBlogImage(file, {
  fileName: 'custom-name.jpg',
  folder: 'blog-images',
  maxSizeBytes: 2 * 1024 * 1024 // 2MB limit
})

if (result.success) {
  const markdown = createImageMarkdown(result.publicUrl, 'My Image', 'Optional Title')
  console.log(markdown) // ![My Image](url "Optional Title")
}
```

### Batch Upload

```javascript
import { uploadMultipleBlogImages } from '@/lib/blog'

const results = await uploadMultipleBlogImages([file1, file2, file3])
results.forEach((result, index) => {
  if (result.success) {
    console.log(`Image ${index + 1} uploaded:`, result.publicUrl)
  } else {
    console.error(`Image ${index + 1} failed:`, result.error)
  }
})
```

### Image Management

```javascript
import { listBlogImages, deleteBlogImage } from '@/lib/blog'

// List all images
const { success, files } = await listBlogImages()
if (success) {
  files.forEach(file => {
    console.log(file.name, file.publicUrl)
  })
}

// Delete an image
const deleteResult = await deleteBlogImage('blog-images/1234567890-abc123.jpg')
if (deleteResult.success) {
  console.log('Image deleted successfully')
}
```

## Security and Permissions

- Images are stored in a public bucket for easy access
- File type validation prevents malicious uploads
- File size limits prevent storage abuse
- Unique filenames prevent conflicts and unauthorized access
- All uploads are logged for debugging

## Troubleshooting

### Common Issues

1. **Images don't display in preview or published posts**
   - Check that the image URL is accessible by opening it directly in a browser
   - Verify the markdown syntax is correct: `![alt text](image_url)`
   - Check browser console for error messages (press F12 → Console tab)
   - Ensure the image URL is publicly accessible (not behind authentication)
   - Check if the URL points directly to an image file (ends with .jpg, .png, etc.)

2. **Invalid image URL**
   - Make sure the URL starts with `http://` or `https://`
   - Verify the URL points directly to an image file
   - Test the URL by pasting it in a new browser tab

3. **CORS errors**
   - Some image hosting services block cross-origin requests
   - Try using a different image hosting service
   - Consider using CDN services like Cloudinary, ImageKit, or similar

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase setup and permissions
3. Test the upload functionality with the setup script
4. Check the network tab to see if requests are being made correctly

## Example Usage in Blog Posts

Once you upload images, they'll appear in your blog posts like this:

```markdown
# My Blog Post

Here's some text content.

![Beautiful landscape](https://your-project-id.supabase.co/storage/v1/object/public/blog-images/1234567890-abc123.jpg)

More text content here.
```

The images will be automatically styled with responsive design and proper spacing in the blog post display.