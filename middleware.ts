import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Old WordPress blog slugs that need redirects to /blog/slug
// These are blog posts that were previously at root level (e.g., /post-slug)
// and now live at /blog/post-slug
const OLD_WORDPRESS_BLOG_SLUGS = new Set([
  'cbse-class-10-and-class-12-date-sheet-2026',
  'studying-101-study-smarter-not-harder',
  'what-education-is-required-to-be-a-pharmacist',
  'what-can-you-do-with-an-early-childhood-education-degree',
  'what-education-do-you-need-to-be-an-engineer',
  'which-stream-is-best-after-10th',
  'top-10-study-tips-for-class-12-board-exams',
  'how-to-calculate-percentage',
  'how-to-learn-computer',
  'how-to-improve-concentration',
  'how-to-top-board-exams',
  'why-is-physical-education-important',
  'at-home-sleep-study',
  'score-more-than-95-in-class-10-board-exam',
  'best-courses-after-12th-commerce',
  'what-is-a-community-college',
  'how-to-score-100-marks-in-maths',
  'how-to-pass-the-teas-test-without-studying',
  'what-will-you-do-to-maximize-on-your-postsecondary-education-investment',
  'how-has-the-study-of-mitosis-affected-scientists-knowledge-of-cancer',
  'why-online-tutoring-is-the-future-of-education',
  'the-tutor-bridge-k-12-one-stop-solution',
  'what-is-holistic-education',
  'what-is-a-philosophy-of-education',
  'what-education-is-required-to-be-an-architect',
  'what-is-the-primary-function-of-dynamic-study-modules',
  'where-does-florida-rank-in-education-k-12',
  'asvab-study-guide',
  'how-students-can-make-presentation-with-ai',
  'what-is-assistive-technology-in-special-education',
  'average-cost-of-college',
  'data-science-course',
  'what-was-the-primary-finding-of-the-minnesota-study-of-twins-reared-apart',
  'what-education-is-required-to-be-a-cosmetologist',
  'what-do-special-education-teachers-do',
  'discrete-mathematics-for-computer-science',
  'how-to-study-effectively',
  'digital-marketing-courses',
  '5-proven-strategies-on-how-to-focus',
  'which-of-these-statements-was-implied-by-the-decision-in-brown-v-board-of-education',
  'blood-is-thicker-than-water',
  'do-you-need-an-education-degree-to-teach',
  'what-education-is-needed-to-become-a-therapist',
  'what-is-range-in-math',
  'high-salary-courses-after-12th-science',
  'what-is-post-secondary-education',
  'how-to-pass-exams-without-studying',
  'how-to-study-for-the-lsat',
  'why-did-mendel-study-pea-plants',
  'how-to-learn-the-russian-language',
  'who-invented-math',
  'free-ai-humanizers',
  'how-to-study-korean',
  '20-reasons-why-education-is-important',
  'what-is-work-study',
  'what-education-is-needed-to-become-a-doctor',
  'what-does-product-mean-in-math',
  'what-is-an-education-specialist',
  'what-is-graduate-level-education',
  'graduation-quotes',
  'hurt-karma-quotes',
  'boss-lady-quotes',
  'what-is-the-meaning-of-esl',
  'how-can-a-mentor-help-you-along-the-journey-to-your-dream-job',
  'where-is-sex-education-filmed',
  'how-to-become-a-physical-education-teacher',
  'what-does-secondary-education-mean',
  'what-education-is-needed-to-become-a-chef',
  'positive-quotes-for-students',
  'incorrect-quote-meaning-usage-and-tools',
  'who-is-the-father-of-math',
  'what-is-the-most-appropriate-course-of-action-for-a-mentee-who-has-a-conflict-with-a-mentor',
  'what-education-do-you-need-to-be-a-firefighter',
  'why-is-education-important',
  'what-education-do-you-need-to-be-a-screenwriter',
  'what-education-is-required-to-be-a-mechanic',
  'high-salary-courses-after-12th-science-without-neet',
  'what-education-is-needed-to-become-a-lawyer',
  'what-does-the-department-of-education-do',
  'what-is-character-education',
  'what-education-is-required-to-be-an-athletic-trainer',
  'how-to-get-special-education-certification',
  'what-education-is-needed-to-become-a-marine-biologist',
  'what-is-liberal-arts-education',
  'what-education-do-you-need-to-be-a-therapist',
  'what-education-is-required-to-be-a-chef',
  'what-education-is-needed-to-become-a-dentist',
  'what-education-is-needed-to-become-a-nurse-practitioner',
  'what-are-the-12-core-early-childhood-units',
  'what-can-you-do-with-a-masters-in-education',
  'what-education-is-required-to-be-a-video-game-designer',
  'what-education-is-required-to-be-a-truck-driver',
  'how-does-poverty-affect-education',
  'what-education-do-you-need-to-be-a-teacher',
  'how-many-credits-is-a-masters-degree-in-education',
  'what-education-is-required-to-be-a-chiropractor',
  'what-education-do-you-need-to-be-a-welder',
  'what-is-curriculum-in-education',
  'why-should-education-be-free',
  'what-is-progressive-education',
  'what-education-do-you-need-to-be-a-police-officer',
  'what-education-is-needed-to-become-an-interior-designer',
  'what-is-stem-education',
  'what-state-has-the-best-education',
  'are-net-costs-or-sticker-prices-lower-for-higher-education-and-why',
  'what-is-iep-in-education',
  'where-does-the-us-rank-in-education',
  'what-is-mtss-in-education',
  'what-is-special-education',
  'what-is-competency-based-education',
  'what-country-has-the-best-education',
  'what-does-dei-stand-for-in-education',
]);

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Redirect non-www to www for thetutorbridge.com
  if (hostname === 'thetutorbridge.com' || hostname.startsWith('thetutorbridge.com:')) {
    const url = new URL(request.url);
    url.hostname = 'www.thetutorbridge.com';

    // Use 308 permanent redirect for non-www to www
    return NextResponse.redirect(url, { status: 308 });
  }

  // Redirect old WordPress blog URLs from root to /blog/
  // Check if pathname matches an old blog slug (e.g., /what-is-stem-education -> /blog/what-is-stem-education)
  const pathWithoutSlash = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const pathSegments = pathWithoutSlash.split('/');

  // Only redirect if it's a single segment path that matches an old blog slug
  if (pathSegments.length === 1 && pathSegments[0] && OLD_WORDPRESS_BLOG_SLUGS.has(pathSegments[0])) {
    const url = new URL(request.url);
    url.pathname = `/blog/${pathSegments[0]}`;

    // Use 301 permanent redirect for SEO
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

// Configure which routes should be processed by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
