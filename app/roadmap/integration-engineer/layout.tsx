import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integration Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master integration engineering with our comprehensive 2026 roadmap. Learn APIs, MuleSoft, middleware, ESB, iPaaS, and enterprise integration patterns. Start your integration career today!',
  keywords: [
    'integration engineer roadmap',
    'integration engineer roadmap 2026',
    'integration developer',
    'api integration',
    'mulesoft tutorial',
    'enterprise integration',
    'middleware developer',
    'esb developer',
    'ipaas',
    'enterprise integration patterns',
    'api gateway',
    'microservices integration',
    'soa architect',
    'integration platform',
    'integration engineer salary',
    'integration engineer jobs',
    'dell boomi',
    'workato',
    'zapier developer',
    'rest api integration',
    'soap web services',
    'message queues',
    'event driven integration',
    'b2b integration',
    'edi integration',
    'integration testing',
    'api management',
    'integration architect',
    'integration patterns',
    'system integration'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/integration-engineer',
  },
  openGraph: {
    title: 'Integration Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master integration engineering with our comprehensive 2026 roadmap. Learn APIs, MuleSoft, middleware, and enterprise integration patterns.',
    url: 'https://www.thetutorbridge.com/roadmap/integration-engineer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: 'https://www.thetutorbridge.com/og-image.png', width: 1200, height: 630, alt: 'Integration Engineer Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integration Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master integration engineering with our comprehensive 2026 roadmap. Learn APIs, MuleSoft, middleware, and enterprise integration patterns.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function IntegrationEngineerRoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
