import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'C++ Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master C++ with our comprehensive 2026 roadmap. Learn fundamentals, OOP, STL, memory management, modern C++, and system programming. Step-by-step guide from beginner to professional C++ developer with salary insights.',
  keywords: [
    'c++ developer roadmap',
    'c++ developer roadmap 2026',
    'how to become a c++ developer',
    'c++ developer learning path',
    'c++ developer skills',
    'cpp roadmap',
    'c++ developer career',
    'c++ developer guide',
    'c++ developer salary',
    'c++ developer jobs',
    'c++ developer portfolio',
    'c++ developer projects',
    'learn c++',
    'c++ developer course',
    'c++ developer tutorial',
    'c++ programming',
    'stl',
    'modern c++',
    'c++20',
    'c++23',
    'memory management',
    'c++ for beginners',
    'c++ developer certification',
    'c++ developer interview',
    'c++ developer resume',
    'system programming',
    'c++ developer technologies',
    'c++ developer tools',
    'pointers',
    'templates',
    'game development c++',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/cpp',
  },
  openGraph: {
    title: 'C++ Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master C++ with our comprehensive 2026 roadmap. Modern C++, STL, memory management, and system programming.',
    url: 'https://www.thetutorbridge.com/roadmap/cpp',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'C++ Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C++ Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master C++ with our comprehensive 2026 roadmap. Modern C++, STL & system programming.',
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

export default function CppRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
