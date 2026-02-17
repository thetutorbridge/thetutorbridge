import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Python Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Python programming with our comprehensive 2026 roadmap. Learn Python basics, OOP, web frameworks, data science, automation, and more. Step-by-step guide from beginner to professional Python developer.',
  keywords: [
    'python roadmap',
    'python roadmap 2026',
    'how to become a python developer',
    'python learning path',
    'python skills',
    'python programming',
    'python tutorial',
    'python for beginners',
    'django tutorial',
    'flask tutorial',
    'fastapi tutorial',
    'python web development',
    'python automation',
    'python scripting',
    'python salary',
    'python jobs',
    'python developer',
    'python course',
    'python certification',
    'python data science',
    'python machine learning',
    'python frameworks',
    'python career',
    'python interview',
    'python projects',
    'learn python',
    'python basics',
    'python oop',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/python-developer',
  },
  openGraph: {
    title: 'Python Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Python programming with web frameworks, automation, and data science. Your complete guide to becoming a Python developer.',
    url: 'https://www.thetutorbridge.com/roadmap/python-developer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Python Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Python Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Python programming with web frameworks, automation, and data science.',
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

export default function PythonDeveloperRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
