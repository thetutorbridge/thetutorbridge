import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AWS Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Amazon Web Services with our comprehensive 2026 roadmap. Learn EC2, S3, Lambda, IAM, VPC, RDS, CloudFormation & more. Step-by-step guide from beginner to AWS professional with certification paths and salary insights.',
  keywords: [
    'aws roadmap',
    'aws roadmap 2026',
    'how to learn aws',
    'aws learning path',
    'aws skills',
    'aws certification roadmap',
    'aws developer roadmap',
    'aws solutions architect',
    'aws career path',
    'aws guide',
    'aws salary',
    'aws jobs',
    'aws portfolio',
    'aws projects',
    'learn aws',
    'aws course',
    'aws tutorial',
    'ec2',
    's3',
    'lambda',
    'iam',
    'vpc',
    'rds',
    'cloudformation',
    'aws for beginners',
    'aws certification',
    'aws interview',
    'aws resume',
    'cloud computing',
    'aws technologies',
    'aws tools',
    'dynamodb',
    'cloudwatch',
    'route53',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/aws',
  },
  openGraph: {
    title: 'AWS Roadmap 2026 - Complete Learning Path',
    description: 'Master Amazon Web Services with our comprehensive 2026 roadmap. Step-by-step guide covering EC2, S3, Lambda, IAM, VPC, and cloud architecture.',
    url: 'https://www.thetutorbridge.com/roadmap/aws',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-aws-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'AWS Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AWS Roadmap 2026 - Complete Learning Path',
    description: 'Master Amazon Web Services with our comprehensive 2026 roadmap. EC2, S3, Lambda, IAM & cloud architecture.',
    images: ['https://www.thetutorbridge.com/og-aws-roadmap.png'],
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

export default function AWSRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
