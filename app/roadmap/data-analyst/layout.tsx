import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Analyst Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master data analytics with our comprehensive 2026 roadmap. Learn Excel, SQL, Python, Statistics, Power BI, Tableau & more. Step-by-step guide from beginner to professional data analyst with salary insights and project ideas.',
  keywords: [
    'data analyst roadmap',
    'data analyst roadmap 2026',
    'how to become a data analyst',
    'data analyst learning path',
    'data analyst skills',
    'data analyst career path',
    'data analyst guide',
    'data analyst salary',
    'data analyst jobs',
    'data analyst portfolio',
    'data analyst projects',
    'learn data analytics',
    'data analyst course',
    'data analyst tutorial',
    'sql for data analyst',
    'python for data analyst',
    'excel for data analyst',
    'tableau tutorial',
    'power bi tutorial',
    'data analyst for beginners',
    'data analyst certification',
    'data analyst interview',
    'data analyst resume',
    'data analyst vs data scientist',
    'data analyst tools',
    'data visualization',
    'business intelligence',
    'statistical analysis',
    'data cleaning',
    'pandas tutorial',
    'data analyst technologies',
    'data analyst frameworks',
    'kaggle competitions',
    'data analyst bootcamp',
    'entry level data analyst',
    'junior data analyst',
    'senior data analyst',
    'data analyst remote jobs',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/data-analyst',
  },
  openGraph: {
    title: 'Data Analyst Roadmap 2026 - Complete Learning Path',
    description: 'Master data analytics with our comprehensive 2026 roadmap. Step-by-step guide covering Excel, SQL, Python, Statistics, and visualization tools.',
    url: 'https://www.thetutorbridge.com/roadmap/data-analyst',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-data-analyst-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Data Analyst Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Analyst Roadmap 2026 - Complete Learning Path',
    description: 'Master data analytics with our comprehensive 2026 roadmap. Excel, SQL, Python, Statistics & visualization tools.',
    images: ['https://www.thetutorbridge.com/og-data-analyst-roadmap.png'],
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

export default function DataAnalystRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
