import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const baseUrl = 'https://www.thetutorbridge.com'
  const urls: string[] = []

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/career-guidance',
    '/doubt-solving',
    '/doubt-solving/ask-doubt',
    '/motivational-sessions',
    '/book-demo-class',
    '/study-resources',
    '/blog'
  ]

  // Add static pages
  staticPages.forEach(page => {
    urls.push(`${baseUrl}${page}`)
  })

  // Get blog posts from Supabase
  try {
    const supabase = createClient()
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published')

    if (!error && blogPosts) {
      blogPosts.forEach(post => {
        urls.push(`${baseUrl}/blog/${post.slug}`)
      })
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Dynamically scan study resource pages
  const studyResourcePages = await scanStudyResourcePages()
  studyResourcePages.forEach(page => {
    urls.push(`${baseUrl}${page}`)
  })

  // Generate XML sitemap
  const sitemap = generateSitemapXML(urls)

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}

async function scanStudyResourcePages(): Promise<string[]> {
  const pages: string[] = []
  const studyResourcesDir = path.join(process.cwd(), 'app', 'study-resources')

  try {
    const scanDirectory = async (dir: string, basePath: string = '') => {
      const items = await fs.promises.readdir(dir, { withFileTypes: true })

      for (const item of items) {
        const itemPath = path.join(dir, item.name)
        const routePath = `${basePath}/${item.name}`

        if (item.isDirectory()) {
          // Recursively scan subdirectories
          await scanDirectory(itemPath, routePath)
        } else if (item.name === 'page.tsx') {
          // Found a page.tsx file, add to sitemap
          const fullPath = `/study-resources${basePath}`
          pages.push(fullPath)
        }
      }
    }

    await scanDirectory(studyResourcesDir)
  } catch (error) {
    console.error('Error scanning study resource pages:', error)
  }

  return pages
}

function generateSitemapXML(urls: string[]): string {
  const currentDate = new Date().toISOString()

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`
}
