import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile App Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master mobile app development with our comprehensive 2026 roadmap. Learn Flutter, React Native, native iOS/Android, cross-platform frameworks, and app deployment. Start your mobile development career today!',
  keywords: [
    'mobile app developer roadmap',
    'mobile app developer roadmap 2026',
    'mobile development learning path',
    'cross-platform app development',
    'flutter vs react native',
    'mobile developer skills',
    'ios android development',
    'kotlin multiplatform',
    'mobile app frameworks',
    'app store deployment',
    'mobile ui design',
    'mobile app testing',
    'mobile developer career',
    'mobile developer salary',
    'mobile developer jobs',
    'app development tutorial',
    'mobile programming',
    'native app development',
    'hybrid app development',
    'mobile app architecture',
    'mobile state management',
    'mobile app performance',
    'mobile developer portfolio',
    'mobile app security',
    'mobile developer certification',
    'mobile developer interview',
    'mobile app monetization',
    'pwa development',
    'mobile backend',
    'mobile app deployment'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/mobile-developer',
  },
  openGraph: {
    title: 'Mobile App Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master mobile app development with our comprehensive 2026 roadmap. Learn Flutter, React Native, native iOS/Android, and cross-platform frameworks.',
    url: 'https://www.thetutorbridge.com/roadmap/mobile-developer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mobile App Developer Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile App Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master mobile app development with our comprehensive 2026 roadmap. Learn Flutter, React Native, native iOS/Android, and cross-platform frameworks.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function MobileDeveloperRoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
