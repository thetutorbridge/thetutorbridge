#!/usr/bin/env node

/**
 * Check RLS policies for blog_posts table
 * This helps debug deletion issues
 */

require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

async function checkRLSPolicies() {
  console.log('🔍 Checking RLS policies for blog_posts table...\n')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing required environment variables')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Check if RLS is enabled
    console.log('1. Checking if RLS is enabled...')
    const { data: rlsEnabled, error: rlsError } = await supabase
      .rpc('check_rls_enabled', { table_name: 'blog_posts' })
      .catch(() => ({ data: null, error: { message: 'Function not available' } }))

    if (rlsError) {
      console.log('⚠️  Could not check RLS status via function, checking manually...')
    } else {
      console.log('✅ RLS check result:', rlsEnabled)
    }

    // Try to get policies
    console.log('\n2. Checking policies...')
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'blog_posts')
      .catch(() => ({ data: null, error: { message: 'Cannot access pg_policies' } }))

    if (policiesError) {
      console.log('⚠️  Cannot access policies directly:', policiesError.message)
    } else if (policies && policies.length > 0) {
      console.log('✅ Found policies:')
      policies.forEach(policy => {
        console.log(`   - ${policy.policyname}: ${policy.cmd} on ${policy.tablename}`)
      })
    } else {
      console.log('⚠️  No policies found')
    }

    // Test basic operations
    console.log('\n3. Testing basic operations...')
    
    // Test SELECT
    const { data: selectTest, error: selectError } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1)
    
    if (selectError) {
      console.log('❌ SELECT test failed:', selectError.message)
    } else {
      console.log('✅ SELECT test passed')
    }

    // Test INSERT (this should fail for anonymous users)
    const { data: insertTest, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'Test excerpt',
        content: 'Test content',
        author: 'Test Author',
        tags: ['test'],
        status: 'draft'
      })
      .select()

    if (insertError) {
      console.log('⚠️  INSERT test failed (expected for anonymous users):', insertError.message)
    } else {
      console.log('✅ INSERT test passed (unexpected for anonymous users)')
    }

    // Test DELETE (this should fail for anonymous users)
    const { data: deleteTest, error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('title', 'Test Post')
      .select()

    if (deleteError) {
      console.log('⚠️  DELETE test failed (expected for anonymous users):', deleteError.message)
    } else {
      console.log('✅ DELETE test passed (unexpected for anonymous users)')
    }

    console.log('\n📋 Recommendations:')
    console.log('1. If DELETE operations are failing, check your RLS policies')
    console.log('2. For admin operations, you might need to:')
    console.log('   - Disable RLS temporarily for testing')
    console.log('   - Create a service role key for admin operations')
    console.log('   - Set up proper authentication')
    console.log('3. Check Supabase dashboard → Authentication → Policies')

  } catch (error) {
    console.error('❌ Error checking RLS policies:', error)
  }
}

checkRLSPolicies() 