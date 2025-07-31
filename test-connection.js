const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

console.log('🔍 Testing Supabase connection...')

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

async function testConnection() {
  try {
    console.log('🔌 Testing basic connection...')
    
    // Test a simple query
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Connection failed:', error)
      return
    }

    console.log('✅ Connection successful!')
    console.log('📊 Query result:', data)

    // Test insert capability
    console.log('🧪 Testing insert capability...')
    
    const testPost = {
      title: 'Connection Test Post',
      slug: 'connection-test-post',
      excerpt: 'Testing database connection',
      content: 'This is a test post to verify database connectivity.',
      author: 'Test Author',
      tags: ['Test'],
      featured_image: null,
      read_time: 1,
      status: 'draft'
    }

    const { data: insertData, error: insertError } = await supabase
      .from('blog_posts')
      .insert(testPost)
      .select()
      .single()

    if (insertError) {
      console.error('❌ Insert test failed:', insertError)
      console.error('Error details:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      })
    } else {
      console.log('✅ Insert test successful!')
      console.log('Created post:', insertData)
      
      // Clean up - delete the test post
      const { error: deleteError } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', insertData.id)
      
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

testConnection() 