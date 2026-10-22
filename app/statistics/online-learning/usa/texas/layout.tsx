import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Texas Online Learning Statistics 2025: 100+ Facts & Data',
  description: 'Comprehensive Texas education and online learning statistics. K-12 enrollment (5.5M students), STAAR test scores, virtual school growth (1,200% in 10 years), teacher shortage data, and chronic absenteeism rates with cited sources.',
  keywords: [
    // Primary keywords
    'Texas online learning statistics',
    'Texas education statistics',
    'Texas school statistics 2025',
    'Texas K-12 statistics',
    'Texas virtual school statistics',

    // Enrollment & Demographics
    'Texas student enrollment',
    'Texas public school enrollment',
    'Texas school demographics',
    'Texas student population',
    'Houston ISD enrollment',

    // Test Scores
    'Texas STAAR scores',
    'Texas STAAR results 2024',
    'Texas math proficiency',
    'Texas reading proficiency',
    'Texas achievement gap',

    // Virtual Schools
    'Texas Virtual School Network',
    'TXVSN enrollment',
    'Texas online school enrollment',
    'Texas distance learning statistics',

    // Teacher Shortage
    'Texas teacher shortage',
    'Texas uncertified teachers',
    'Texas teacher vacancies',
    'Texas teacher attrition',

    // Issues
    'Texas chronic absenteeism',
    'Texas learning loss',
    'Texas COVID education recovery',

    // Spending
    'Texas education spending',
    'Texas per pupil spending',
    'Texas education budget',

    // Homeschool
    'Texas homeschool statistics',
    'Texas homeschool enrollment',

    // Districts
    'Houston ISD statistics',
    'Dallas ISD statistics',
    'Texas largest school districts'
  ],
  openGraph: {
    title: 'Texas Online Learning Statistics 2025: 100+ Facts & Data',
    description: 'The most comprehensive collection of Texas education and online learning statistics. K-12 enrollment, STAAR scores, virtual schools, and more from 20+ authoritative sources.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/statistics/online-learning/usa/texas',
    siteName: 'The Tutor Bridge',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-texas-stats.png',
        width: 1200,
        height: 630,
        alt: 'Texas Online Learning Statistics 2025'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Online Learning Statistics 2025: 100+ Facts',
    description: 'Comprehensive Texas education statistics with cited sources. K-12 enrollment, STAAR scores, virtual schools & more.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/statistics/online-learning/usa/texas'
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
    'article:published_time': '2025-01-20',
    'article:modified_time': new Date().toISOString().split('T')[0],
    'article:section': 'Education Statistics',
    'article:tag': 'Texas, Education Statistics, Online Learning, K-12, Virtual Schools, STAAR'
  }
};

export default function TexasStatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
