import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master frontend development with our comprehensive 2026 roadmap. Learn HTML, CSS, JavaScript, React, TypeScript, testing & more. Step-by-step guide from beginner to professional frontend developer with salary insights and project ideas.',
  keywords: [
    'frontend developer roadmap',
    'frontend developer roadmap 2026',
    'how to become a frontend developer',
    'frontend developer learning path',
    'frontend developer skills',
    'react developer roadmap',
    'javascript developer roadmap',
    'frontend developer career path',
    'web developer roadmap',
    'frontend developer guide',
    'UI developer roadmap',
    'frontend developer salary',
    'frontend developer jobs',
    'frontend developer portfolio',
    'frontend developer projects',
    'learn frontend development',
    'frontend developer course',
    'frontend developer tutorial',
    'html css javascript',
    'react developer',
    'frontend web development',
    'frontend developer for beginners',
    'frontend developer certification',
    'frontend developer interview',
    'frontend developer resume',
    'frontend developer vs backend developer',
    'frontend developer technologies',
    'frontend developer tools',
    'frontend developer frameworks',
    'vue developer roadmap',
    'angular developer roadmap',
    'typescript developer',
    'tailwind css developer',
    'next.js developer',
    'responsive web design',
    'web accessibility',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/frontend-developer',
  },
  openGraph: {
    title: 'Frontend Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master frontend development with our comprehensive 2026 roadmap. Step-by-step guide covering HTML, CSS, JavaScript, React, testing, and modern tooling.',
    url: 'https://www.thetutorbridge.com/roadmap/frontend-developer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-frontend-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Frontend Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master frontend development with our comprehensive 2026 roadmap. HTML, CSS, JavaScript, React & modern tooling.',
    images: ['https://www.thetutorbridge.com/og-frontend-roadmap.png'],
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

export default function FrontendDeveloperRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
