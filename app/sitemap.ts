import { MetadataRoute } from 'next';
import { createAdminClient } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

// Revalidate sitemap every 60 seconds to pick up new blog posts automatically
export const revalidate = 60;

// Helper function to get all calculator slugs dynamically from the filesystem
function getCalculatorSlugs(): string[] {
  try {
    const calculatorsDir = path.join(process.cwd(), 'app', 'calculators');
    const entries = fs.readdirSync(calculatorsDir, { withFileTypes: true });

    return entries
      .filter(entry => {
        // Only include directories that have a page.tsx file (valid calculator pages)
        if (!entry.isDirectory()) return false;
        const pagePath = path.join(calculatorsDir, entry.name, 'page.tsx');
        return fs.existsSync(pagePath);
      })
      .map(entry => entry.name)
      .sort();
  } catch (error) {
    console.error('Error reading calculator directories:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.thetutorbridge.com';

  // Static pages - Main
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/book-demo-class`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-study-guide-maker`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/motivational-sessions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/career-guidance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/doubt-solving`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/doubt-solving/ask-doubt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Calculators - Main page
  const calculatorPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // All individual calculator pages - dynamically read from filesystem
  // This ensures new calculators are automatically included in the sitemap
  const calculatorSlugs = getCalculatorSlugs();
  const individualCalculators = calculatorSlugs.map(calc => ({
    url: `${baseUrl}/calculators/${calc}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Study Resources - Main page
  const studyResourcePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/study-resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/study-resources/work-in-progress`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Study Resources - All class pages
  const classPages = ['class-6', 'class-7', 'class-8', 'class-9', 'class-10', 'class-11', 'class-12'];
  const classMainPages: MetadataRoute.Sitemap = classPages.map(className => ({
    url: `${baseUrl}/study-resources/${className}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Study Resources - Class 6 subject pages
  const class6SubjectPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/study-resources/class-6/maths`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/study-resources/class-6/science`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/study-resources/class-6/english`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Study Resources - Class 6 Science Chapters (Individual)
  const class6ScienceChapters: MetadataRoute.Sitemap = [
    'chapter-1-the-wonderful-world-of-science',
    'chapter-2-diversity-in-the-living-world',
    'chapter-3-mindful-eating-a-path-to-a-healthy-body',
    'chapter-4-exploring-magnets',
    'chapter-5-measurement-of-length-and-motion',
    'chapter-6-materials-around-us',
    'chapter-7-temperature-and-its-measurement',
    'chapter-8-a-journey-through-states-of-water',
    'chapter-9-methods-of-separation-in-everyday-life',
    'chapter-10-living-creatures-exploring-their-characteristics',
  ].map(chapter => ({
    url: `${baseUrl}/study-resources/class-6/science/${chapter}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Study Resources - Class 7, 8, 9, 10 subject pages
  const otherClassSubjectPages: MetadataRoute.Sitemap = [];
  ['class-7', 'class-8', 'class-9', 'class-10'].forEach(className => {
    ['maths', 'science', 'english'].forEach(subject => {
      otherClassSubjectPages.push({
        url: `${baseUrl}/study-resources/${className}/${subject}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      });
    });
  });

  // Study Resources - Class 11 and 12 subject pages
  const seniorClassSubjectPages: MetadataRoute.Sitemap = [];
  ['class-11', 'class-12'].forEach(className => {
    ['maths', 'physics', 'chemistry', 'biology', 'english'].forEach(subject => {
      seniorClassSubjectPages.push({
        url: `${baseUrl}/study-resources/${className}/${subject}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      });
    });
  });

  // Fetch blog posts from Supabase
  let blogPostPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createAdminClient();
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts for sitemap:', error);
    } else {
      blogPostPages = (posts || []).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  // Combine all pages
  return [
    ...staticPages,
    ...blogPages,
    ...blogPostPages,
    ...calculatorPages,
    ...individualCalculators,
    ...studyResourcePages,
    ...classMainPages,
    ...class6SubjectPages,
    ...class6ScienceChapters,
    ...otherClassSubjectPages,
    ...seniorClassSubjectPages,
  ];
}
