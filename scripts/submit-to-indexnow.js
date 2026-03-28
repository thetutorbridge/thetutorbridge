/**
 * IndexNow Bulk URL Submission Script
 *
 * This script submits ALL your URLs to IndexNow for instant indexing on:
 * - Bing
 * - Yandex
 * - Seznam.cz
 * - Naver
 *
 * Much FASTER than waiting for Google to crawl naturally!
 */

const https = require('https');
const fs = require('fs');

// Configuration
const SITE_URL = 'https://www.thetutorbridge.com';
const INDEXNOW_KEY = 'YOUR_KEY_HERE'; // Get from https://www.indexnow.org/
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// You can also manually list your most important pages here
const PRIORITY_URLS = [
  `${SITE_URL}`,
  `${SITE_URL}/word-problems`,
  `${SITE_URL}/formulas`,
  `${SITE_URL}/geometry`,
  `${SITE_URL}/convert`,
  `${SITE_URL}/percentage`,
  `${SITE_URL}/solve`,
  `${SITE_URL}/fraction-to-decimal`,
  `${SITE_URL}/calculators`,
  `${SITE_URL}/blog`,
];

/**
 * Submit URLs to IndexNow API
 * Max 10,000 URLs per request
 */
async function submitToIndexNow(urls) {
  const payload = {
    host: 'www.thetutorbridge.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ Successfully submitted ${urls.length} URLs to IndexNow`);
          resolve({ success: true, count: urls.length });
        } else {
          console.error(`❌ Error: Status ${res.statusCode}`);
          console.error(responseData);
          reject(new Error(`Status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

/**
 * Submit URLs in batches of 10,000
 */
async function submitInBatches(urls) {
  const BATCH_SIZE = 10000;
  const batches = [];

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  console.log(`📊 Total URLs: ${urls.length}`);
  console.log(`📦 Batches: ${batches.length}`);

  for (let i = 0; i < batches.length; i++) {
    console.log(`\n🚀 Submitting batch ${i + 1}/${batches.length}...`);
    try {
      await submitToIndexNow(batches[i]);
      // Wait 5 seconds between batches to avoid rate limiting
      if (i < batches.length - 1) {
        console.log('⏳ Waiting 5 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error(`❌ Batch ${i + 1} failed:`, error.message);
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 IndexNow Bulk Submission Tool\n');
  console.log('📍 Site:', SITE_URL);
  console.log('🔑 API Key:', INDEXNOW_KEY === 'YOUR_KEY_HERE' ? '❌ NOT SET' : '✅ Set');
  console.log('');

  if (INDEXNOW_KEY === 'YOUR_KEY_HERE') {
    console.error('❌ ERROR: Please set your IndexNow API key!');
    console.error('');
    console.error('Steps:');
    console.error('1. Go to https://www.indexnow.org/');
    console.error('2. Generate your API key');
    console.error('3. Create a file: public/[YOUR_KEY].txt containing the key');
    console.error('4. Update INDEXNOW_KEY in this script');
    console.error('');
    process.exit(1);
  }

  console.log('📤 Submitting priority URLs first...\n');

  try {
    await submitToIndexNow(PRIORITY_URLS);
    console.log('\n✅ Priority URLs submitted!');
    console.log('');
    console.log('💡 TIP: To submit ALL 9,300 URLs, extract them from your sitemap');
    console.log('   and add them to the urlList in this script.');
    console.log('');
    console.log('🎯 Expected indexing:');
    console.log('   - Bing: 1-7 days');
    console.log('   - Yandex: 1-14 days');
    console.log('   - Other search engines: varies');
  } catch (error) {
    console.error('❌ Submission failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
