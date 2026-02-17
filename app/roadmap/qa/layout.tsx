import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QA Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master QA Engineering with our comprehensive 2026 roadmap. Learn manual testing, automation testing, Selenium, Cypress, Playwright, API testing, performance testing & more. Step-by-step guide from beginner to professional QA Engineer with salary insights.',
  keywords: [
    'qa engineer roadmap',
    'qa engineer roadmap 2026',
    'how to become a qa engineer',
    'qa engineer learning path',
    'qa engineer skills',
    'software testing roadmap',
    'automation testing roadmap',
    'qa engineer career path',
    'qa engineer guide',
    'qa engineer salary',
    'qa engineer jobs',
    'qa engineer portfolio',
    'qa engineer projects',
    'learn software testing',
    'qa engineer course',
    'qa engineer tutorial',
    'selenium testing',
    'cypress testing',
    'playwright testing',
    'manual testing',
    'test automation',
    'api testing',
    'qa for beginners',
    'qa engineer certification',
    'qa engineer interview',
    'qa engineer resume',
    'performance testing',
    'security testing',
    'qa engineer technologies',
    'qa engineer tools',
    'jmeter',
    'postman testing',
    'ci cd testing',
  ],
  authors: [{ name: 'The Tutor Bridge' }],
  creator: 'The Tutor Bridge',
  publisher: 'The Tutor Bridge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/qa',
  },
  openGraph: {
    title: 'QA Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master QA Engineering with our comprehensive 2026 roadmap. Step-by-step guide covering manual testing, automation, Selenium, Cypress, API testing, and CI/CD.',
    url: 'https://www.thetutorbridge.com/roadmap/qa',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QA Engineer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QA Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master QA Engineering with our comprehensive 2026 roadmap. Manual testing, automation, Selenium, Cypress & CI/CD.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function QARoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
