import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full Stack Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master full stack development with our comprehensive 2026 roadmap. Learn HTML, CSS, JavaScript, React, Node.js, databases, DevOps & more. Step-by-step guide from beginner to professional full stack developer with salary insights, project ideas, and career paths.',
  keywords: [
    'full stack developer roadmap',
    'full stack developer roadmap 2026',
    'how to become a full stack developer',
    'full stack developer learning path',
    'full stack developer skills',
    'MERN stack roadmap',
    'MEAN stack roadmap',
    'full stack developer career path',
    'web developer roadmap',
    'full stack developer guide',
    'frontend and backend developer',
    'full stack developer salary',
    'full stack developer jobs',
    'full stack developer portfolio',
    'full stack developer projects',
    'learn full stack development',
    'full stack developer course',
    'full stack developer tutorial',
    'javascript full stack',
    'react node developer',
    'full stack web development',
    'full stack developer for beginners',
    'full stack developer certification',
    'full stack developer interview',
    'full stack developer resume',
    'full stack developer vs software engineer',
    'full stack developer technologies',
    'full stack developer tools',
    'full stack developer frameworks',
    'full stack developer database',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/full-stack-developer',
  },
  openGraph: {
    title: 'Full Stack Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master full stack development with our comprehensive 2026 roadmap. Step-by-step guide covering frontend, backend, databases, DevOps, and career guidance.',
    url: 'https://www.thetutorbridge.com/roadmap/full-stack-developer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-full-stack-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Full Stack Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full Stack Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master full stack development with our comprehensive 2026 roadmap. Frontend, backend, databases, DevOps & career guidance.',
    images: ['https://www.thetutorbridge.com/og-full-stack-roadmap.png'],
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

export default function FullStackDeveloperRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
