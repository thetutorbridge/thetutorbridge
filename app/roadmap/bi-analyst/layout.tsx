import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Intelligence Analyst Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Business Intelligence with our comprehensive 2026 roadmap. Learn SQL, data visualization, Power BI, Tableau, data modeling, and analytics. Step-by-step guide from beginner to professional BI Analyst with salary insights.',
  keywords: [
    'bi analyst roadmap',
    'business intelligence roadmap 2026',
    'how to become a bi analyst',
    'bi analyst learning path',
    'bi analyst skills',
    'power bi roadmap',
    'tableau roadmap',
    'bi analyst career',
    'bi analyst guide',
    'bi analyst salary',
    'bi analyst jobs',
    'bi analyst portfolio',
    'bi analyst projects',
    'learn business intelligence',
    'bi analyst course',
    'bi analyst tutorial',
    'power bi',
    'tableau',
    'sql analytics',
    'data visualization',
    'data modeling',
    'etl',
    'bi for beginners',
    'bi analyst certification',
    'bi analyst interview',
    'bi analyst resume',
    'dashboard design',
    'bi analyst technologies',
    'bi analyst tools',
    'looker',
    'data warehouse',
    'reporting analytics',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/bi-analyst',
  },
  openGraph: {
    title: 'Business Intelligence Analyst Roadmap 2026 - Complete Learning Path',
    description: 'Master Business Intelligence with our comprehensive 2026 roadmap. Power BI, Tableau, SQL, and data visualization.',
    url: 'https://www.thetutorbridge.com/roadmap/bi-analyst',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-bi-analyst-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Business Intelligence Analyst Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Intelligence Analyst Roadmap 2026 - Complete Learning Path',
    description: 'Master Business Intelligence with our comprehensive 2026 roadmap. Power BI, Tableau & SQL.',
    images: ['https://www.thetutorbridge.com/og-bi-analyst-roadmap.png'],
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

export default function BIAnalystRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
