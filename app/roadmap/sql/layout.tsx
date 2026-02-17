import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master SQL with our comprehensive 2026 roadmap. Learn database fundamentals, queries, joins, subqueries, optimization, and advanced SQL concepts. Step-by-step guide from beginner to SQL expert with salary insights.',
  keywords: [
    'sql roadmap',
    'sql roadmap 2026',
    'how to learn sql',
    'sql learning path',
    'sql skills',
    'database roadmap',
    'sql developer roadmap',
    'sql career',
    'sql guide',
    'sql salary',
    'database jobs',
    'sql portfolio',
    'sql projects',
    'learn sql',
    'sql course',
    'sql tutorial',
    'mysql',
    'postgresql',
    'sql server',
    'joins',
    'subqueries',
    'stored procedures',
    'sql for beginners',
    'sql certification',
    'sql interview',
    'database design',
    'normalization',
    'sql technologies',
    'sql tools',
    'query optimization',
    'indexes',
    'triggers',
    'data analysis sql',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/sql',
  },
  openGraph: {
    title: 'SQL Roadmap 2026 - Complete Learning Path',
    description: 'Master SQL with our comprehensive 2026 roadmap. Queries, joins, optimization, and database design.',
    url: 'https://www.thetutorbridge.com/roadmap/sql',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SQL Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL Roadmap 2026 - Complete Learning Path',
    description: 'Master SQL with our comprehensive 2026 roadmap. Queries, joins & optimization.',
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

export default function SQLRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
