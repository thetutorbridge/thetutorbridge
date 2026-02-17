import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Site Reliability Engineer (SRE) Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master site reliability engineering with our comprehensive 2026 roadmap. Learn SLOs, observability, incident management, automation, and reliability practices. Start your SRE career today!',
  keywords: [
    'sre roadmap',
    'site reliability engineer roadmap',
    'sre roadmap 2026',
    'site reliability engineering',
    'sre learning path',
    'slo sli sla',
    'error budgets',
    'incident management',
    'observability',
    'monitoring alerting',
    'chaos engineering',
    'reliability engineering',
    'sre skills',
    'sre salary',
    'sre jobs',
    'sre interview',
    'google sre',
    'sre vs devops',
    'production engineering',
    'system reliability',
    'on-call management',
    'postmortem analysis',
    'toil reduction',
    'sre automation',
    'sre best practices',
    'sre certification',
    'sre tools',
    'infrastructure reliability',
    'service reliability',
    'platform engineering'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/sre',
  },
  openGraph: {
    title: 'Site Reliability Engineer (SRE) Roadmap 2026 - Complete Learning Path',
    description: 'Master site reliability engineering with our comprehensive 2026 roadmap. Learn SLOs, observability, incident management, and automation.',
    url: 'https://www.thetutorbridge.com/roadmap/sre',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: 'https://www.thetutorbridge.com/og-image.png', width: 1200, height: 630, alt: 'SRE Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Reliability Engineer (SRE) Roadmap 2026 - Complete Learning Path',
    description: 'Master site reliability engineering with our comprehensive 2026 roadmap. Learn SLOs, observability, incident management, and automation.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function SRERoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
