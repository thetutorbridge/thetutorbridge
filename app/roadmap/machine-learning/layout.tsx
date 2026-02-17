import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Machine Learning Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Machine Learning with our comprehensive 2026 roadmap. Learn mathematics, Python, ML algorithms, deep learning, neural networks, MLOps & more. Step-by-step guide from beginner to professional ML Engineer with salary insights.',
  keywords: [
    'machine learning roadmap',
    'machine learning engineer roadmap 2026',
    'how to become a machine learning engineer',
    'ml engineer learning path',
    'machine learning skills',
    'deep learning roadmap',
    'neural networks roadmap',
    'ml engineer career path',
    'machine learning guide',
    'ml engineer salary',
    'machine learning jobs',
    'ml engineer portfolio',
    'machine learning projects',
    'learn machine learning',
    'ml engineer course',
    'machine learning tutorial',
    'scikit-learn',
    'tensorflow roadmap',
    'pytorch roadmap',
    'supervised learning',
    'unsupervised learning',
    'deep learning',
    'ml for beginners',
    'ml engineer certification',
    'ml engineer interview',
    'ml engineer resume',
    'feature engineering',
    'model deployment',
    'mlops',
    'cnn rnn',
    'transformers ml',
    'natural language processing',
    'computer vision',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/machine-learning',
  },
  openGraph: {
    title: 'Machine Learning Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master Machine Learning with our comprehensive 2026 roadmap. Step-by-step guide covering mathematics, Python, ML algorithms, deep learning, and MLOps.',
    url: 'https://www.thetutorbridge.com/roadmap/machine-learning',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Machine Learning Engineer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Machine Learning Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master Machine Learning with our comprehensive 2026 roadmap. Mathematics, Python, ML algorithms & deep learning.',
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

export default function MachineLearningRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
