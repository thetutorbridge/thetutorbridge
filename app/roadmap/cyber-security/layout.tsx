import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cyber Security Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master cyber security with our comprehensive 2026 roadmap. Learn networking, penetration testing, ethical hacking, security tools, and certifications. Step-by-step guide to becoming a cyber security professional.',
  keywords: [
    'cyber security roadmap',
    'cyber security roadmap 2026',
    'how to become a cyber security engineer',
    'cyber security learning path',
    'cyber security skills',
    'ethical hacking',
    'penetration testing',
    'network security',
    'cyber security certifications',
    'comptia security+',
    'cissp',
    'ceh certified ethical hacker',
    'cyber security salary',
    'cyber security jobs',
    'information security',
    'cyber security for beginners',
    'cyber security course',
    'cyber security tutorial',
    'kali linux',
    'nmap tutorial',
    'cyber security analyst',
    'security operations',
    'soc analyst',
    'vulnerability assessment',
    'incident response',
    'malware analysis',
    'cyber security career',
    'hackthebox',
    'tryhackme',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/cyber-security',
  },
  openGraph: {
    title: 'Cyber Security Roadmap 2026 - Complete Learning Path',
    description: 'Master cyber security with networking, penetration testing, and certifications. Your complete guide to becoming a security professional.',
    url: 'https://www.thetutorbridge.com/roadmap/cyber-security',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cyber Security Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Security Roadmap 2026 - Complete Learning Path',
    description: 'Master cyber security with networking, penetration testing, and certifications.',
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

export default function CyberSecurityRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
