import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Android Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Android Development with our comprehensive 2026 roadmap. Learn Kotlin, Jetpack Compose, Android SDK, architecture patterns, testing & more. Step-by-step guide from beginner to professional Android developer with salary insights.',
  keywords: [
    'android developer roadmap',
    'android developer roadmap 2026',
    'how to become android developer',
    'android developer learning path',
    'android developer skills',
    'kotlin roadmap',
    'jetpack compose roadmap',
    'android developer career',
    'android developer guide',
    'android developer salary',
    'android developer jobs',
    'android developer portfolio',
    'android developer projects',
    'learn android development',
    'android developer course',
    'android developer tutorial',
    'kotlin',
    'jetpack compose',
    'android sdk',
    'mvvm android',
    'room database',
    'retrofit',
    'android for beginners',
    'android developer certification',
    'android developer interview',
    'android developer resume',
    'coroutines',
    'android developer technologies',
    'android developer tools',
    'android studio',
    'google play store',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/android',
  },
  openGraph: {
    title: 'Android Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Android Development with our comprehensive 2026 roadmap. Kotlin, Jetpack Compose, architecture patterns, and app deployment.',
    url: 'https://www.thetutorbridge.com/roadmap/android',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Android Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Android Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Android Development with our comprehensive 2026 roadmap. Kotlin, Jetpack Compose & architecture.',
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

export default function AndroidRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
