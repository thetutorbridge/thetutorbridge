const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.production' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixBlogPost() {
  // First, check the current value
  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id, title, featured_image')
    .eq('slug', 'best-20-woocommerce-plugins-for-an-ecommerce-store')
    .single();

  if (fetchError) {
    console.error('Error fetching post:', fetchError);
    return;
  }

  console.log('Current post ID:', post.id);
  console.log('Title:', post.title);
  console.log('Featured image value:', JSON.stringify(post.featured_image));
  console.log('Featured image type:', typeof post.featured_image);

  // Update to null if it's empty or falsy
  if (!post.featured_image || (typeof post.featured_image === 'string' && post.featured_image.trim() === '')) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ featured_image: null })
      .eq('id', post.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
    } else {
      console.log('\n✅ Post updated successfully!');
      console.log('New featured_image:', data.featured_image);
    }
  } else {
    console.log('\nFeatured image is not empty, no update needed');
    console.log('Current value:', post.featured_image);
  }
}

fixBlogPost();
