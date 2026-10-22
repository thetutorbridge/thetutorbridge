import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'California Online Learning Statistics 2025: 100+ Facts & Data',
  description: 'Comprehensive California online learning and education statistics. K-12 enrollment (5.8M students), CAASPP test scores, CAVA virtual schools, community college online learning, chronic absenteeism, and teacher shortage data with cited sources.',
  keywords: [
    // Primary keywords
    'California online learning statistics',
    'California education statistics',
    'California school statistics 2025',
    'California K-12 statistics',
    'California virtual school statistics',

    // Enrollment & Demographics
    'California student enrollment',
    'California public school enrollment',
    'LAUSD enrollment statistics',
    'California school demographics',
    'California student population',

    // Test Scores
    'California CAASPP scores',
    'California test scores 2024',
    'California math proficiency',
    'California reading proficiency',
    'California achievement gap',

    // Virtual Schools
    'California Virtual Academy statistics',
    'CAVA enrollment',
    'California online school enrollment',
    'California distance learning statistics',

    // Community College
    'California community college online',
    'California community college enrollment',
    'CCC online learning statistics',

    // Issues
    'California teacher shortage',
    'California chronic absenteeism',
    'California learning loss',
    'California COVID education recovery',

    // Spending
    'California education spending',
    'California per pupil spending',
    'California education budget',

    // Tutoring
    'California tutoring statistics',
    'California tutoring market',

    // Homeschool
    'California homeschool statistics',
    'California homeschool enrollment',

    // EdTech
    'California EdTech companies',
    'Silicon Valley education technology',

    // Districts
    'Los Angeles Unified statistics',
    'San Diego Unified statistics',
    'California largest school districts'
  ],
  openGraph: {
    title: 'California Online Learning Statistics 2025: 100+ Facts & Data',
    description: 'The most comprehensive collection of California education and online learning statistics. K-12 enrollment, test scores, virtual schools, and more from 30+ authoritative sources.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/statistics/online-learning/usa/california',
    siteName: 'The Tutor Bridge',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-california-stats.png',
        width: 1200,
        height: 630,
        alt: 'California Online Learning Statistics 2025'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'California Online Learning Statistics 2025: 100+ Facts',
    description: 'Comprehensive California education statistics with cited sources. K-12 enrollment, test scores, virtual schools & more.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/statistics/online-learning/usa/california'
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
    'article:tag': 'California, Education Statistics, Online Learning, K-12, Virtual Schools'
  }
};

export default function CaliforniaStatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
