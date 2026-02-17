import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Node.js Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Node.js with our comprehensive 2026 roadmap. Learn modules, npm, Express, databases, authentication, APIs, testing & more. Step-by-step guide from beginner to professional Node.js developer with salary insights.',
  keywords: [
    'nodejs roadmap',
    'node.js developer roadmap 2026',
    'how to learn nodejs',
    'nodejs learning path',
    'nodejs skills',
    'express.js roadmap',
    'nodejs backend developer',
    'nodejs career path',
    'nodejs guide',
    'nodejs salary',
    'nodejs jobs',
    'nodejs portfolio',
    'nodejs projects',
    'learn nodejs',
    'nodejs course',
    'nodejs tutorial',
    'express.js',
    'npm',
    'nodejs api',
    'nodejs authentication',
    'nodejs database',
    'mongodb nodejs',
    'nodejs for beginners',
    'nodejs interview',
    'nodejs resume',
    'rest api nodejs',
    'nodejs technologies',
    'nodejs tools',
    'nestjs',
    'fastify',
    'nodejs testing',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/nodejs',
  },
  openGraph: {
    title: 'Node.js Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Node.js with our comprehensive 2026 roadmap. Step-by-step guide covering modules, Express, databases, and API development.',
    url: 'https://www.thetutorbridge.com/roadmap/nodejs',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Node.js Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Node.js Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Node.js with our comprehensive 2026 roadmap. Express, databases, APIs & authentication.',
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

export default function NodejsRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
