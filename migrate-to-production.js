const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Local Supabase (source)
const localSupabase = createClient(
  'http://127.0.0.1:54321',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
);

// Production Supabase (destination)
const prodSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const prodSupabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!prodSupabaseUrl || !prodSupabaseKey) {
  console.error('❌ Missing production Supabase environment variables!');
  console.error('Please check your .env.local file for:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const prodSupabase = createClient(prodSupabaseUrl, prodSupabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function migrateBlogPosts() {
  try {
    console.log('🚀 Starting migration from local to production...\n');

    // 1. Export blog posts from local
    console.log('📤 Exporting blog posts from local Supabase...');
    const { data: localPosts, error: localError } = await localSupabase
      .from('blog_posts')
      .select('*');

    if (localError) {
      throw new Error(`Local export error: ${localError.message}`);
    }

    console.log(`✅ Found ${localPosts.length} blog posts in local database`);
    
    if (localPosts.length === 0) {
      console.log('ℹ️  No blog posts to migrate');
      return;
    }

    // 2. Import to production (skip if already exists)
    console.log('\n📥 Importing blog posts to production...');
    
    for (const post of localPosts) {
      console.log(`\n🔄 Migrating: "${post.title}"`);
      
      // Check if post already exists by slug
      const { data: existingPost } = await prodSupabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .maybeSingle();

      if (existingPost) {
        console.log(`⏭️  Post with slug "${post.slug}" already exists, skipping...`);
        continue;
      }

      // Insert the post (using correct production schema column names)
      const { data: newPost, error: insertError } = await prodSupabase
        .from('blog_posts')
        .insert([{
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          featured_image: post.featured_image,
          author: post.author_name, // Note: production uses 'author' not 'author_name'
          status: post.status,
          published_at: post.published_at,
          tags: post.tags,
          read_time: post.read_time || null
        }])
        .select()
        .single();

      if (insertError) {
        console.error(`❌ Error inserting "${post.title}":`, insertError.message);
      } else {
        console.log(`✅ Successfully migrated: "${post.title}"`);
      }
    }

    console.log('\n🎉 Migration completed!');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

async function setupAdminUser() {
  try {
    console.log('\n👤 Setting up admin user in production...');
    
    // Add admin user to admin_users table
    const { data: adminUser, error: adminError } = await prodSupabase
      .from('admin_users')
      .insert([{
        email: 'thetutorbridge99@gmail.com',
        name: 'Rishabh Jain'
      }])
      .select()
      .single();

    if (adminError) {
      console.error('❌ Error adding admin user:', adminError.message);
    } else {
      console.log('✅ Admin user added to admin_users table');
    }

    // Note: User creation in Supabase Auth needs to be done manually
    console.log('\n⚠️  IMPORTANT: You still need to create a user account in Supabase Auth:');
    console.log('1. Go to your production Supabase dashboard');
    console.log('2. Navigate to Authentication → Users');
    console.log('3. Click "Add user"');
    console.log('4. Email: thetutorbridge99@gmail.com');
    console.log('5. Password: [set a secure password]');
    console.log('6. Click "Create user"');

  } catch (error) {
    console.error('❌ Admin setup failed:', error.message);
  }
}

async function main() {
  await migrateBlogPosts();
  await setupAdminUser();
}

main();
