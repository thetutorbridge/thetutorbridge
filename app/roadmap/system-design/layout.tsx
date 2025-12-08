import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Design Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master system design with our comprehensive 2026 roadmap. Learn scalability, databases, caching, load balancing, microservices, and distributed systems. Step-by-step guide for system design interviews and building scalable applications.',
  keywords: [
    'system design roadmap',
    'system design roadmap 2026',
    'system design interview',
    'system design tutorial',
    'system design learning path',
    'scalability',
    'distributed systems',
    'microservices',
    'load balancing',
    'caching',
    'database design',
    'high level design',
    'low level design',
    'system design basics',
    'system design for beginners',
    'system design course',
    'cap theorem',
    'database sharding',
    'message queues',
    'system design patterns',
    'system design architecture',
    'cdn',
    'api design',
    'system design salary',
    'system design jobs',
    'system design questions',
    'system design examples',
    'system design book',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/system-design',
  },
  openGraph: {
    title: 'System Design Roadmap 2026 - Complete Learning Path',
    description: 'Master system design with scalability, databases, caching, and distributed systems. Your complete guide to system design interviews.',
    url: 'https://www.thetutorbridge.com/roadmap/system-design',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-system-design-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'System Design Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System Design Roadmap 2026 - Complete Learning Path',
    description: 'Master system design with scalability, databases, caching, and distributed systems.',
    images: ['https://www.thetutorbridge.com/og-system-design-roadmap.png'],
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

export default function SystemDesignRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
