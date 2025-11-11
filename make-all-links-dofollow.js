require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: Missing environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

async function makeAllLinksDofollow() {
  console.log('🔍 Fetching all blog posts...');

  // Fetch all blog posts
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=*`, {
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
    }
  });

  if (!response.ok) {
    console.error('❌ Failed to fetch blog posts:', await response.text());
    process.exit(1);
  }

  const posts = await response.json();
  console.log(`📝 Found ${posts.length} blog posts to process.\n`);

  let updatedCount = 0;
  let errorCount = 0;
  let noChangesCount = 0;

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
            if (mark.type === 'link' && mark.attrs && mark.attrs.href) {
              const url = mark.attrs.href;

              // Check if the link is external
              const isExternal = !url.startsWith('/') &&
                                !url.startsWith('#') &&
                                !url.includes('thetutorbridge.com') &&
                                !url.includes('localhost');

              if (isExternal) {
                // For external links, set to dofollow with security attributes
                const newRel = 'noopener noreferrer';
                const currentRel = mark.attrs.rel || '';

                // Always update if rel contains nofollow OR is different from newRel
                if (currentRel.includes('nofollow') || currentRel !== newRel) {
                  mark.attrs.rel = newRel;
                  mark.attrs.target = '_blank';
                  contentModified = true;
                }
              } else {
                // For internal links, remove rel and target attributes
                if (mark.attrs.rel || mark.attrs.target) {
                  delete mark.attrs.rel;
                  delete mark.attrs.target;
                  contentModified = true;
                }
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
        const updateResponse = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${post.id}`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({ content })
        });

        if (updateResponse.ok) {
          updatedCount++;
          console.log(`✅ Updated post: "${post.title}" (${updatedCount}/${posts.length})`);
        } else {
          const errorText = await updateResponse.text();
          console.error(`❌ Failed to update post: "${post.title}" - ${errorText}`);
          errorCount++;
        }
      } else {
        noChangesCount++;
        console.log(`⚪ No changes needed for: "${post.title}"`);
      }
    } catch (error) {
      console.error(`❌ Error processing post: "${post.title}" - ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   ✅ ${updatedCount} posts updated to dofollow`);
  console.log(`   ⚪ ${noChangesCount} posts needed no changes`);
  console.log(`   ❌ ${errorCount} errors`);
  console.log(`   📝 ${posts.length} total posts processed`);
  console.log('='.repeat(60));

  if (updatedCount > 0) {
    console.log('\n🎉 All external links are now dofollow (with noopener noreferrer for security)!');
  }
}

makeAllLinksDofollow().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
