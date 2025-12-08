import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Science Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Computer Science fundamentals with our comprehensive 2026 roadmap. Learn programming, data structures, algorithms, operating systems, databases, and networking. Step-by-step guide to CS fundamentals.',
  keywords: [
    'computer science roadmap',
    'computer science roadmap 2026',
    'how to learn computer science',
    'computer science learning path',
    'computer science skills',
    'cs fundamentals roadmap',
    'computer science career',
    'computer science guide',
    'computer science salary',
    'software engineer jobs',
    'computer science portfolio',
    'computer science projects',
    'learn computer science',
    'computer science course',
    'computer science tutorial',
    'data structures',
    'algorithms',
    'operating systems',
    'computer networks',
    'databases',
    'discrete mathematics',
    'cs for beginners',
    'computer science degree',
    'computer science interview',
    'software engineering',
    'system design',
    'computer science technologies',
    'computer science tools',
    'programming fundamentals',
    'theory of computation',
    'computer architecture',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/computer-science',
  },
  openGraph: {
    title: 'Computer Science Roadmap 2026 - Complete Learning Path',
    description: 'Master Computer Science with our comprehensive 2026 roadmap. DSA, OS, databases, and networking.',
    url: 'https://www.thetutorbridge.com/roadmap/computer-science',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-computer-science-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Computer Science Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Computer Science Roadmap 2026 - Complete Learning Path',
    description: 'Master Computer Science with our comprehensive 2026 roadmap. DSA, OS & databases.',
    images: ['https://www.thetutorbridge.com/og-computer-science-roadmap.png'],
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

export default function ComputerScienceRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
