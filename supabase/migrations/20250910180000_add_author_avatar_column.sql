-- Add author_avatar column to blog_posts table
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_avatar TEXT;

-- Copy existing author_image data to author_avatar for backward compatibility
UPDATE blog_posts SET author_avatar = author_image WHERE author_image IS NOT NULL;

-- Create index for author_avatar
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_avatar ON blog_posts(author_avatar);


