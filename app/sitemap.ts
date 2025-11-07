import { MetadataRoute } from 'next';
import { createAdminClient } from '@/lib/supabase';

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

  // All individual calculator pages
  const individualCalculators = [
    'age-calculator',
    'basic-calculator',
    'car-loan-emi-calculator',
    'celsius-to-fahrenheit-converter',
    'compound-interest-calculator',
    'decimal-to-fraction-calculator',
    'emi-calculator',
    'fahrenheit-to-celsius-converter',
    'fd-calculator',
    'fraction-to-decimal-calculator',
    'fractions-calculator',
    'gcf-calculator',
    'gratuity-calculator',
    'home-loan-emi-calculator',
    'hours-calculator',
    'income-tax-calculator',
    'lcm-calculator',
    'long-division-calculator',
    'lumpsum-calculator',
    'mean-mode-median-calculator',
    'mixed-numbers-calculator',
    'money-calculator',
    'numbers-to-words-converter',
    'percentage-calculator',
    'percentage-change-calculator',
    'percentage-difference-calculator',
    'percentage-increase-calculator',
    'personal-loan-emi-calculator',
    'ppf-calculator',
    'quadratic-formula-calculator',
    'random-number-generator',
    'ratio-calculator',
    'roman-numeral-converter',
    'rounding-numbers-calculator',
    'salary-calculator',
    'sbi-sip-calculator',
    'scientific-notation-converter',
    'simple-interest-calculator',
    'simplifying-fractions-calculator',
    'sip-calculator',
    'slope-calculator',
    'speed-distance-time-calculator',
    'square-footage-calculator',
    'step-up-sip-calculator',
    'stock-average-calculator',
    'sukanya-samriddhi-yojana-calculator',
    'swp-calculator',
    'work-hours-calculator',
  ].map(calc => ({
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
