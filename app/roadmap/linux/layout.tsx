import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linux Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Linux with our comprehensive 2026 roadmap. Learn command line, shell scripting, system administration, networking, security, and DevOps. Start your Linux journey today!',
  keywords: [
    'linux roadmap',
    'linux roadmap 2026',
    'linux learning path',
    'linux command line',
    'bash scripting',
    'linux administration',
    'linux sysadmin',
    'linux server',
    'ubuntu tutorial',
    'centos',
    'linux networking',
    'linux security',
    'linux file system',
    'linux permissions',
    'linux shell',
    'linux commands',
    'linux for beginners',
    'linux certification',
    'rhcsa',
    'lpic',
    'linux career',
    'linux jobs',
    'linux devops',
    'linux cloud',
    'linux server administration',
    'linux troubleshooting',
    'linux kernel',
    'linux boot process',
    'systemd',
    'linux skills'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/linux',
  },
  openGraph: {
    title: 'Linux Roadmap 2026 - Complete Learning Path',
    description: 'Master Linux with our comprehensive 2026 roadmap. Learn command line, shell scripting, system administration, networking, security, and DevOps.',
    url: 'https://www.thetutorbridge.com/roadmap/linux',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Linux Roadmap 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linux Roadmap 2026 - Complete Learning Path',
    description: 'Master Linux with our comprehensive 2026 roadmap. Learn command line, shell scripting, system administration, networking, security, and DevOps.',
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

export default function LinuxRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
