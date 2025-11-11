require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function verifyDofollow() {
  // Fetch a sample post
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=*&limit=1`, {
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
    }
  });

  const posts = await response.json();
  const post = posts[0];

  console.log(`\n📝 Checking post: "${post.title}"\n`);

  let externalLinks = 0;
  let internalLinks = 0;
  let nofollowLinks = 0;
  let dofollowLinks = 0;

  function checkNode(node) {
    if (!node) return;

    if (node.marks && Array.isArray(node.marks)) {
      node.marks.forEach(mark => {
        if (mark.type === 'link' && mark.attrs && mark.attrs.href) {
          const url = mark.attrs.href;
          const isExternal = !url.startsWith('/') && 
                            !url.startsWith('#') && 
                            !url.includes('thetutorbridge.com') && 
                            !url.includes('localhost');

          if (isExternal) {
            externalLinks++;
            if (mark.attrs.rel && mark.attrs.rel.includes('nofollow')) {
              nofollowLinks++;
              console.log(`❌ NOFOLLOW found: ${url}`);
              console.log(`   rel="${mark.attrs.rel}"\n`);
            } else {
              dofollowLinks++;
              console.log(`✅ DOFOLLOW: ${url}`);
              console.log(`   rel="${mark.attrs.rel || 'none'}"\n`);
            }
          } else {
            internalLinks++;
          }
        }
      });
    }

    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(childNode => checkNode(childNode));
    }
  }

  checkNode(post.content);

  console.log('='.repeat(60));
  console.log('📊 Link Analysis:');
  console.log(`   🔗 Total external links: ${externalLinks}`);
  console.log(`   ✅ Dofollow external links: ${dofollowLinks}`);
  console.log(`   ❌ Nofollow external links: ${nofollowLinks}`);
  console.log(`   🏠 Internal links: ${internalLinks}`);
  console.log('='.repeat(60));

  if (nofollowLinks === 0 && externalLinks > 0) {
    console.log('\n🎉 SUCCESS! All external links are dofollow!');
  } else if (externalLinks === 0) {
    console.log('\n⚪ No external links found in this post.');
  } else {
    console.log(`\n⚠️  WARNING: ${nofollowLinks} nofollow links still exist!`);
  }
}

verifyDofollow().catch(console.error);
