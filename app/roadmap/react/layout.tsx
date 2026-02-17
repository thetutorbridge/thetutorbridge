import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master React with our comprehensive 2026 roadmap. Learn components, hooks, state management, routing, testing, Next.js & more. Step-by-step guide from beginner to professional React developer with salary insights.',
  keywords: [
    'react roadmap',
    'react developer roadmap 2026',
    'how to learn react',
    'react learning path',
    'react skills',
    'react hooks roadmap',
    'react developer career',
    'react jobs',
    'react guide',
    'react salary',
    'react portfolio',
    'react projects',
    'learn react',
    'react course',
    'react tutorial',
    'react components',
    'react hooks',
    'useState useEffect',
    'react state management',
    'redux zustand',
    'react router',
    'react testing',
    'react for beginners',
    'react interview',
    'react resume',
    'next.js',
    'react typescript',
    'react developer tools',
    'tailwind react',
    'react native',
    'react query',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/react',
  },
  openGraph: {
    title: 'React Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master React with our comprehensive 2026 roadmap. Step-by-step guide covering components, hooks, state management, and Next.js.',
    url: 'https://www.thetutorbridge.com/roadmap/react',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'React Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master React with our comprehensive 2026 roadmap. Components, hooks, state management & Next.js.',
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

export default function ReactRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
