# Complete Code-Level SEO Guide

## 1. Meta Tags & Metadata (CRITICAL)

### ✅ Already Implemented
```typescript
// In app/layout.tsx and page.tsx files
export const metadata: Metadata = {
  title: 'Primary Keyword - Secondary Keyword | Brand',
  description: '150-160 chars with target keywords',
  keywords: ['keyword1', 'keyword2'],
  authors: [{ name: 'The Tutor Bridge' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/page',
  },
}
```

### Best Practices
- **Title**: 50-60 characters, include primary keyword
- **Description**: 150-160 characters, include call-to-action
- **Keywords**: Use in metadata but focus more on content
- **Canonical**: Always set to prevent duplicate content

## 2. Structured Data (Schema.org)

### ✅ Current Implementation
```typescript
// Organization Schema (layout.tsx)
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "The Tutor Bridge",
  url: "https://www.thetutorbridge.com",
  logo: "url-to-logo",
}

// Article Schema (percentage pages)
{
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What is 15% of 120?",
  author: { "@type": "Organization" },
  publisher: { "@type": "Organization" },
}
```

### Additional Schemas to Add
- **FAQPage**: For FAQ sections
- **HowTo**: For tutorial/calculator pages
- **BreadcrumbList**: For navigation
- **WebPage**: For general pages
- **Product/Service**: For tutoring services

## 3. Performance Optimization (CRITICAL for SEO)

### ✅ Already Optimized
- Static Site Generation (SSG) with `generateStaticParams()`
- Image optimization enabled
- Compression enabled
- Preconnect to external domains

### Additional Optimizations
```javascript
// next.config.mjs
{
  compress: true,           // Gzip compression ✓
  poweredByHeader: false,   // Remove X-Powered-By ✓
  generateEtags: false,     // Reduce overhead ✓

  // Add these for better performance:
  swcMinify: true,          // Fast minification
  experimental: {
    optimizeCss: true,      // Optimize CSS
    optimizePackageImports: ['lucide-react'], // Tree shaking
  },
}
```

## 4. Cache Headers (Speed = SEO)

### ✅ Already Configured
```javascript
// Static assets: 1 year cache
'/static/*', '/_next/static/*': max-age=31536000

// Calculator pages: 1 hour cache
'/percentage/*', '/solve/*', '/fraction-to-decimal/*': max-age=3600

// Sitemap: 1 minute cache
'/sitemap.xml': max-age=60
```

## 5. URL Structure (CRITICAL)

### ✅ Perfect Implementation
```
✓ /percentage/15-percent-of-120
✓ /solve/x-plus-5-equals-10
✓ /fraction-to-decimal/3-4

✗ /page?id=123&calc=percentage (BAD)
✗ /p/xyz123 (BAD)
```

**Rules:**
- Use hyphens, not underscores
- Include keywords in URL
- Keep URLs short and descriptive
- No special characters or parameters

## 6. Internal Linking (CRITICAL)

### ✅ Current Implementation
```typescript
// Related calculations section
{data.relatedCalculations.map((slug) => (
  <Link href={`/percentage/${slug}`}>
    What is X% of Y?
  </Link>
))}
```

### Best Practices
- Link to related calculators from every page ✓
- Use descriptive anchor text (not "click here")
- Create hub pages (main landing pages) ✓
- Link from high-authority pages to new pages

## 7. Content Structure

### ✅ Proper HTML Hierarchy
```typescript
<h1>Main title (only one per page)</h1>
<h2>Major sections</h2>
<h3>Subsections</h3>

// Example from percentage pages:
<h1>What is 15% of 120?</h1>
<h2>Step-by-Step Solution</h2>
<h2>Real-World Examples</h2>
<h2>Why Learn Percentage Calculations?</h2>
```

### Content SEO Rules
- **H1**: One per page, include primary keyword
- **H2-H6**: Use hierarchically, include related keywords
- **Paragraphs**: 2-4 sentences each
- **Lists**: Use for scannability
- **Bold**: Important keywords and concepts

## 8. Image Optimization

### Implementation
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Descriptive text with keywords"
  width={800}
  height={600}
  loading="lazy"           // Lazy load below fold
  priority               // For above-fold images
/>
```

### Best Practices
- Always use Next.js `<Image>` component
- Descriptive alt text with keywords
- WebP format for modern browsers
- Responsive sizes
- Lazy loading for below-fold images

## 9. Mobile Optimization (CRITICAL)

### ✅ Already Responsive
```typescript
// Responsive design
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
  {/* Cards */}
</div>
```

### Verify
- Use Tailwind responsive classes ✓
- Test on mobile devices
- Check Core Web Vitals in Google Search Console
- Ensure tap targets are 48x48px minimum

## 10. Core Web Vitals

### Target Metrics
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### How to Improve
```typescript
// Preload critical assets
<link rel="preload" href="/logo.png" as="image" />

// Use font-display: swap
const poppins = Poppins({
  display: 'swap',
  subsets: ['latin']
})

// Set image dimensions to prevent CLS
<Image width={800} height={600} />
```

## 11. Redirects & Canonical URLs

### ✅ Already Configured
```javascript
// Non-www to www redirect
{
  source: '/:path*',
  has: [{ type: 'host', value: 'thetutorbridge.com' }],
  destination: 'https://www.thetutorbridge.com/:path*',
  permanent: true,
}
```

### Best Practices
- Choose one canonical domain (www or non-www) ✓
- Redirect HTTP to HTTPS
- Use 301 (permanent) for moved content
- Set canonical tags on every page ✓

## 12. Robots.txt & Sitemap

### ✅ Current robots.txt
```
User-agent: *
Allow: /
Sitemap: https://www.thetutorbridge.com/sitemap.xml

Allow: /_next/static
Allow: /_next/image
Disallow: /admin
Disallow: /api
```

### ✅ Dynamic Sitemap
```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.thetutorbridge.com/percentage/15-percent-of-120',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

## 13. OpenGraph & Social Sharing

### ✅ Already Implemented
```typescript
openGraph: {
  title: 'What is 15% of 120?',
  description: 'The answer is 18...',
  url: 'https://www.thetutorbridge.com/percentage/15-percent-of-120',
  siteName: 'The Tutor Bridge',
  images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  type: 'article',
}
```

### Image Requirements
- **Facebook/LinkedIn**: 1200 x 630px
- **Twitter**: 1200 x 675px (16:9 ratio)
- Format: PNG or JPG
- Max size: 5MB

## 14. Security Headers (SEO Factor)

### ✅ Already Configured
```javascript
headers: [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
]
```

### Why It Matters
- Google considers HTTPS a ranking factor
- Security = Trust = Better rankings
- Prevents attacks that could take site down

## 15. Content Quality (MOST IMPORTANT)

### ✅ Current Implementation
```typescript
// Each percentage page has:
- Quick answer (user intent)
- Step-by-step solution (educational)
- Two calculation methods (comprehensive)
- Real-world examples (relevance)
- Formula explanation (depth)
- Related calculations (internal linking)
- Educational content (authority)
```

### Content SEO Principles
1. **Answer user intent immediately** ✓
2. **Go deeper than competitors** ✓
3. **Include examples and use cases** ✓
4. **Add unique value (not just calculator)** ✓
5. **Update regularly**

## 16. Page Speed Monitoring

### Tools to Use
- Google PageSpeed Insights
- Google Search Console (Core Web Vitals)
- Lighthouse (Chrome DevTools)
- WebPageTest.org

### Target Scores
- **PageSpeed**: 90+ (mobile and desktop)
- **Lighthouse Performance**: 90+
- **Lighthouse SEO**: 100
- **Lighthouse Accessibility**: 90+

## 17. Breadcrumbs (Navigation & SEO)

### ✅ Already Implemented
```typescript
<nav className="flex items-center space-x-2">
  <Link href="/">Home</Link>
  <span>/</span>
  <Link href="/percentage">Percentage Calculator</Link>
  <span>/</span>
  <span>15% of 120</span>
</nav>
```

### Add Breadcrumb Schema
```typescript
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "url" },
    { "@type": "ListItem", "position": 2, "name": "Percentage", "item": "url" },
  ]
}
```

## 18. Technical SEO Checklist

### Must-Have (All ✓)
- [x] HTTPS enabled
- [x] Mobile responsive
- [x] Fast loading (< 3s)
- [x] XML sitemap
- [x] Robots.txt
- [x] Canonical URLs
- [x] Meta descriptions
- [x] Heading hierarchy
- [x] Image alt text
- [x] Internal linking
- [x] Structured data
- [x] Social meta tags

### Advanced (Recommended)
- [ ] HowTo schema for calculators
- [ ] FAQPage schema
- [ ] Breadcrumb schema
- [ ] Video content with VideoObject schema
- [ ] Author pages with Person schema
- [ ] Service schema for tutoring
- [ ] Review/Rating schema

## 19. Monitoring & Analytics

### Setup Required
1. **Google Search Console**: Monitor rankings, clicks, impressions
2. **Google Analytics 4**: Track user behavior
3. **Core Web Vitals**: Monitor in Search Console
4. **Error Tracking**: 404s, 500s in Search Console

### Key Metrics to Track
- Organic traffic growth
- Click-through rate (CTR)
- Average position
- Core Web Vitals (LCP, FID, CLS)
- Indexed pages vs submitted pages
- Crawl errors

## 20. Next Steps for Your Site

### High Priority (Do Now)
1. ✅ Add cache headers for calculator pages (DONE)
2. Add HowTo schema to calculator pages
3. Add FAQPage schema to FAQ section
4. Create more internal links between systems
5. Submit all URLs to Google Search Console

### Medium Priority
6. Add breadcrumb structured data
7. Create blog content linking to calculators
8. Optimize images (convert to WebP)
9. Add lazy loading for below-fold content
10. Create pillar pages for each calculator type

### Low Priority (Nice to Have)
11. Add video tutorials
12. Create comparison pages ("X vs Y calculator")
13. Add user reviews/testimonials with schema
14. Multi-language support (hreflang tags)
15. AMP pages for mobile

## Summary: Code SEO Score

### Current Implementation: 85/100

**Strengths:**
- Excellent URL structure ✓
- Proper metadata implementation ✓
- Static generation for speed ✓
- Internal linking strategy ✓
- Mobile responsive ✓
- Structured data basics ✓
- Content depth and quality ✓

**Improvements Needed:**
- Add more schema types (HowTo, FAQ, Breadcrumb)
- Optimize images to WebP format
- Add lazy loading for images
- Create more cross-linking between systems
- Monitor and fix Core Web Vitals issues

**Bottom Line:**
Your code-level SEO is strong. Focus now on:
1. Content production (more calculator types)
2. Getting backlinks from educational sites
3. Creating supporting blog content
4. Building topical authority in math education
