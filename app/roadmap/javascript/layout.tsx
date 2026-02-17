import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JavaScript Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master JavaScript with our comprehensive 2026 roadmap. Learn ES6+, DOM manipulation, async programming, Node.js, React & more. Step-by-step guide from beginner to professional JavaScript developer with salary insights and project ideas.',
  keywords: [
    'javascript developer roadmap',
    'javascript developer roadmap 2026',
    'how to become a javascript developer',
    'javascript developer learning path',
    'javascript developer skills',
    'es6 roadmap',
    'node.js roadmap',
    'javascript developer career path',
    'javascript developer guide',
    'javascript developer salary',
    'javascript developer jobs',
    'javascript developer portfolio',
    'javascript developer projects',
    'learn javascript programming',
    'javascript developer course',
    'javascript developer tutorial',
    'javascript basics',
    'dom manipulation',
    'async javascript',
    'promises async await',
    'javascript frameworks',
    'react roadmap',
    'javascript for beginners',
    'javascript developer certification',
    'javascript developer interview',
    'javascript developer resume',
    'typescript roadmap',
    'javascript developer technologies',
    'javascript developer tools',
    'npm yarn',
    'javascript testing',
    'javascript fullstack',
    'javascript backend',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/javascript',
  },
  openGraph: {
    title: 'JavaScript Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master JavaScript with our comprehensive 2026 roadmap. Step-by-step guide covering ES6+, DOM, async programming, Node.js, and frameworks.',
    url: 'https://www.thetutorbridge.com/roadmap/javascript',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JavaScript Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JavaScript Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master JavaScript with our comprehensive 2026 roadmap. ES6+, DOM, async programming & Node.js.',
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

export default function JavaScriptRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
