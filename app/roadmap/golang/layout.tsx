import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Golang Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Go (Golang) with our comprehensive 2026 roadmap. Learn Go fundamentals, concurrency, web development, microservices, and cloud-native applications. Step-by-step guide from beginner to professional Go developer with salary insights.',
  keywords: [
    'golang roadmap',
    'golang roadmap 2026',
    'how to become a go developer',
    'go developer learning path',
    'golang skills',
    'go programming roadmap',
    'golang developer roadmap',
    'golang career',
    'go developer guide',
    'golang salary',
    'golang jobs',
    'go developer portfolio',
    'golang projects',
    'learn golang',
    'golang course',
    'golang tutorial',
    'go programming',
    'goroutines',
    'channels',
    'concurrency',
    'gin framework',
    'kubernetes',
    'golang for beginners',
    'go developer certification',
    'golang interview',
    'go developer resume',
    'microservices go',
    'golang technologies',
    'golang tools',
    'docker go',
    'grpc',
    'cli applications',
    'cloud native go',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/golang',
  },
  openGraph: {
    title: 'Golang Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Go (Golang) with our comprehensive 2026 roadmap. Concurrency, web development, microservices, and cloud-native apps.',
    url: 'https://www.thetutorbridge.com/roadmap/golang',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-golang-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Golang Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golang Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Go (Golang) with our comprehensive 2026 roadmap. Concurrency, microservices & cloud-native.',
    images: ['https://www.thetutorbridge.com/og-golang-roadmap.png'],
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

export default function GolangRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
