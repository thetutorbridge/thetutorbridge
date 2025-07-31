// Test script to verify Supabase connection
// Run this with: node test-db.js

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

// Get Supabase credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!')
  console.error('Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test 1: Check if table exists
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Error connecting to database:', error.message)
      return
    }
    
    console.log('✅ Database connection successful!')
    console.log(`📊 Found ${posts.length} posts in database`)
    
    // Test 2: Get all published posts
    const { data: publishedPosts, error: publishedError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
    
    if (publishedError) {
      console.error('❌ Error fetching published posts:', publishedError.message)
      return
    }
    
    console.log(`📝 Found ${publishedPosts.length} published posts`)
    
    // Test 3: Show sample post
    if (publishedPosts.length > 0) {
      const samplePost = publishedPosts[0]
      console.log('\n📄 Sample post:')
      console.log(`Title: ${samplePost.title}`)
      console.log(`Author: ${samplePost.author}`)
      console.log(`Status: ${samplePost.status}`)
      console.log(`Created: ${samplePost.created_at}`)
    }
    
    console.log('\n🎉 Database setup is working correctly!')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

testConnection() 