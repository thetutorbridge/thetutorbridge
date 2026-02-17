import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Backend Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master backend development with our comprehensive 2026 roadmap. Learn Node.js, Python, databases, APIs, security, DevOps & more. Step-by-step guide from beginner to professional backend developer with salary insights and project ideas.',
  keywords: [
    'backend developer roadmap',
    'backend developer roadmap 2026',
    'how to become a backend developer',
    'backend developer learning path',
    'backend developer skills',
    'node.js developer roadmap',
    'python backend developer',
    'backend developer career path',
    'server-side development',
    'backend developer guide',
    'API developer roadmap',
    'backend developer salary',
    'backend developer jobs',
    'backend developer portfolio',
    'backend developer projects',
    'learn backend development',
    'backend developer course',
    'backend developer tutorial',
    'REST API development',
    'database developer',
    'backend web development',
    'backend developer for beginners',
    'backend developer certification',
    'backend developer interview',
    'backend developer resume',
    'backend developer vs frontend developer',
    'backend developer technologies',
    'backend developer tools',
    'backend developer frameworks',
    'express.js developer',
    'django developer roadmap',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/backend-developer',
  },
  openGraph: {
    title: 'Backend Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master backend development with our comprehensive 2026 roadmap. Step-by-step guide covering server-side languages, databases, APIs, security, and DevOps.',
    url: 'https://www.thetutorbridge.com/roadmap/backend-developer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Backend Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Backend Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master backend development with our comprehensive 2026 roadmap. Server-side languages, databases, APIs & DevOps.',
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

export default function BackendDeveloperRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
