import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Angular Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Angular with our comprehensive 2026 roadmap. Learn TypeScript, RxJS, NgRx, Angular Material, testing, and enterprise application development. Start your Angular career today!',
  keywords: [
    'angular developer roadmap',
    'angular developer roadmap 2026',
    'angular learning path',
    'angular tutorial',
    'angular typescript',
    'rxjs angular',
    'ngrx state management',
    'angular material',
    'angular cli',
    'angular components',
    'angular services',
    'angular routing',
    'angular forms',
    'angular http',
    'angular testing',
    'angular best practices',
    'angular enterprise',
    'angular career',
    'angular jobs',
    'angular vs react',
    'angular developer',
    'angular 17',
    'angular signals',
    'angular standalone',
    'angular ssr',
    'angular certification',
    'angular interview',
    'angular skills',
    'frontend angular',
    'angular for beginners'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/angular',
  },
  openGraph: {
    title: 'Angular Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Angular with our comprehensive 2026 roadmap. Learn TypeScript, RxJS, NgRx, Angular Material, testing, and enterprise application development.',
    url: 'https://www.thetutorbridge.com/roadmap/angular',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Angular Developer Roadmap 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angular Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Angular with our comprehensive 2026 roadmap. Learn TypeScript, RxJS, NgRx, Angular Material, testing, and enterprise application development.',
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

export default function AngularRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
