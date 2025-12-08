import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevOps Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master DevOps with our comprehensive 2026 roadmap. Learn Linux, Docker, Kubernetes, CI/CD, AWS, Terraform, and more. Step-by-step guide to becoming a professional DevOps engineer.',
  keywords: [
    'devops roadmap',
    'devops roadmap 2026',
    'how to become a devops engineer',
    'devops learning path',
    'devops skills',
    'docker tutorial',
    'kubernetes tutorial',
    'ci cd pipeline',
    'jenkins tutorial',
    'terraform tutorial',
    'aws devops',
    'devops salary',
    'devops jobs',
    'devops engineer',
    'devops for beginners',
    'devops course',
    'devops certification',
    'linux for devops',
    'ansible tutorial',
    'github actions',
    'gitlab ci',
    'cloud computing',
    'infrastructure as code',
    'site reliability engineer',
    'sre',
    'devops tools',
    'devops career',
    'devops interview',
    'prometheus grafana',
    'monitoring and logging',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/devops',
  },
  openGraph: {
    title: 'DevOps Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master DevOps with Docker, Kubernetes, CI/CD, AWS, and Terraform. Your complete guide to becoming a DevOps engineer.',
    url: 'https://www.thetutorbridge.com/roadmap/devops',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-devops-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'DevOps Engineer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOps Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master DevOps with Docker, Kubernetes, CI/CD, AWS, and Terraform.',
    images: ['https://www.thetutorbridge.com/og-devops-roadmap.png'],
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

export default function DevOpsRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
