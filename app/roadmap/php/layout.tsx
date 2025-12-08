import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PHP Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master PHP with our comprehensive 2026 roadmap. Learn Laravel, Symfony, MySQL, REST APIs, testing, and modern PHP development. Start your PHP career today!',
  keywords: [
    'php developer roadmap',
    'php developer roadmap 2026',
    'php learning path',
    'laravel tutorial',
    'symfony framework',
    'php mysql',
    'php developer',
    'php 8',
    'composer',
    'php oop',
    'php mvc',
    'php rest api',
    'php security',
    'wordpress development',
    'php frameworks',
    'php testing',
    'phpunit',
    'php career',
    'php jobs',
    'php backend',
    'php web development',
    'php full stack',
    'php best practices',
    'modern php',
    'php for beginners',
    'php certification',
    'php skills',
    'php interview',
    'php database',
    'php crud'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/php',
  },
  openGraph: {
    title: 'PHP Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master PHP with our comprehensive 2026 roadmap. Learn Laravel, Symfony, MySQL, REST APIs, testing, and modern PHP development.',
    url: 'https://www.thetutorbridge.com/roadmap/php',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PHP Developer Roadmap 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHP Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master PHP with our comprehensive 2026 roadmap. Learn Laravel, Symfony, MySQL, REST APIs, testing, and modern PHP development.',
    images: ['/og-image.png'],
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

export default function PHPRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
