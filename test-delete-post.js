#!/usr/bin/env node

/**
 * Test script for deleting blog posts
 * Usage: node test-delete-post.js [post-id]
 */

require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

async function testDeletePost(postId) {
  console.log('🧪 Testing blog post deletion...\n')
  
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('Environment check:')
  console.log('- NEXT_PUBLIC_SUPABASE_URL exists:', !!supabaseUrl)
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!supabaseKey)
  console.log('- Supabase URL:', supabaseUrl)
  console.log('- Supabase key (first 10 chars):', supabaseKey?.substring(0, 10) + '...')
  console.log()

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing required environment variables')
    process.exit(1)
  }

  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey)
  console.log('✅ Supabase client initialized')

  try {
    // First, let's check if the post exists
    console.log(`\n🔍 Checking if post with ID "${postId}" exists...`)
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (fetchError) {
      console.error('❌ Error fetching post:', fetchError)
      console.error('Error details:', {
        message: fetchError.message,
        details: fetchError.details,
        hint: fetchError.hint,
        code: fetchError.code
      })
      return
    }

    if (!existingPost) {
      console.log('❌ Post not found')
      return
    }

    console.log('✅ Post found:')
    console.log('- Title:', existingPost.title)
    console.log('- Slug:', existingPost.slug)
    console.log('- Status:', existingPost.status)
    console.log('- Created:', existingPost.created_at)

    // Now attempt to delete the post
    console.log(`\n🗑️  Attempting to delete post...`)
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId)

    if (deleteError) {
      console.error('❌ Error deleting post:', deleteError)
      console.error('Error details:', {
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint,
        code: deleteError.code
      })
      return
    }

    console.log('✅ Post deleted successfully!')

    // Verify the post is actually deleted
    console.log('\n🔍 Verifying deletion...')
    const { data: verifyPost, error: verifyError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (verifyError && verifyError.code === 'PGRST116') {
      console.log('✅ Post successfully deleted (not found in database)')
    } else if (verifyPost) {
      console.log('⚠️  Post still exists in database after deletion')
    } else {
      console.log('✅ Post successfully deleted')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Get post ID from command line arguments
const postId = process.argv[2]

if (!postId) {
  console.log('Usage: node test-delete-post.js [post-id]')
  console.log('Example: node test-delete-post.js 123e4567-e89b-12d3-a456-426614174000')
  process.exit(1)
}

testDeletePost(postId) 