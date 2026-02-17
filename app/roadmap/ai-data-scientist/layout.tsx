import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & Data Scientist Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master AI and Data Science with our comprehensive 2026 roadmap. Learn mathematics, Python, machine learning, deep learning, MLOps & more. Step-by-step guide from beginner to professional AI Data Scientist with salary insights and project ideas.',
  keywords: [
    'ai data scientist roadmap',
    'data scientist roadmap 2026',
    'how to become a data scientist',
    'data scientist learning path',
    'ai engineer roadmap',
    'machine learning roadmap',
    'deep learning roadmap',
    'data scientist career path',
    'data scientist skills',
    'python for data science',
    'data scientist guide',
    'data scientist salary',
    'data scientist jobs',
    'data scientist portfolio',
    'data scientist projects',
    'learn data science',
    'data scientist course',
    'data scientist tutorial',
    'machine learning engineer',
    'artificial intelligence career',
    'data science for beginners',
    'data scientist certification',
    'data scientist interview',
    'data scientist resume',
    'tensorflow pytorch',
    'data scientist technologies',
    'data scientist tools',
    'scikit-learn',
    'neural networks',
    'nlp roadmap',
    'computer vision roadmap',
    'mlops roadmap',
    'statistics for data science',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/ai-data-scientist',
  },
  openGraph: {
    title: 'AI & Data Scientist Roadmap 2026 - Complete Learning Path',
    description: 'Master AI and Data Science with our comprehensive 2026 roadmap. Step-by-step guide covering mathematics, Python, ML, deep learning, and MLOps.',
    url: 'https://www.thetutorbridge.com/roadmap/ai-data-scientist',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI & Data Scientist Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Data Scientist Roadmap 2026 - Complete Learning Path',
    description: 'Master AI and Data Science with our comprehensive 2026 roadmap. Mathematics, Python, ML, deep learning & MLOps.',
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

export default function AIDataScientistRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
