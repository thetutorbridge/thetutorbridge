const fs = require('fs');
const path = require('path');

// List of chapter pages to fix
const chapterPages = [
  'app/study-resources/class-6/science/chapter-3-mindful-eating-a-path-to-a-healthy-body/page.tsx',
  'app/study-resources/class-6/science/chapter-4-exploring-magnets/page.tsx',
  'app/study-resources/class-6/science/chapter-5-measurement-of-length-and-motion/page.tsx',
  'app/study-resources/class-6/science/chapter-6-materials-around-us/page.tsx',
  'app/study-resources/class-6/science/chapter-7-temperature-and-its-measurement/page.tsx',
];

// Function to fix breadcrumb navigation in a file
function fixBreadcrumbInFile(filePath) {
  try {
    console.log(`🔧 Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Pattern to match the old breadcrumb navigation
    const oldBreadcrumbPattern = /{\/\* Breadcrumb Navigation \*\/}\s*<div className="bg-gray-50 py-4 px-6">\s*<div className="container mx-auto">\s*<nav className="flex items-center space-x-2 text-sm">[\s\S]*?<\/nav>\s*<\/div>\s*<\/div>/;
    
    // New responsive breadcrumb navigation
    const newBreadcrumb = `{/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="container mx-auto">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link href="/study-resources" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Study Resources</span>
              <span className="sm:hidden">Resources</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources/class-6" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Class 6</span>
              <span className="sm:hidden">C6</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/study-resources/class-6/science" className="text-[#1A3D7C] hover:text-[#2BAE66] flex items-center whitespace-nowrap">
              <Beaker className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Science</span>
              <span className="sm:hidden">Sci</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate max-w-[200px] sm:max-w-none">
              <span className="hidden sm:inline">Chapter [NUMBER] - [TITLE]</span>
              <span className="sm:hidden">Ch [NUMBER]</span>
            </span>
          </nav>
        </div>
      </div>`;
    
    // Check if the file contains the old breadcrumb pattern
    if (oldBreadcrumbPattern.test(content)) {
      // Replace with new breadcrumb (keeping the original chapter title)
      const match = content.match(oldBreadcrumbPattern);
      if (match) {
        // Extract chapter number and title from the original content
        const chapterMatch = match[0].match(/Chapter (\d+) - ([^<]+)/);
        if (chapterMatch) {
          const chapterNumber = chapterMatch[1];
          const chapterTitle = chapterMatch[2];
          
          const customizedBreadcrumb = newBreadcrumb
            .replace(/\[NUMBER\]/g, chapterNumber)
            .replace(/\[TITLE\]/g, chapterTitle);
          
          content = content.replace(oldBreadcrumbPattern, customizedBreadcrumb);
          
          // Write the updated content back to the file
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`✅ Fixed ${filePath}`);
        } else {
          console.log(`⚠️  Could not extract chapter info from ${filePath}`);
        }
      }
    } else {
      console.log(`ℹ️  No breadcrumb navigation found in ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Fix all chapter pages
console.log('🚀 Starting mobile scroll fix for chapter pages...\n');

chapterPages.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    fixBreadcrumbInFile(fullPath);
  } else {
    console.log(`⚠️  File not found: ${fullPath}`);
  }
});

console.log('\n🎉 Mobile scroll fix completed!');
