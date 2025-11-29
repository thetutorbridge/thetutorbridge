# Blog Creation Workflow - MCP Direct Upload Method

**Last Updated:** November 12, 2025
**Success Rate:** 100% when followed exactly
**Time per Blog:** ~10-15 minutes
**Platform:** TheTutorBridge.com

---

## Overview

This is the **proven, battle-tested workflow** for creating comprehensive blog posts using MCP (Model Context Protocol) direct database access. This method bypasses frontend issues and uploads content directly to the database.

---

## Prerequisites

✅ MCP Supabase connection configured
✅ Access to `mcp__supabase-thetutorbridge__execute_sql` tool
✅ Node.js installed for content generation
✅ Understanding of TipTap JSON format

---

## The 6-Step Process

### Step 1: Generate Blog Content via Node.js Script

Create a generation script at `/tmp/generate-[slug].js`

**CRITICAL: Use these exact helper functions:**

```javascript
#!/usr/bin/env node

// ============================================
// PROVEN HELPER FUNCTIONS - DO NOT MODIFY
// ============================================

const heading = (level, content) => ({
  type: "heading",
  attrs: { level },
  content: [{ type: "text", text: content }]
});

const para = (...content) => ({
  type: "paragraph",
  content: content.flat()
});

const text = (content, marks = []) => ({
  type: "text",
  text: content,
  ...(marks.length > 0 && { marks })
});

const bold = (content) => text(content, [{ type: "bold" }]);

const link = (content, href) => text(content, [{
  type: "link",
  attrs: {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    class: null
  }
}]);

// For simple bullet lists with plain text
const bulletList = (...items) => ({
  type: "bulletList",
  content: items.map(item => ({
    type: "listItem",
    content: [{
      type: "paragraph",
      content: Array.isArray(item) ? item : [{ type: "text", text: item }]
    }]
  }))
});

// For ordered lists
const orderedList = (start = 1, ...items) => ({
  type: "orderedList",
  attrs: { start, type: null },
  content: items.map(item => ({
    type: "listItem",
    content: [{
      type: "paragraph",
      content: Array.isArray(item) ? item : [{ type: "text", text: item }]
    }]
  }))
});

// ============================================
// BLOG CONTENT STRUCTURE
// ============================================
const content = {
  type: "doc",
  content: [
    // Introduction
    heading(2, "Introduction: [Topic Title]"),
    para(text("Opening paragraph introducing the topic...")),

    // Main Content Sections (aim for 8-15 major sections)
    heading(2, "Section Title"),
    heading(3, "Subsection Title"),
    para(text("Content with "), bold("bold text"), text(" and regular text.")),

    // Include internal links (8-12 total)
    para(
      text("Reference to our "),
      link("study resources", "https://www.thetutorbridge.com/study-resources"),
      text(" for more information.")
    ),

    // Lists
    bulletList(
      "Simple bullet point",
      [bold("Bold start: "), text("explanation continues")],
      "Another simple point"
    ),

    // FAQs (minimum 10)
    heading(2, "Frequently Asked Questions"),
    heading(3, "1. Question here?"),
    para(text("Answer here...")),

    // Conclusion
    heading(2, "Conclusion: [Summary Title]"),
    para(text("Final thoughts and call to action..."))
  ]
};

// Output JSON
console.log(JSON.stringify(content, null, 2));
```

**Internal Links to Include (8-12 contextually relevant):**
- https://www.thetutorbridge.com/study-resources
- https://www.thetutorbridge.com/study-resources/class-12
- https://www.thetutorbridge.com/career-guidance
- https://www.thetutorbridge.com/calculators/gpa-calculator
- https://www.thetutorbridge.com/calculators/grade-calculator
- https://www.thetutorbridge.com/doubt-solving
- https://www.thetutorbridge.com/motivational-sessions
- https://www.thetutorbridge.com/blog/[relevant-blog-slug]

**Content Requirements:**
- ✅ Only H2 and H3 headings (NO H1)
- ✅ 40,000-100,000 characters minimum
- ✅ 8-15 major sections
- ✅ 10+ FAQ questions
- ✅ 8-12 internal links with full URLs
- ✅ Compelling introduction and conclusion

---

### Step 2: Execute Script and Generate JSON

```bash
node /tmp/generate-[slug].js > /tmp/[slug]-content.json 2>&1
```

**Verify the output:**

```bash
# Check file size (should be 50KB-210KB)
wc -c /tmp/[slug]-content.json

# Verify no nested text objects
node -e "
const fs = require('fs');
const content = fs.readFileSync('/tmp/[slug]-content.json', 'utf8');
const hasNestedText = content.includes('\"text\":{\"type\":\"text\"');
if (hasNestedText) {
  console.log('❌ ERROR: Found nested text objects!');
  process.exit(1);
} else {
  console.log('✅ No nested text objects detected');
}
"

# Validate JSON structure
node -e "
const fs = require('fs');
try {
  const json = JSON.parse(fs.readFileSync('/tmp/[slug]-content.json', 'utf8'));
  console.log('✅ Valid JSON');
  console.log('Type:', json.type);
  console.log('Content sections:', json.content.length);
  console.log('File size:', fs.statSync('/tmp/[slug]-content.json').size, 'bytes');
} catch (e) {
  console.log('❌ Invalid JSON:', e.message);
  process.exit(1);
}
"
```

---

### Step 3: Create Blog Post Skeleton in Database

First, insert the blog post with empty content to get an ID:

```javascript
// Via MCP execute_sql
mcp__supabase-thetutorbridge__execute_sql({
  query: `
    INSERT INTO blog_posts (
      title,
      slug,
      excerpt,
      author_name,
      author_avatar,
      author_linkedin,
      author_image,
      content,
      status,
      created_at,
      updated_at,
      published_at,
      meta_title,
      meta_description,
      meta_keywords,
      tags,
      read_time,
      featured_image
    ) VALUES (
      'Your Blog Title Here',
      'your-blog-slug-here',
      'Compelling excerpt that summarizes the blog post in 2-3 sentences.',
      'Dr. Rishabh Jain',
      'https://zkphbzcomixukygigpka.supabase.co/storage/v1/object/public/avatars/rishabh-jain-avatar.jpg',
      'https://www.linkedin.com/in/dr-rishabh-jain',
      'https://zkphbzcomixukygigpka.supabase.co/storage/v1/object/public/blog-images/images/[image-name].jpeg',
      '{}'::jsonb,
      'draft',
      NOW(),
      NOW(),
      NULL,
      'SEO-Optimized Meta Title [2025 Guide]',
      'Comprehensive meta description for search engines that includes key terms and value proposition.',
      ARRAY['keyword1', 'keyword2', 'keyword3', 'long-tail keyword', 'another keyword'],
      ARRAY['category1', 'category2', 'category3'],
      15,
      'https://zkphbzcomixukygigpka.supabase.co/storage/v1/object/public/blog-images/images/[image-name].jpeg'
    )
    RETURNING id, title, slug;
  `
})
```

**Note the returned ID** - you'll use it in the next step.

---

### Step 4: Prepare SQL UPDATE Statement

```bash
node << 'CREATE_SQL'
const fs = require('fs');

// Read the JSON content
const json = JSON.parse(fs.readFileSync('/tmp/[slug]-content.json', 'utf8'));
const jsonStr = JSON.stringify(json);

// Escape single quotes for SQL (double them)
const escaped = jsonStr.replace(/'/g, "''");

// Create UPDATE statement with the blog post ID from Step 3
const updateSql = `UPDATE blog_posts SET content = '${escaped}'::jsonb WHERE id = [BLOG_POST_ID] RETURNING id, title, LENGTH(content::text) as content_length;`;

// Write SQL file
fs.writeFileSync('/tmp/[slug]-update.sql', updateSql);

console.log('✅ SQL created successfully');
console.log('Content length:', jsonStr.length);
console.log('SQL file size:', updateSql.length);
console.log('SQL file written to: /tmp/[slug]-update.sql');
CREATE_SQL
```

---

### Step 5: Execute SQL via MCP

**CRITICAL: This is where you actually upload the content!**

Read the SQL file and execute it directly via MCP:

```bash
# Verify SQL is ready
wc -c /tmp/[slug]-update.sql
cat /tmp/[slug]-update.sql | head -c 200
echo "..."
cat /tmp/[slug]-update.sql | tail -c 200
```

Then execute via MCP tool:

```javascript
// Read the complete SQL and execute via MCP
// The query will be ~100KB but MCP can handle it!

mcp__supabase-thetutorbridge__execute_sql({
  query: `UPDATE blog_posts SET content = '[ESCAPED_JSON_CONTENT]'::jsonb WHERE id = [BLOG_POST_ID] RETURNING id, title, LENGTH(content::text) as content_length;`
})
```

**Expected Response:**
```json
[{
  "id": 75,
  "title": "Your Blog Title",
  "content_length": 95226
}]
```

✅ If you see a content_length > 50000, SUCCESS!

---

### Step 6: Verify Upload Success

```javascript
// Via MCP execute_sql
mcp__supabase-thetutorbridge__execute_sql({
  query: `
    SELECT
      id,
      slug,
      title,
      LENGTH(content::text) as content_length,
      status,
      created_at,
      tags,
      read_time
    FROM blog_posts
    WHERE id = [BLOG_POST_ID]
  `
})
```

**Expected Results:**
- ✅ `content_length` should be 50,000-100,000+ for comprehensive blogs
- ✅ `status` should be 'draft'
- ✅ All metadata fields populated

**View in Admin Panel:**
https://www.thetutorbridge.com/admin/blog/edit/[BLOG_POST_ID]

---

## Critical Rules - MUST FOLLOW

### JSON Structure Rules:
1. ✅ **NEVER pass `text()` objects to `bulletList()` - use plain strings or arrays**
2. ✅ **ALWAYS use `.flat()` in the para function**
3. ✅ **NO nested text objects** - validate before uploading
4. ✅ **Only H2 and H3 headings** (never H1 in content)

### SQL Escaping Rules:
1. ✅ **ALWAYS escape single quotes by doubling them**: `.replace(/'/g, "''")`
2. ✅ **ALWAYS cast to jsonb**: `'[escaped_json]'::jsonb`
3. ✅ **Use RETURNING clause to verify upload**

### Content Rules:
1. ✅ **8-12 internal links with full URLs** (https://www.thetutorbridge.com/...)
2. ✅ **40,000-100,000+ characters** for comprehensive posts
3. ✅ **Minimum 10 FAQ questions** in dedicated section
4. ✅ **Status: 'draft'** until ready to publish

---

## Common Mistakes & Fixes

### ❌ Mistake #1: Nested Text Objects

**Problem:**
```javascript
bulletList(
  text("Item 1"),  // ❌ WRONG - passing text() object
  text("Item 2")
)
```

**Fix:**
```javascript
bulletList(
  "Item 1",  // ✅ CORRECT - plain string
  "Item 2"
)

// OR for complex items:
bulletList(
  [bold("Point: "), text("explanation")],  // ✅ CORRECT - array
  "Simple point"
)
```

---

### ❌ Mistake #2: Not Verifying JSON Before Upload

**Problem:**
- Generate JSON and immediately create SQL without validation
- Upload fails because of structure issues

**Fix:**
```bash
# ALWAYS run these checks after generating JSON:
node -e "const fs = require('fs'); const content = fs.readFileSync('/tmp/[slug]-content.json', 'utf8'); console.log(content.includes('\"text\":{\"type\":\"text\"') ? '❌ Nested text!' : '✅ OK');"
```

---

### ❌ Mistake #3: Forgetting to Escape SQL

**Problem:**
```javascript
const updateSql = `UPDATE blog_posts SET content = '${jsonStr}'::jsonb ...`;
// ❌ Single quotes in content will break SQL
```

**Fix:**
```javascript
const escaped = jsonStr.replace(/'/g, "''");  // ✅ Double all single quotes
const updateSql = `UPDATE blog_posts SET content = '${escaped}'::jsonb ...`;
```

---

### ❌ Mistake #4: Using Placeholder IDs

**Problem:**
```sql
WHERE id = [BLOG_POST_ID]  -- ❌ Forgot to replace placeholder
```

**Fix:**
```sql
WHERE id = 75  -- ✅ Use actual ID from Step 3
```

---

## Debugging Commands

### Check for Nested Text Objects:
```bash
node -e "
const fs = require('fs');
const content = fs.readFileSync('/tmp/[slug]-content.json', 'utf8');
const hasNestedText = content.includes('\"text\":{\"type\":\"text\"');
if (hasNestedText) {
  console.log('❌ ERROR: Found nested text objects!');
  process.exit(1);
} else {
  console.log('✅ No nested text objects detected');
}
"
```

### Validate JSON Structure:
```bash
node -e "
const fs = require('fs');
try {
  const json = JSON.parse(fs.readFileSync('/tmp/[slug]-content.json', 'utf8'));
  console.log('✅ Valid JSON');
  console.log('Type:', json.type);
  console.log('Content sections:', json.content.length);
} catch (e) {
  console.log('❌ Invalid JSON:', e.message);
}
"
```

### Verify SQL Escaping:
```bash
node -e "
const fs = require('fs');
const sql = fs.readFileSync('/tmp/[slug]-update.sql', 'utf8');
console.log('SQL length:', sql.length);
console.log('First 200 chars:', sql.substring(0, 200));
console.log('...');
console.log('Last 200 chars:', sql.substring(sql.length - 200));
"
```

---

## File Naming Convention

Consistent naming helps track files:

- **Generation script:** `/tmp/generate-[slug].js`
- **JSON output:** `/tmp/[slug]-content.json`
- **SQL file:** `/tmp/[slug]-update.sql`

**Example for slug "how-to-write-cover-letter":**
- `/tmp/generate-how-to-write-cover-letter.js`
- `/tmp/how-to-write-cover-letter-content.json`
- `/tmp/how-to-write-cover-letter-update.sql`

---

## Success Checklist

Before marking as complete, verify:

- [ ] JSON file generated (50KB-210KB)
- [ ] No nested text objects (validated)
- [ ] Valid JSON structure (validated)
- [ ] Blog post skeleton created in database
- [ ] SQL file created with proper escaping
- [ ] MCP execute_sql completed successfully
- [ ] Verification query shows content_length > 50000
- [ ] Content displays correctly in admin panel
- [ ] All internal links working
- [ ] Status is 'draft'

---

## Time Estimates

- **Reading requirements:** 2 minutes
- **Creating generation script:** 8-12 minutes
- **Generating JSON:** 10 seconds
- **Validating JSON:** 30 seconds
- **Creating blog skeleton:** 1 minute
- **Creating SQL:** 10 seconds
- **Uploading via MCP:** 5-10 seconds
- **Verification:** 30 seconds

**Total:** ~12-16 minutes per comprehensive blog post

---

## Example: Complete Workflow

```bash
# Step 1: Create generation script
cat > /tmp/generate-screenwriter-education.js << 'SCRIPT'
#!/usr/bin/env node
const heading = (level, content) => ({
  type: "heading",
  attrs: { level },
  content: [{ type: "text", text: content }]
});
// ... (rest of helper functions)

const content = {
  type: "doc",
  content: [
    heading(2, "Introduction: The Path to Becoming a Screenwriter"),
    // ... (all content)
  ]
};
console.log(JSON.stringify(content, null, 2));
SCRIPT

# Step 2: Generate JSON
node /tmp/generate-screenwriter-education.js > /tmp/screenwriter-education-content.json 2>&1

# Step 2b: Validate
wc -c /tmp/screenwriter-education-content.json
node -e "const fs = require('fs'); const c = fs.readFileSync('/tmp/screenwriter-education-content.json', 'utf8'); console.log(c.includes('\"text\":{\"type\":\"text\"') ? '❌ Nested!' : '✅ OK');"

# Step 3: Create skeleton (via MCP)
# INSERT ... RETURNING id = 75

# Step 4: Create SQL
node << 'SQL'
const fs = require('fs');
const json = JSON.parse(fs.readFileSync('/tmp/screenwriter-education-content.json', 'utf8'));
const jsonStr = JSON.stringify(json);
const escaped = jsonStr.replace(/'/g, "''");
const updateSql = `UPDATE blog_posts SET content = '${escaped}'::jsonb WHERE id = 75 RETURNING id, title, LENGTH(content::text) as content_length;`;
fs.writeFileSync('/tmp/screenwriter-education-update.sql', updateSql);
console.log('✅ SQL ready');
SQL

# Step 5: Execute via MCP
# mcp__supabase-thetutorbridge__execute_sql with the UPDATE query

# Step 6: Verify
# SELECT id, LENGTH(content::text) FROM blog_posts WHERE id = 75
# Result: content_length = 95226 ✅
```

---

## Emergency Rollback

If upload fails or content is corrupted:

```sql
-- Check current content length
SELECT id, LENGTH(content::text) as current_length
FROM blog_posts
WHERE id = [BLOG_POST_ID];

-- If needed, delete and recreate
DELETE FROM blog_posts WHERE id = [BLOG_POST_ID];
```

---

## Key Takeaways

1. ✅ **MCP can handle large queries** (~100KB) - don't hesitate to use it!
2. ✅ **Always validate JSON before creating SQL** - saves time
3. ✅ **Follow the proven helper functions exactly** - they work!
4. ✅ **Use RETURNING clause** to immediately verify success
5. ✅ **The workflow takes ~12-16 minutes** when followed exactly

---

## Related Files

- **Complete Guidelines:** `/Users/rishabhjain/Downloads/12th_NOV_TTB/thetutorbridge/COMPLETE_BLOG_CREATION_GUIDE.md`
- **Previous Guide:** `/Users/rishabhjain/Downloads/12th_NOV_TTB/thetutorbridge/BLOG_MCP_GUIDE.md`

---

**Last Successful Upload:**
- Title: "What Education Do You Need to Be a Screenwriter? Complete 2025 Career Guide"
- Slug: `what-education-do-you-need-to-be-a-screenwriter`
- Size: 95,226 characters
- Date: November 12, 2025
- Time: ~10 minutes
- Issues: None - Perfect upload following this workflow ✅
