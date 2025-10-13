const LOCAL_SUPABASE_URL = 'http://127.0.0.1:54321';
const LOCAL_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

async function removeNoFollowFromAllPosts() {
  console.log('Fetching all blog posts...');

  // Fetch all blog posts
  const response = await fetch(`${LOCAL_SUPABASE_URL}/rest/v1/blog_posts?select=*`, {
    headers: {
      'apikey': LOCAL_SERVICE_KEY,
      'Authorization': `Bearer ${LOCAL_SERVICE_KEY}`
    }
  });

  const posts = await response.json();
  console.log(`Found ${posts.length} blog posts to process.`);

  let updatedCount = 0;
  let errorCount = 0;

  for (const post of posts) {
    try {
      let contentModified = false;
      let content = post.content;

      // Function to recursively process content nodes
      function processNode(node) {
        if (!node) return;

        // Process marks (for link marks)
        if (node.marks && Array.isArray(node.marks)) {
          node.marks.forEach(mark => {
            if (mark.type === 'link' && mark.attrs) {
              if (mark.attrs.rel && mark.attrs.rel.includes('nofollow')) {
                // Remove nofollow from rel attribute
                mark.attrs.rel = mark.attrs.rel
                  .split(' ')
                  .filter(rel => rel !== 'nofollow')
                  .join(' ')
                  .trim();

                // If rel is empty, remove it entirely
                if (!mark.attrs.rel) {
                  delete mark.attrs.rel;
                }
                contentModified = true;
              }
            }
          });
        }

        // Process child nodes recursively
        if (node.content && Array.isArray(node.content)) {
          node.content.forEach(childNode => processNode(childNode));
        }
      }

      // Process the content
      processNode(content);

      // Update the post if content was modified
      if (contentModified) {
        const updateResponse = await fetch(`${LOCAL_SUPABASE_URL}/rest/v1/blog_posts?id=eq.${post.id}`, {
          method: 'PATCH',
          headers: {
            'apikey': LOCAL_SERVICE_KEY,
            'Authorization': `Bearer ${LOCAL_SERVICE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({ content })
        });

        if (updateResponse.ok) {
          updatedCount++;
          console.log(`✓ Updated post: ${post.title} (${updatedCount}/${posts.length})`);
        } else {
          const errorText = await updateResponse.text();
          console.error(`✗ Failed to update post: ${post.title} - ${errorText}`);
          errorCount++;
        }
      } else {
        console.log(`○ No changes needed for: ${post.title}`);
      }
    } catch (error) {
      console.error(`✗ Error processing post: ${post.title} - ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n✅ Complete! ${updatedCount} posts updated, ${errorCount} errors, ${posts.length - updatedCount - errorCount} posts needed no changes.`);
}

removeNoFollowFromAllPosts().catch(console.error);
