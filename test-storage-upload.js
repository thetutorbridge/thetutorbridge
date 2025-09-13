const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const prodSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testStorageUpload() {
  try {
    console.log('🧪 Testing storage upload functionality...\n');

    // Create a simple test file
    const testContent = 'This is a test file for blog image upload';
    const testFileName = `test-images/test_${Date.now()}.txt`;
    
    console.log('📤 Attempting to upload test file...');
    
    const { data, error } = await prodSupabase.storage
      .from('blog-images')
      .upload(testFileName, testContent, {
        contentType: 'text/plain',
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ Upload failed:', error.message);
      console.error('Error details:', error);
      return;
    }

    console.log('✅ Upload successful!');
    console.log('File path:', data.path);

    // Test getting public URL
    console.log('\n🔗 Testing public URL generation...');
    const { data: urlData } = prodSupabase.storage
      .from('blog-images')
      .getPublicUrl(testFileName);

    console.log('✅ Public URL generated:', urlData.publicUrl);

    // Clean up test file
    console.log('\n🧹 Cleaning up test file...');
    const { error: deleteError } = await prodSupabase.storage
      .from('blog-images')
      .remove([testFileName]);

    if (deleteError) {
      console.log('⚠️  Could not delete test file:', deleteError.message);
    } else {
      console.log('✅ Test file cleaned up');
    }

    console.log('\n🎉 Storage upload test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testStorageUpload();
