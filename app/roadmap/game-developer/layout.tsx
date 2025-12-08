import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Game Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Game Development with our comprehensive 2026 roadmap. Learn game engines (Unity, Unreal), programming, graphics, physics, multiplayer, and publishing. Step-by-step guide from beginner to professional game developer with salary insights.',
  keywords: [
    'game developer roadmap',
    'game developer roadmap 2026',
    'how to become a game developer',
    'game developer learning path',
    'game developer skills',
    'unity roadmap',
    'unreal engine roadmap',
    'game developer career',
    'game developer guide',
    'game developer salary',
    'game developer jobs',
    'game developer portfolio',
    'game developer projects',
    'learn game development',
    'game developer course',
    'game developer tutorial',
    'unity',
    'unreal engine',
    'c# game development',
    'c++ game development',
    'game physics',
    'game graphics',
    'game for beginners',
    'game developer certification',
    'game developer interview',
    'game developer resume',
    'game design',
    'game developer technologies',
    'game developer tools',
    '3d game development',
    '2d game development',
    'multiplayer games',
    'mobile game development',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/game-developer',
  },
  openGraph: {
    title: 'Game Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Game Development with our comprehensive 2026 roadmap. Unity, Unreal Engine, graphics, physics, and multiplayer.',
    url: 'https://www.thetutorbridge.com/roadmap/game-developer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-game-developer-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Game Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Game Development with our comprehensive 2026 roadmap. Unity, Unreal & game design.',
    images: ['https://www.thetutorbridge.com/og-game-developer-roadmap.png'],
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

export default function GameDeveloperRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
