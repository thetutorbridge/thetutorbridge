import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React Native Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master React Native with our comprehensive 2026 roadmap. Learn JavaScript, React, native modules, navigation, state management, and app deployment. Step-by-step guide from beginner to professional React Native developer with salary insights.',
  keywords: [
    'react native roadmap',
    'react native roadmap 2026',
    'how to become a react native developer',
    'react native learning path',
    'react native skills',
    'mobile development roadmap',
    'react native career',
    'react native guide',
    'react native salary',
    'react native jobs',
    'react native portfolio',
    'react native projects',
    'learn react native',
    'react native course',
    'react native tutorial',
    'javascript mobile',
    'expo',
    'react navigation',
    'redux',
    'native modules',
    'cross platform',
    'react native for beginners',
    'react native certification',
    'react native interview',
    'react native resume',
    'app development',
    'react native technologies',
    'react native tools',
    'typescript react native',
    'firebase react native',
    'mobile app development',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/react-native',
  },
  openGraph: {
    title: 'React Native Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master React Native with our comprehensive 2026 roadmap. Cross-platform mobile development with JavaScript.',
    url: 'https://www.thetutorbridge.com/roadmap/react-native',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-react-native-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'React Native Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Native Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master React Native with our comprehensive 2026 roadmap. Cross-platform mobile apps.',
    images: ['https://www.thetutorbridge.com/og-react-native-roadmap.png'],
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

export default function ReactNativeRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
