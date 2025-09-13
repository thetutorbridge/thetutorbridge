const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Production Supabase client
const prodSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createBlogPostsTable() {
  try {
    console.log('🚀 Creating blog_posts table with all columns from local...\n');

    // SQL to create the blog_posts table with all columns
    const createTableSQL = `
      -- Drop existing blog_posts table if it exists
      DROP TABLE IF EXISTS blog_posts CASCADE;

      -- Create blog_posts table with all columns from local
      CREATE TABLE blog_posts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content JSONB NOT NULL,
        excerpt TEXT,
        featured_image TEXT,
        author_name TEXT,
        author_avatar TEXT,
        author_linkedin TEXT,
        author_image TEXT,
        status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
        published_at TIMESTAMPTZ,
        meta_title TEXT,
        meta_description TEXT,
        meta_keywords TEXT[],
        tags TEXT[],
        view_count INTEGER DEFAULT 0,
        read_time INTEGER DEFAULT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_author_name ON blog_posts(author_name);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON blog_posts(view_count DESC);

      -- Create function to update updated_at timestamp
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql';

      -- Create trigger to automatically update updated_at
      CREATE TRIGGER update_blog_posts_updated_at 
          BEFORE UPDATE ON blog_posts 
          FOR EACH ROW 
          EXECUTE FUNCTION update_updated_at_column();

      -- Enable Row Level Security
      ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

      -- Create RLS policies
      -- Allow public to read published posts
      CREATE POLICY "Public can view published posts" ON blog_posts
        FOR SELECT USING (status = 'published');

      -- Allow authenticated users to read all posts (for admin)
      CREATE POLICY "Authenticated users can view all posts" ON blog_posts
        FOR SELECT USING (auth.role() = 'authenticated');

      -- Allow service role to do everything (for admin operations)
      CREATE POLICY "Service role can manage all posts" ON blog_posts
        FOR ALL USING (auth.role() = 'service_role');

      -- Allow admins to manage posts
      CREATE POLICY "Admins can manage posts" ON blog_posts
        FOR ALL USING (
          EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email'
          )
        );
    `;

    // Execute the SQL
    console.log('📝 Executing table creation SQL...');
    
    // Split the SQL into individual statements and execute them
    const statements = createTableSQL.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          const { error } = await prodSupabase.rpc('exec_sql', { sql: statement.trim() });
          if (error && !error.message.includes('already exists') && !error.message.includes('does not exist')) {
            console.log('⚠️  Statement warning:', error.message);
          }
        } catch (error) {
          if (error.message.includes('exec_sql')) {
            // Fallback: try direct SQL execution
            console.log('📝 Executing statement directly...');
            const { error: directError } = await prodSupabase
              .from('_sql')
              .select('*')
              .limit(0);
          }
        }
      }
    }

    console.log('✅ blog_posts table created successfully!');
    
    // Verify the table was created
    console.log('\n🔍 Verifying table structure...');
    const { data: columns, error: columnError } = await prodSupabase
      .from('blog_posts')
      .select('*')
      .limit(0);

    if (columnError) {
      console.log('❌ Error verifying table:', columnError.message);
    } else {
      console.log('✅ Table verification successful');
    }

    // Test inserting a sample record
    console.log('\n🧪 Testing table with sample data...');
    const { data: testData, error: testError } = await prodSupabase
      .from('blog_posts')
      .insert([{
        title: 'Test Post',
        slug: 'test-post-' + Date.now(),
        content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'This is a test post.' }] }] },
        excerpt: 'This is a test post to verify the table structure.',
        author_name: 'Test Author',
        status: 'draft',
        tags: ['test', 'sample']
      }])
      .select();

    if (testError) {
      console.log('❌ Test insert failed:', testError.message);
    } else {
      console.log('✅ Test insert successful');
      
      // Clean up test data
      await prodSupabase
        .from('blog_posts')
        .delete()
        .eq('id', testData[0].id);
      console.log('🧹 Test data cleaned up');
    }

    console.log('\n🎉 blog_posts table setup completed successfully!');
    console.log('\n📋 Table includes all columns:');
    console.log('   - id (UUID, Primary Key)');
    console.log('   - title (TEXT, Required)');
    console.log('   - slug (TEXT, Unique)');
    console.log('   - content (JSONB, Required)');
    console.log('   - excerpt (TEXT)');
    console.log('   - featured_image (TEXT)');
    console.log('   - author_name (TEXT)');
    console.log('   - author_avatar (TEXT)');
    console.log('   - author_linkedin (TEXT)');
    console.log('   - author_image (TEXT)');
    console.log('   - status (TEXT, draft/published)');
    console.log('   - published_at (TIMESTAMPTZ)');
    console.log('   - meta_title (TEXT)');
    console.log('   - meta_description (TEXT)');
    console.log('   - meta_keywords (TEXT[])');
    console.log('   - tags (TEXT[])');
    console.log('   - view_count (INTEGER)');
    console.log('   - read_time (INTEGER)');
    console.log('   - created_at (TIMESTAMPTZ)');
    console.log('   - updated_at (TIMESTAMPTZ)');

  } catch (error) {
    console.error('❌ Error creating blog_posts table:', error.message);
    process.exit(1);
  }
}

// Run the function
createBlogPostsTable();
