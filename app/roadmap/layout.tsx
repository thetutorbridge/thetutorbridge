import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Roadmaps 2026 - Complete Learning Paths | The Tutor Bridge',
  description: 'Explore comprehensive career roadmaps for software development, data science, DevOps, and more. Step-by-step guides with skills, salaries, and project ideas to launch your tech career.',
  keywords: [
    'career roadmap',
    'developer roadmap',
    'full stack developer roadmap',
    'frontend developer roadmap',
    'backend developer roadmap',
    'data scientist roadmap',
    'devops engineer roadmap',
    'software engineer career path',
    'tech career guide',
    'learning path',
    'skill development',
    'programming roadmap',
    'web developer guide',
    'tech career roadmap 2026',
  ],
  authors: [{ name: 'The Tutor Bridge' }],
  creator: 'The Tutor Bridge',
  publisher: 'The Tutor Bridge',
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap',
  },
  openGraph: {
    title: 'Career Roadmaps 2026 - Complete Learning Paths',
    description: 'Explore comprehensive career roadmaps for tech roles. Step-by-step guides with skills, salaries, and project ideas.',
    url: 'https://www.thetutorbridge.com/roadmap',
    siteName: 'The Tutor Bridge',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Roadmaps 2026 - Complete Learning Paths',
    description: 'Explore comprehensive career roadmaps for tech roles.',
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

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
