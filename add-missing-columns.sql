-- Add missing columns to existing blog_posts table
-- Run this in your production Supabase SQL Editor

-- Add all missing columns to the existing blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS content JSONB,
ADD COLUMN IF NOT EXISTS excerpt TEXT,
ADD COLUMN IF NOT EXISTS featured_image TEXT,
ADD COLUMN IF NOT EXISTS author_name TEXT,
ADD COLUMN IF NOT EXISTS author_avatar TEXT,
ADD COLUMN IF NOT EXISTS author_linkedin TEXT,
ADD COLUMN IF NOT EXISTS author_image TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS meta_keywords TEXT[],
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS read_time INTEGER DEFAULT NULL,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add NOT NULL constraints to required fields (only if they don't already have data)
-- Note: Run these one by one and skip if you get errors about existing NULL values

-- Make slug required (skip if you have existing data)
-- ALTER TABLE blog_posts ALTER COLUMN slug SET NOT NULL;

-- Make content required (skip if you have existing data)  
-- ALTER TABLE blog_posts ALTER COLUMN content SET NOT NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_name ON blog_posts(author_name);
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
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (if not already enabled)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON blog_posts;
DROP POLICY IF EXISTS "Service role can manage all posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage posts" ON blog_posts;

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
