const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

console.log('🧪 Testing blog post creation...')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('📋 Environment variables:')
console.log('URL exists:', !!supabaseUrl)
console.log('Key exists:', !!supabaseKey)
console.log('URL length:', supabaseUrl?.length || 0)
console.log('Key length:', supabaseKey?.length || 0)

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testBlogCreation() {
  try {
    console.log('🔌 Testing blog post creation...')
    
    const testPost = {
      title: 'Test Blog Post with Image',
      slug: 'test-blog-post-with-image',
      excerpt: 'This is a test post with image content',
      content: `# Test Post

This is a test post with **bold text** and *italic text*.

Here's an image: ![Test Image](https://via.placeholder.com/400x200/FF6B35/FFFFFF?text=Test+Image)

And a link: [Visit our website](https://thetutorbridge.com)

This post has <span style="color: red">colored text</span> and <span style="font-size: 24px">larger text</span>.`,
      author: 'Test Author',
      tags: ['Test', 'Image', 'Formatting'],
      featured_image: null,
      read_time: 3,
      status: 'draft'
    }

    console.log('📝 Attempting to create post with data:', testPost)

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(testPost)
      .select()
      .single()

    if (error) {
      console.error('❌ Error creating post:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
    } else {
      console.log('✅ Post created successfully!')
      console.log('Created post:', data)
      
      // Clean up - delete the test post
      const { error: deleteError } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', data.id)
      
      if (deleteError) {
        console.log('⚠️ Could not clean up test post:', deleteError.message)
      } else {
        console.log('🧹 Test post cleaned up successfully')
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

testBlogCreation() 