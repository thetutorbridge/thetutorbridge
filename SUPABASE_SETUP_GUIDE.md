# Supabase Integration Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `thetutorbridge-blog`
   - Database Password: Choose a strong password
   - Region: Select closest to your users
5. Click "Create new project"

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

## Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace the values with your actual Supabase credentials.

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to SQL Editor
2. Copy the entire contents of `supabase-schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

This will create:
- `blog_posts` table with all necessary columns
- Indexes for better performance
- Sample blog posts
- Row Level Security (RLS) policies

## Step 5: Configure Row Level Security

The schema includes RLS policies that:
- Allow public read access to published posts
- Allow authenticated users to manage all posts

For now, you can disable RLS for testing:
1. Go to Authentication → Policies
2. Find the `blog_posts` table
3. Toggle off "Enable RLS"

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `/blog` to see the public blog
3. Visit `/admin` to access the CMS
4. Try creating, editing, and deleting posts

## Step 7: Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Database Schema Details

### blog_posts Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, auto-generated |
| title | TEXT | Blog post title |
| slug | TEXT | URL-friendly slug (unique) |
| excerpt | TEXT | Brief description |
| content | TEXT | Full markdown content |
| author | TEXT | Author name |
| published_at | TIMESTAMP | Publication date |
| updated_at | TIMESTAMP | Last update date |
| tags | TEXT[] | Array of tags |
| featured_image | TEXT | Image URL |
| read_time | INTEGER | Estimated read time in minutes |
| status | TEXT | 'draft' or 'published' |
| created_at | TIMESTAMP | Creation date |

### Indexes

- `idx_blog_posts_status` - For filtering by status
- `idx_blog_posts_slug` - For fast slug lookups
- `idx_blog_posts_published_at` - For date sorting
- `idx_blog_posts_tags` - For tag filtering

### Triggers

- `update_blog_posts_updated_at` - Automatically updates `updated_at` on changes

## Security Features

### Row Level Security (RLS)

The schema includes policies for:
- **Public Access**: Anyone can read published posts
- **Authenticated Access**: Authenticated users can manage posts

### Data Validation

- Status field only accepts 'draft' or 'published'
- Slug must be unique
- Required fields are enforced

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check your environment variables
   - Ensure you're using the anon key, not the service role key

2. **"Table doesn't exist" error**
   - Run the SQL schema in Supabase SQL Editor
   - Check table name spelling

3. **"Permission denied" error**
   - Disable RLS for testing
   - Check RLS policies if enabled

4. **Posts not showing**
   - Check if posts have status = 'published'
   - Verify the database connection

### Debug Mode

Add this to your `.env.local` for debugging:

```bash
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## Next Steps

1. **Add Authentication**: Implement user login for admin access
2. **Image Upload**: Add Supabase Storage for image uploads
3. **SEO Optimization**: Add meta tags and structured data
4. **Analytics**: Track post views and engagement
5. **Comments**: Add a comments system
6. **Newsletter**: Integrate email marketing

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Next.js Documentation](https://nextjs.org/docs)

## Migration from Static Data

The blog system has been updated to use Supabase instead of static data. All functions now return Promises and need to be awaited:

```typescript
// Old (static)
const posts = getAllBlogPosts()

// New (Supabase)
const posts = await getAllBlogPosts()
```

The database schema matches the existing data structure, so your existing blog posts will work seamlessly. 