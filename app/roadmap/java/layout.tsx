import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Java Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Java development with our comprehensive 2026 roadmap. Learn core Java, OOP, Spring Boot, databases, testing & more. Step-by-step guide from beginner to professional Java developer with salary insights and project ideas.',
  keywords: [
    'java developer roadmap',
    'java developer roadmap 2026',
    'how to become a java developer',
    'java developer learning path',
    'java developer skills',
    'spring boot roadmap',
    'java backend developer roadmap',
    'java developer career path',
    'java developer guide',
    'java developer salary',
    'java developer jobs',
    'java developer portfolio',
    'java developer projects',
    'learn java programming',
    'java developer course',
    'java developer tutorial',
    'core java',
    'java oop',
    'java collections',
    'java multithreading',
    'spring framework',
    'hibernate',
    'java for beginners',
    'java developer certification',
    'java developer interview',
    'java developer resume',
    'java vs python',
    'java developer technologies',
    'java developer tools',
    'maven gradle',
    'jvm',
    'java microservices',
    'java rest api',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/java',
  },
  openGraph: {
    title: 'Java Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Java development with our comprehensive 2026 roadmap. Step-by-step guide covering core Java, OOP, Spring Boot, databases, and testing.',
    url: 'https://www.thetutorbridge.com/roadmap/java',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-java-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Java Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Java Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Java development with our comprehensive 2026 roadmap. Core Java, OOP, Spring Boot & databases.',
    images: ['https://www.thetutorbridge.com/og-java-roadmap.png'],
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

export default function JavaRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
