import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flutter Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Flutter with our comprehensive 2026 roadmap. Learn Dart, widgets, state management, animations, Firebase, and app deployment. Step-by-step guide from beginner to professional Flutter developer with salary insights.',
  keywords: [
    'flutter developer roadmap',
    'flutter developer roadmap 2026',
    'how to become a flutter developer',
    'flutter developer learning path',
    'flutter developer skills',
    'dart roadmap',
    'flutter developer career',
    'flutter developer guide',
    'flutter developer salary',
    'flutter developer jobs',
    'flutter developer portfolio',
    'flutter developer projects',
    'learn flutter',
    'flutter developer course',
    'flutter developer tutorial',
    'dart programming',
    'flutter widgets',
    'flutter state management',
    'bloc',
    'riverpod',
    'provider',
    'flutter for beginners',
    'flutter developer certification',
    'flutter developer interview',
    'flutter developer resume',
    'cross platform development',
    'flutter developer technologies',
    'flutter developer tools',
    'flutter animations',
    'firebase flutter',
    'flutter ios android',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/flutter',
  },
  openGraph: {
    title: 'Flutter Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Flutter with our comprehensive 2026 roadmap. Dart, widgets, state management, and cross-platform development.',
    url: 'https://www.thetutorbridge.com/roadmap/flutter',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flutter Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flutter Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Flutter with our comprehensive 2026 roadmap. Dart, widgets & state management.',
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

export default function FlutterRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
