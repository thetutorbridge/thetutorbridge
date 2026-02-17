import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Manager Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Engineering Management with our comprehensive 2026 roadmap. Learn team leadership, technical strategy, hiring, performance management, and scaling engineering teams. Start your management career today!',
  keywords: [
    'engineering manager roadmap',
    'engineering manager roadmap 2026',
    'engineering manager learning path',
    'tech lead to manager',
    'engineering leadership',
    'team management',
    'technical management',
    'software engineering manager',
    'engineering manager skills',
    'people management',
    'hiring engineers',
    'performance reviews',
    'one on ones',
    'engineering metrics',
    'agile management',
    'scrum master',
    'engineering manager interview',
    'engineering manager career',
    'engineering manager salary',
    'engineering manager jobs',
    'tech leadership',
    'director of engineering',
    'vp engineering',
    'engineering manager certification',
    'engineering manager transition',
    'staff engineer vs manager',
    'engineering management skills',
    'leading engineers',
    'technical strategy',
    'engineering culture'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/engineering-manager',
  },
  openGraph: {
    title: 'Engineering Manager Roadmap 2026 - Complete Learning Path',
    description: 'Master Engineering Management with our comprehensive 2026 roadmap. Learn team leadership, technical strategy, hiring, performance management, and scaling engineering teams.',
    url: 'https://www.thetutorbridge.com/roadmap/engineering-manager',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Engineering Manager Roadmap 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Manager Roadmap 2026 - Complete Learning Path',
    description: 'Master Engineering Management with our comprehensive 2026 roadmap. Learn team leadership, technical strategy, hiring, performance management, and scaling engineering teams.',
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

export default function EngineeringManagerRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
