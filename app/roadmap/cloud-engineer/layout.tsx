import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cloud Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master cloud computing with our comprehensive 2026 roadmap. Learn AWS, Azure, GCP, cloud architecture, infrastructure as code, containerization, and DevOps practices. Start your cloud engineering career today!',
  keywords: [
    'cloud engineer roadmap',
    'cloud engineer roadmap 2026',
    'cloud computing learning path',
    'aws certification path',
    'azure certification roadmap',
    'gcp learning path',
    'cloud architect skills',
    'infrastructure as code',
    'terraform tutorial',
    'kubernetes cloud',
    'cloud security',
    'cloud networking',
    'serverless computing',
    'cloud migration',
    'multi-cloud strategy',
    'cloud engineer salary',
    'cloud engineer jobs',
    'cloud solutions architect',
    'aws solutions architect',
    'azure administrator',
    'gcp professional',
    'cloud devops',
    'cloud automation',
    'cloud monitoring',
    'cloud cost optimization',
    'finops',
    'cloud native',
    'microservices cloud',
    'cloud engineer interview',
    'cloud engineer certification'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/cloud-engineer',
  },
  openGraph: {
    title: 'Cloud Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master cloud computing with our comprehensive 2026 roadmap. Learn AWS, Azure, GCP, cloud architecture, and infrastructure as code.',
    url: 'https://www.thetutorbridge.com/roadmap/cloud-engineer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Cloud Engineer Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloud Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master cloud computing with our comprehensive 2026 roadmap. Learn AWS, Azure, GCP, cloud architecture, and infrastructure as code.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function CloudEngineerRoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
