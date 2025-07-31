// This is a simple test to check if Supabase is working in the browser
// You can run this in the browser console

console.log('🧪 Testing Supabase in browser...')

// Check if environment variables are available
console.log('Environment variables:')
console.log('- NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Test a simple fetch request to Supabase
async function testSupabaseConnection() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?select=count`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Supabase connection successful:', data)
    } else {
      console.error('❌ Supabase connection failed:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('❌ Error testing Supabase connection:', error)
  }
}

testSupabaseConnection() 