import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Architect Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Software Architecture with our comprehensive 2026 roadmap. Learn design patterns, system design, microservices, cloud architecture, and technical leadership. Step-by-step guide from developer to professional Software Architect with salary insights.',
  keywords: [
    'software architect roadmap',
    'software architect roadmap 2026',
    'how to become a software architect',
    'software architect learning path',
    'software architect skills',
    'system design roadmap',
    'software architect career',
    'software architect guide',
    'software architect salary',
    'software architect jobs',
    'software architect portfolio',
    'software architect projects',
    'learn software architecture',
    'software architect course',
    'software architect tutorial',
    'design patterns',
    'microservices architecture',
    'cloud architecture',
    'distributed systems',
    'scalability',
    'technical leadership',
    'architect for beginners',
    'software architect certification',
    'software architect interview',
    'software architect resume',
    'enterprise architecture',
    'software architect technologies',
    'software architect tools',
    'architecture documentation',
    'solution architect',
    'system design interview',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/software-architect',
  },
  openGraph: {
    title: 'Software Architect Roadmap 2026 - Complete Learning Path',
    description: 'Master Software Architecture with our comprehensive 2026 roadmap. Design patterns, system design, and cloud architecture.',
    url: 'https://www.thetutorbridge.com/roadmap/software-architect',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Software Architect Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Architect Roadmap 2026 - Complete Learning Path',
    description: 'Master Software Architecture with our comprehensive 2026 roadmap. Design patterns & system design.',
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

export default function SoftwareArchitectRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
