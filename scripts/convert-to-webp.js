const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const blogImagesDir = path.join(publicDir, 'blog-images');

// Get all images that need conversion
function getImagesToConvert(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  }).map(file => path.join(dir, file));
}

// Convert image to WebP
async function convertToWebP(imagePath) {
  try {
    const ext = path.extname(imagePath);
    const webpPath = imagePath.replace(ext, '.webp');

    // Skip if WebP version already exists
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipping ${path.basename(imagePath)} (WebP exists)`);
      return { skipped: true };
    }

    await sharp(imagePath)
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);

    const originalSize = fs.statSync(imagePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`✅ Converted ${path.basename(imagePath)}`);
    console.log(`   Size: ${(originalSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (${savings}% smaller)`);

    return {
      success: true,
      original: imagePath,
      webp: webpPath,
      originalSize,
      webpSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`❌ Error converting ${path.basename(imagePath)}:`, error.message);
    return { error: true };
  }
}

// Main conversion function
async function convertAllImages() {
  console.log('🚀 Starting image conversion to WebP...\n');

  const directories = [
    { name: 'Blog Images', path: blogImagesDir },
    { name: 'Root Public', path: publicDir }
  ];

  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  let convertedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const dir of directories) {
    if (!fs.existsSync(dir.path)) {
      console.log(`⚠️  Directory not found: ${dir.path}\n`);
      continue;
    }

    console.log(`📁 Converting images in ${dir.name}...\n`);

    const images = getImagesToConvert(dir.path);
    console.log(`Found ${images.length} images to process\n`);

    for (const image of images) {
      const result = await convertToWebP(image);

      if (result.success) {
        totalOriginalSize += result.originalSize;
        totalWebPSize += result.webpSize;
        convertedCount++;
      } else if (result.skipped) {
        skippedCount++;
      } else if (result.error) {
        errorCount++;
      }

      // Add small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('');
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Conversion Summary');
  console.log('='.repeat(60));
  console.log(`✅ Converted: ${convertedCount} images`);
  console.log(`⏭️  Skipped: ${skippedCount} images (already exist)`);
  console.log(`❌ Errors: ${errorCount} images`);

  if (convertedCount > 0) {
    const totalSavings = ((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(1);
    console.log(`\n💾 Total size reduction:`);
    console.log(`   Original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   WebP: ${(totalWebPSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Savings: ${((totalOriginalSize - totalWebPSize) / 1024 / 1024).toFixed(2)} MB (${totalSavings}% smaller)`);
  }

  console.log('\n✨ Conversion complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update image references in code to use .webp files');
  console.log('   2. Add fallback support for older browsers');
  console.log('   3. Consider removing original files after verification');
}

// Run the conversion
convertAllImages().catch(console.error);
