# Internal Linking Guide

This guide explains how to add and manage internal links across the site (calculators, blogs, and roadmaps).

## How It Works

The site uses a centralized relationship mapping system to manage internal links between different content types.

**Key Files:**
- `/lib/content-relationships.ts` - Defines all relationships between content
- `/components/RelatedCalculators.tsx` - Reusable component for displaying related calculators

## Adding Related Links to New Calculator Pages

### 1. Add Calculator Relationships

Edit `/lib/content-relationships.ts` and add a new entry to the `calculatorRelationships` object:

```typescript
'your-calculator-slug': {
  relatedCalculators: [
    {
      title: 'Related Calculator Name',
      description: 'Brief description of what it calculates',
      href: '/calculators/calculator-slug'
    },
    // Add 3-4 related calculators
  ],
  relatedBlogs: [
    {
      title: 'Related Blog Post',
      description: 'How this blog relates to the calculator',
      href: '/blog/blog-slug'
    },
    // Add 2-3 related blog posts if relevant
  ]
}
```

### 2. Add Component to Calculator Page

In your calculator page component:

```typescript
// Add these imports at the top
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { getRelatedCalculators } from '@/lib/content-relationships';

// Add this component before the CTA or Footer section
<RelatedCalculators calculators={getRelatedCalculators('your-calculator-slug')} />
```

## Adding Calculator Links to Blog Posts

### 1. Add Blog Relationships

Edit `/lib/content-relationships.ts` and add to the `blogCalculators` object:

```typescript
'your-blog-slug': [
  {
    title: 'Relevant Calculator',
    description: 'Why this calculator is useful for readers',
    href: '/calculators/calculator-slug'
  },
  // Add 3-4 relevant calculators
]
```

### 2. Component Already Added

The blog post template (`/app/blog/[slug]/page.tsx`) already includes the Related Calculators component. It will automatically display for any blog with entries in `blogCalculators`.

## Adding Calculator Links to Roadmap Pages

### 1. Add Roadmap Relationships

Edit `/lib/content-relationships.ts` and add to the `roadmapCalculators` object:

```typescript
'your-roadmap-slug': [
  {
    title: 'Helpful Calculator',
    description: 'How this tool helps with this career path',
    href: '/calculators/calculator-slug'
  },
  // Add 2-3 relevant calculators
]
```

### 2. Add Component to Roadmap Page

In your roadmap page component:

```typescript
// Add these imports
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { getRoadmapRelatedCalculators } from '@/lib/content-relationships';

// Add before the CTA section
<div className="bg-gray-50">
  <RelatedCalculators
    calculators={getRoadmapRelatedCalculators('your-roadmap-slug')}
    variant="compact"
  />
</div>
```

## Best Practices

1. **Link Quality Over Quantity**: Add 3-4 highly relevant links, not every possible calculator
2. **Descriptive Titles**: Use clear, keyword-rich titles for SEO
3. **Meaningful Descriptions**: Explain WHY users should click the link
4. **Bidirectional Links**: If Calculator A links to Calculator B, make sure B links back to A
5. **Update Regularly**: Review and update relationships as you add new content

## Component Variants

The `RelatedCalculators` component supports two variants:

- `default` - 3-column grid (used on calculator pages)
- `compact` - 4-column grid (used on blog posts and roadmaps for more condensed display)

```typescript
<RelatedCalculators calculators={data} variant="compact" />
```

## Checking Your Links

After adding links:
1. Build the site: `npm run build`
2. Check for any TypeScript errors
3. Verify links appear correctly on the page
4. Test that all links navigate to the correct pages

## SEO Benefits

Internal linking:
- Helps Google discover and index all your pages
- Distributes page authority across your site
- Improves user experience by surfacing relevant content
- Increases time on site and reduces bounce rate

## Examples

See these pages for reference:
- `/app/calculators/gpa-calculator/page.tsx` - Calculator with related links
- `/app/blog/[slug]/page.tsx` - Blog template with calculator links
- `/app/roadmap/frontend-developer/page.tsx` - Roadmap with calculator links
