import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Manager Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Product Management with our comprehensive 2026 roadmap. Learn product strategy, user research, roadmapping, agile, analytics, stakeholder management & more. Step-by-step guide to becoming a professional Product Manager.',
  keywords: [
    'product manager roadmap',
    'product manager roadmap 2026',
    'how to become a product manager',
    'product manager learning path',
    'product manager skills',
    'pm roadmap',
    'product management career',
    'product manager guide',
    'product manager salary',
    'product manager jobs',
    'product manager portfolio',
    'product manager projects',
    'learn product management',
    'product manager course',
    'product manager tutorial',
    'product strategy',
    'user research',
    'product roadmap',
    'agile product management',
    'product analytics',
    'pm for beginners',
    'product manager certification',
    'product manager interview',
    'product manager resume',
    'stakeholder management',
    'product manager technologies',
    'product manager tools',
    'jira confluence',
    'product metrics',
    'mvp',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/product-manager',
  },
  openGraph: {
    title: 'Product Manager Roadmap 2026 - Complete Learning Path',
    description: 'Master Product Management with our comprehensive 2026 roadmap. Product strategy, user research, roadmapping, and analytics.',
    url: 'https://www.thetutorbridge.com/roadmap/product-manager',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Product Manager Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Manager Roadmap 2026 - Complete Learning Path',
    description: 'Master Product Management with our comprehensive 2026 roadmap. Strategy, research, roadmapping & analytics.',
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

export default function ProductManagerRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
