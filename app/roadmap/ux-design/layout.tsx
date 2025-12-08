import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UX Design Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master UX Design with our comprehensive 2026 roadmap. Learn user research, wireframing, prototyping, usability testing, design systems, and industry tools. Step-by-step guide from beginner to professional UX designer with salary insights.',
  keywords: [
    'ux design roadmap',
    'ux design roadmap 2026',
    'how to become a ux designer',
    'ux designer learning path',
    'ux designer skills',
    'figma roadmap',
    'user experience roadmap',
    'ux designer career',
    'ux designer guide',
    'ux designer salary',
    'ux designer jobs',
    'ux designer portfolio',
    'ux designer projects',
    'learn ux design',
    'ux designer course',
    'ux designer tutorial',
    'figma',
    'sketch',
    'adobe xd',
    'user research',
    'wireframing',
    'prototyping',
    'ux for beginners',
    'ux designer certification',
    'ux designer interview',
    'ux designer resume',
    'usability testing',
    'ux designer technologies',
    'ux designer tools',
    'design systems',
    'information architecture',
    'interaction design',
    'ui ux design',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/ux-design',
  },
  openGraph: {
    title: 'UX Design Roadmap 2026 - Complete Learning Path',
    description: 'Master UX Design with our comprehensive 2026 roadmap. User research, prototyping, design systems, and Figma.',
    url: 'https://www.thetutorbridge.com/roadmap/ux-design',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-ux-design-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'UX Design Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UX Design Roadmap 2026 - Complete Learning Path',
    description: 'Master UX Design with our comprehensive 2026 roadmap. Research, prototyping & design systems.',
    images: ['https://www.thetutorbridge.com/og-ux-design-roadmap.png'],
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

export default function UXDesignRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
