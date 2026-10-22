import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Learning Statistics USA 2025: 100+ Facts & Data',
  description: 'Comprehensive online learning and tutoring statistics for the United States. Market size ($4.3B), demographics, effectiveness data, K-12 trends, COVID impact, and state-by-state analysis with cited sources.',
  keywords: [
    // Primary keywords journalists search
    'online learning statistics',
    'online tutoring statistics',
    'online education statistics USA',
    'e-learning statistics 2025',
    'online learning market size',
    'tutoring industry statistics',
    'online tutoring market USA',

    // Demographics keywords
    'who uses online tutoring',
    'online learning demographics',
    'tutoring usage by income',
    'student tutoring statistics',

    // Effectiveness keywords
    'online tutoring effectiveness',
    'is online tutoring effective',
    'online vs in-person tutoring',
    'tutoring academic outcomes',

    // K-12 specific
    'K-12 online learning statistics',
    'virtual school statistics',
    'remote learning statistics',
    'edtech statistics',

    // COVID related
    'COVID learning loss statistics',
    'pandemic education impact',
    'post-pandemic online learning',

    // Cost related
    'tutoring cost statistics',
    'how much parents spend on tutoring',
    'average tutoring rates',

    // Market/Industry
    'tutoring market size USA',
    'online education industry statistics',
    'edtech market statistics',
    'AI tutoring statistics',

    // State specific
    'Florida virtual school statistics',
    'online learning by state',

    // Long-tail journalist queries
    'percentage of students using online tutoring',
    'online tutoring growth rate',
    'tutoring industry revenue'
  ],
  openGraph: {
    title: 'Online Learning Statistics USA 2025: 100+ Facts & Data',
    description: 'The most comprehensive collection of online learning and tutoring statistics for the United States. Cited from 40+ authoritative sources.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/statistics/online-learning/usa',
    siteName: 'The Tutor Bridge',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-online-learning-stats.png',
        width: 1200,
        height: 630,
        alt: 'Online Learning Statistics USA 2025'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Learning Statistics USA 2025: 100+ Facts',
    description: 'Comprehensive online tutoring & e-learning statistics with cited sources. Market size, demographics, effectiveness data & more.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/statistics/online-learning/usa'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  other: {
    'article:published_time': '2025-01-15',
    'article:modified_time': new Date().toISOString().split('T')[0],
    'article:section': 'Education Statistics',
    'article:tag': 'Online Learning, Tutoring, Education Statistics, E-Learning, EdTech'
  }
};

export default function OnlineLearningUSALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
