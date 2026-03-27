import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/markdown-blog';
import { getAllEquationSlugs } from '@/lib/equations-data';

// Revalidate sitemap every 60 seconds to pick up new blog posts automatically
export const revalidate = 60;

// All roadmap slugs - manually maintained list
const roadmapSlugs = [
  'frontend-developer',
  'backend-developer',
  'full-stack-developer',
  'devops',
  'ai-engineer',
  'ai-ml',
  'data-analyst',
  'data-scientist',
  'data-engineer',
  'cyber-security',
  'python-developer',
  'system-design',
  'dsa',
  'ai-data-scientist',
  'java',
  'javascript',
  'javascript-questions',
  'blockchain',
  'qa',
  'machine-learning',
  'aws',
  'react',
  'nodejs',
  'product-manager',
  'android',
  'game-developer',
  'ux-design',
  'aspnet-core',
  'golang',
  'sql',
  'sql-questions',
  'flutter',
  'cpp',
  'spring-boot',
  'computer-science',
  'bi-analyst',
  'ios',
  'react-native',
  'software-architect',
  'mlops',
  'prompt-engineering',
  'php',
  'linux',
  'angular',
  'engineering-manager',
  'rust',
  'postgresql-dba',
  'mobile-developer',
  'cloud-engineer',
  'sre',
  'embedded-systems',
  'firmware-engineer',
  'ar-vr-developer',
  'computer-vision',
  'nlp-engineer',
  'big-data-engineer',
  'integration-engineer',
  'projects',
];

// All calculator slugs - manually maintained list
// When adding a new calculator, add its slug here
const calculatorSlugs = [
  'age-calculator',
  'amortization-calculator',
  'annual-income-calculator',
  'area-of-a-circle-calculator',
  'average-calculator',
  'basic-calculator',
  'birth-year-calculator',
  'bmi-calculator',
  'bmr-calculator',
  'body-shape-calculator',
  'calorie-calculator',
  'calorie-deficit-calculator',
  'calories-burned-walking-calculator',
  'car-loan-emi-calculator',
  'car-payment-calculator',
  'celsius-to-fahrenheit-converter',
  'cgpa-to-percentage-calculator',
  'circle-area-calculator',
  'circumference-calculator',
  'college-gpa-calculator',
  'combinations-calculator',
  'compound-interest-calculator',
  'cube-root-calculator',
  'cubic-yards-calculator',
  'currency-converter',
  'cylinder-volume-calculator',
  'decimal-to-fraction-calculator',
  'dice-roller',
  'discount-calculator',
  'dog-size-calculator',
  'download-time-calculator',
  'duckworth-lewis-calculator',
  'emi-calculator',
  'ez-grader',
  'face-shape-calculator',
  'factoring-calculator',
  'fahrenheit-to-celsius-converter',
  'fd-calculator',
  'feet-and-inches-calculator',
  'fraction-to-decimal-calculator',
  'fraction-to-percent-calculator',
  'fractions-calculator',
  'gcf-calculator',
  'gpa-calculator',
  'grade-calculator',
  'grams-to-cups-calculator',
  'gratuity-calculator',
  'height-calculator',
  'high-school-gpa-calculator',
  'home-loan-emi-calculator',
  'hours-calculator',
  'income-tax-calculator',
  'kg-to-lb-converter',
  'lcm-calculator',
  'long-division-calculator',
  'lottery-tax-calculator',
  'love-calculator',
  'lumpsum-calculator',
  'maintenance-calorie-calculator',
  'margin-calculator',
  'marks-percentage-calculator',
  'markup-calculator',
  'mean-mode-median-calculator',
  'mg-to-ml-converter',
  'middle-school-gpa-calculator',
  'military-time-converter',
  'minecraft-circle-generator',
  'mixed-numbers-calculator',
  'ml-to-grams-converter',
  'modulo-calculator',
  'money-calculator',
  'mortgage-calculator',
  'nm-to-ft-lbs-converter',
  'numbers-to-words-converter',
  'overtime-calculator',
  'oz-to-cups-converter',
  'p-value-calculator',
  'pay-raise-calculator',
  'percent-error-calculator',
  'percent-off-calculator',
  'percentage-calculator',
  'percentage-change-calculator',
  'percentage-difference-calculator',
  'percentage-increase-calculator',
  'percentage-to-cgpa-calculator',
  'percentile-calculator',
  'personal-loan-emi-calculator',
  'pixels-to-inches-converter',
  'ppf-calculator',
  'profit-margin-calculator',
  'quadratic-formula-calculator',
  'quartile-calculator',
  'random-number-generator',
  'ratio-calculator',
  'right-triangle-calculator',
  'roman-numeral-converter',
  'rounding-numbers-calculator',
  'salary-calculator',
  'salary-to-hourly-calculator',
  'sbi-sip-calculator',
  'scientific-notation-converter',
  'semester-grade-calculator',
  'sgpa-to-cgpa-calculator',
  'sgpa-to-percentage-calculator',
  'simple-interest-calculator',
  'simplifying-fractions-calculator',
  'sip-calculator',
  'slope-calculator',
  'speed-distance-time-calculator',
  'square-footage-calculator',
  'standard-deviation-calculator',
  'step-up-sip-calculator',
  'steps-to-calories-calculator',
  'steps-to-km-calculator',
  'steps-to-miles-calculator',
  'stock-average-calculator',
  'sukanya-samriddhi-yojana-calculator',
  'swp-calculator',
  'tank-volume-calculator',
  'tbsp-to-grams-converter',
  'test-grade-calculator',
  'time-to-decimal-calculator',
  'time-until-calculator',
  'trigonometry-calculator',
  'variance-calculator',
  'vo2-max-calculator',
  'watt-calculator',
  'work-hours-calculator',
];

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
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Homework Help pages
    {
      url: `${baseUrl}/homework-help`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/homework-help/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/homework-help/math`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/homework-help/science`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/homework-help/english`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Tutoring pages
    {
      url: `${baseUrl}/tutoring`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tutoring/free-consultation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tutoring/math`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tutoring/science`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tutoring/english`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Other pages
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
  const individualCalculators: MetadataRoute.Sitemap = calculatorSlugs.map(calc => ({
    url: `${baseUrl}/calculators/${calc}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Roadmaps - Main page
  const roadmapPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/roadmap`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // All individual roadmap pages
  const individualRoadmaps: MetadataRoute.Sitemap = roadmapSlugs.map(roadmap => ({
    url: `${baseUrl}/roadmap/${roadmap}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
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

  // Fetch blog posts from markdown files
  let blogPostPages: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllBlogPosts(false);
    blogPostPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // Silent fail - sitemap will still work with static pages
  }

  // Equation Solver - Main page
  const equationSolverPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/solve`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // All individual equation solver pages
  const equationSlugs = getAllEquationSlugs();
  const individualEquations: MetadataRoute.Sitemap = equationSlugs.map(slug => ({
    url: `${baseUrl}/solve/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Combine all pages
  return [
    ...staticPages,
    ...blogPages,
    ...blogPostPages,
    ...calculatorPages,
    ...individualCalculators,
    ...roadmapPages,
    ...individualRoadmaps,
    ...studyResourcePages,
    ...classMainPages,
    ...class6SubjectPages,
    ...class6ScienceChapters,
    ...otherClassSubjectPages,
    ...seniorClassSubjectPages,
    ...equationSolverPages,
    ...individualEquations,
  ];
}
