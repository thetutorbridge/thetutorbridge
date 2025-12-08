import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iOS Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master iOS Development with our comprehensive 2026 roadmap. Learn Swift, SwiftUI, UIKit, Core Data, networking, and App Store deployment. Step-by-step guide from beginner to professional iOS developer with salary insights.',
  keywords: [
    'ios developer roadmap',
    'ios developer roadmap 2026',
    'how to become an ios developer',
    'ios developer learning path',
    'ios developer skills',
    'swift roadmap',
    'swiftui roadmap',
    'ios developer career',
    'ios developer guide',
    'ios developer salary',
    'ios developer jobs',
    'ios developer portfolio',
    'ios developer projects',
    'learn ios development',
    'ios developer course',
    'ios developer tutorial',
    'swift programming',
    'swiftui',
    'uikit',
    'xcode',
    'core data',
    'combine',
    'ios for beginners',
    'ios developer certification',
    'ios developer interview',
    'ios developer resume',
    'app store',
    'ios developer technologies',
    'ios developer tools',
    'cocoapods',
    'swift package manager',
    'apple developer',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/ios',
  },
  openGraph: {
    title: 'iOS Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master iOS Development with our comprehensive 2026 roadmap. Swift, SwiftUI, UIKit, and App Store deployment.',
    url: 'https://www.thetutorbridge.com/roadmap/ios',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-ios-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'iOS Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iOS Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master iOS Development with our comprehensive 2026 roadmap. Swift, SwiftUI & App Store.',
    images: ['https://www.thetutorbridge.com/og-ios-roadmap.png'],
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

export default function IOSRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
