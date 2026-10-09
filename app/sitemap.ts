import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/markdown-blog';
import { getAllEquationSlugs } from '@/lib/equations-data';
import { getAllFractionSlugs } from '@/lib/fractions-data';
import { getAllPercentageSlugs } from '@/lib/percentage-data';
import { getAllConversionSlugs } from '@/lib/conversions-data';
import { getAllGeometrySlugs } from '@/lib/geometry-data';
import { getAllFormulaSlugs } from '@/lib/formulas-data';
import { getAllWordProblemSlugs } from '@/lib/word-problems-data';

// Revalidate sitemap every 60 seconds to pick up new blog posts automatically
export const revalidate = 60;

// All roadmap slugs - manually maintained list
const roadmapSlugs = [
  'frontend-developer',
  'backend-developer',
  'full-stack-developer',
  'devops',
  'ai-engineer',
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
];

// All calculator slugs - manually maintained list
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
  'macro-calculator',
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
  'ovulation-calculator',
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
  'ppp-salary-calculator',
  'pregnancy-calculator',
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
  'scientific-calculator',
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
  'student-loan-calculator',
  'sukanya-samriddhi-yojana-calculator',
  'swp-calculator',
  'tank-volume-calculator',
  'tbsp-to-grams-converter',
  'tdee-calculator',
  'test-grade-calculator',
  'time-to-decimal-calculator',
  'time-until-calculator',
  'trigonometry-calculator',
  'variance-calculator',
  'vo2-max-calculator',
  'watt-calculator',
  'work-hours-calculator',
];

// All tool slugs
const toolSlugs = [
  'timer',
  'character-counter',
  'password-generator',
  'random-number-generator',
  'case-converter',
  'age-calculator',
  'date-calculator',
  'days-between-dates',
  'tip-calculator',
  'temperature-converter',
  'word-counter',
  'length-converter',
  'random-name-generator',
  'md5-generator',
  'base64-encoder-decoder',
  'color-picker',
  'world-clock',
  'time-zone-converter',
  'rgb-hex-converter',
  'lorem-ipsum-generator',
  'text-repeater',
  'reverse-text',
  'json-formatter',
  'countdown-timer',
  'uuid-generator',
  'url-encoder-decoder',
  'html-encoder-decoder',
  'qr-code-generator',
  'percentage-calculator',
  'bmi-calculator',
  'discount-calculator',
  'unit-converter',
  'loan-calculator',
  'pomodoro-timer',
  'text-diff-checker',
  'markdown-to-html',
  'csv-to-json',
  'binary-converter',
  'hex-converter',
  'roman-numeral-converter',
  'epoch-converter',
  'color-palette-generator',
  'gradient-generator',
  'box-shadow-generator',
  'css-minifier',
  'js-minifier',
  'sql-formatter',
  'xml-formatter',
  'yaml-to-json',
  'string-utility',
  'color-contrast-checker',
  'image-to-base64',
  'invoice-generator',
  'resume-builder',
  'qr-code-scanner',
  'barcode-generator',
  'dice-roller',
  'text-statistics',
  'regex-tester',
  'json-to-xml',
  'json-to-csv-converter',
  'html-table-generator',
  'markdown-table-generator',
  'html-beautifier',
  'css-beautifier',
  'js-beautifier',
  'color-shades-generator',
  'morse-code-translator',
  'number-base-converter',
  'scientific-calculator',
  'find-and-replace',
  'text-cleaner',
  'list-randomizer',
  'word-frequency-counter',
  'character-frequency-counter',
  'rgb-hsl-converter',
  'random-color-generator',
  'decimal-binary-converter',
  'ascii-text-generator',
  'line-sorter',
  'list-deduplicator',
  'whitespace-remover',
];

// Brain games slugs
const brainGamesSlugs = [
  'times-table-speed-test',
  'memory-card-match',
  'mental-math-grade-3',
  'mental-math-grade-4',
  'mental-math-grade-5',
  'mental-math-grade-6',
  'mental-math-grade-7',
  'mental-math-grade-8',
];

// Times tables slugs
const timesTablesSlugs = [
  '2-times-table',
  '3-times-table',
  '4-times-table',
  '5-times-table',
  '6-times-table',
  '7-times-table',
  '8-times-table',
  '9-times-table',
  '10-times-table',
  '11-times-table',
  '12-times-table',
];

// Class 6 science chapters
const class6ScienceChapters = [
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
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.thetutorbridge.com';
  const lastModified = new Date();

  // Helper function to create sitemap entry
  const entry = (path: string) => ({ url: `${baseUrl}${path}`, lastModified });

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/pricing',
    '/how-it-works',
    '/book-demo-class',
    '/homework-help',
    '/homework-help/submit',
    '/homework-help/math',
    '/homework-help/science',
    '/homework-help/english',
    '/tutoring',
    '/tutoring/free-consultation',
    '/tutoring/math',
    '/tutoring/science',
    '/tutoring/english',
    '/ai-study-guide-maker',
    '/motivational-sessions',
    '/career-guidance',
    '/doubt-solving',
    '/doubt-solving/ask-doubt',
    '/blog',
    '/calculators',
    '/roadmap',
    '/study-resources',
    '/study-resources/work-in-progress',
    '/solve',
    '/fraction-to-decimal',
    '/percentage',
    '/convert',
    '/geometry',
    '/formulas',
    '/word-problems',
    '/tools',
    '/brain-games',
    '/times-tables',
    '/marketing',
    '/marketing/ai-marketing-tools',
    '/marketing/best-rank-tracking-tool',
    '/marketing/best-rank-tracking-tools',
    '/marketing/best-seo-tools',
    '/marketing/best-seo-automation-software',
    '/college-acceptance-rates',
    '/cost-of-education-by-country',
    '/education-statistics',
    '/student-mental-health-statistics',
    '/teacher-salary-statistics',
    '/worksheets',
    '/worksheets/grade-6',
    '/worksheets/grade-7',
    '/worksheets/grade-8',
  ].map(entry);

  // Calculator pages
  const calculatorPages = calculatorSlugs.map(slug => entry(`/calculators/${slug}`));

  // Roadmap pages
  const roadmapPages = roadmapSlugs.map(slug => entry(`/roadmap/${slug}`));

  // Tool pages
  const toolPages = toolSlugs.map(slug => entry(`/tools/${slug}`));

  // Brain games pages
  const brainGamesPages = brainGamesSlugs.map(slug => entry(`/brain-games/${slug}`));

  // Times tables pages
  const timesTablesPages = timesTablesSlugs.map(slug => entry(`/times-tables/${slug}`));

  // Study resources - class pages
  const classPages = ['class-6', 'class-7', 'class-8', 'class-9', 'class-10', 'class-11', 'class-12'];
  const classMainPages = classPages.map(cls => entry(`/study-resources/${cls}`));

  // Study resources - class 6 subjects
  const class6SubjectPages = ['maths', 'science', 'english'].map(subject =>
    entry(`/study-resources/class-6/${subject}`)
  );

  // Study resources - class 6 science chapters
  const class6SciencePages = class6ScienceChapters.map(chapter =>
    entry(`/study-resources/class-6/science/${chapter}`)
  );

  // Study resources - class 7-10 subjects
  const class7to10SubjectPages: MetadataRoute.Sitemap = [];
  ['class-7', 'class-8', 'class-9', 'class-10'].forEach(cls => {
    ['maths', 'science', 'english'].forEach(subject => {
      class7to10SubjectPages.push(entry(`/study-resources/${cls}/${subject}`));
    });
  });

  // Study resources - class 11-12 subjects
  const class11to12SubjectPages: MetadataRoute.Sitemap = [];
  ['class-11', 'class-12'].forEach(cls => {
    ['maths', 'physics', 'chemistry', 'biology', 'english'].forEach(subject => {
      class11to12SubjectPages.push(entry(`/study-resources/${cls}/${subject}`));
    });
  });

  // Blog posts
  let blogPostPages: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllBlogPosts(false);
    blogPostPages = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || new Date()),
    }));
  } catch {
    // Silent fail
  }

  // Equation solver pages
  const equationPages = getAllEquationSlugs().map(slug => entry(`/solve/${slug}`));

  // Fraction to decimal pages
  const fractionPages = getAllFractionSlugs().map(slug => entry(`/fraction-to-decimal/${slug}`));

  // Percentage pages
  const percentagePages = getAllPercentageSlugs().map(slug => entry(`/percentage/${slug}`));

  // Conversion pages
  const conversionPages = getAllConversionSlugs().map(slug => entry(`/convert/${slug}`));

  // Geometry pages
  const geometryPages = getAllGeometrySlugs().map(slug => entry(`/geometry/${slug}`));

  // Formula pages
  const formulaPages = getAllFormulaSlugs().map(slug => entry(`/formulas/${slug}`));

  // Word problem pages
  const wordProblemPages = getAllWordProblemSlugs().map(slug => entry(`/word-problems/${slug}`));

  // Combine all pages
  return [
    ...staticPages,
    ...blogPostPages,
    ...calculatorPages,
    ...roadmapPages,
    ...toolPages,
    ...brainGamesPages,
    ...timesTablesPages,
    ...classMainPages,
    ...class6SubjectPages,
    ...class6SciencePages,
    ...class7to10SubjectPages,
    ...class11to12SubjectPages,
    ...equationPages,
    ...fractionPages,
    ...percentagePages,
    ...conversionPages,
    ...geometryPages,
    ...formulaPages,
    ...wordProblemPages,
  ];
}
