// Test script to create a blog post
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!')
  console.error('Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testCreatePost() {
  console.log('🧪 Testing blog post creation...')
  
  try {
    const testPost = {
      title: 'Test Post from Script',
      slug: 'test-post-from-script',
      excerpt: 'This is a test post created from the script',
      content: '# Test Content\n\nThis is test content for the blog post.',
      author: 'Test Author',
      tags: ['Test', 'Script'],
      featured_image: null,
      read_time: 2,
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
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

testCreatePost() 