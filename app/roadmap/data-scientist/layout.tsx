import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Scientist Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master data science with our comprehensive 2026 roadmap. Learn Python, statistics, machine learning, deep learning, NLP, and MLOps. Step-by-step guide from beginner to professional data scientist.',
  keywords: [
    'data scientist roadmap',
    'data scientist roadmap 2026',
    'how to become a data scientist',
    'data science learning path',
    'data science skills',
    'machine learning',
    'deep learning',
    'python for data science',
    'data science tutorial',
    'data science for beginners',
    'data science course',
    'data science salary',
    'data science jobs',
    'tensorflow',
    'pytorch',
    'scikit-learn',
    'pandas',
    'numpy',
    'statistics for data science',
    'nlp',
    'natural language processing',
    'computer vision',
    'data science projects',
    'data science interview',
    'data science certification',
    'mlops',
    'data science career',
    'ai data scientist',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/data-scientist',
  },
  openGraph: {
    title: 'Data Scientist Roadmap 2026 - Complete Learning Path',
    description: 'Master data science with Python, machine learning, deep learning, and MLOps. Your complete guide to becoming a data scientist.',
    url: 'https://www.thetutorbridge.com/roadmap/data-scientist',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Data Scientist Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Scientist Roadmap 2026 - Complete Learning Path',
    description: 'Master data science with Python, machine learning, deep learning, and MLOps.',
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

export default function DataScientistRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
