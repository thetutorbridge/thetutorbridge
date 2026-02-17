import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PostgreSQL DBA Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master PostgreSQL Database Administration with our comprehensive 2026 roadmap. Learn performance tuning, replication, backup, security, and high availability. Start your DBA career today!',
  keywords: [
    'postgresql dba roadmap',
    'postgresql dba roadmap 2026',
    'postgresql learning path',
    'postgresql administration',
    'postgres dba',
    'postgresql performance tuning',
    'postgresql replication',
    'postgresql backup',
    'postgresql security',
    'postgresql high availability',
    'postgresql clustering',
    'postgresql optimization',
    'postgresql indexing',
    'postgresql queries',
    'postgresql monitoring',
    'postgresql certification',
    'postgresql career',
    'postgresql jobs',
    'database administrator',
    'dba skills',
    'postgresql interview',
    'postgresql best practices',
    'postgresql vacuuming',
    'postgresql partitioning',
    'postgresql extensions',
    'postgresql recovery',
    'postgresql pgbouncer',
    'postgresql patroni',
    'postgresql for beginners',
    'postgresql enterprise'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/postgresql-dba',
  },
  openGraph: {
    title: 'PostgreSQL DBA Roadmap 2026 - Complete Learning Path',
    description: 'Master PostgreSQL Database Administration with our comprehensive 2026 roadmap. Learn performance tuning, replication, backup, security, and high availability.',
    url: 'https://www.thetutorbridge.com/roadmap/postgresql-dba',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PostgreSQL DBA Roadmap 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PostgreSQL DBA Roadmap 2026 - Complete Learning Path',
    description: 'Master PostgreSQL Database Administration with our comprehensive 2026 roadmap. Learn performance tuning, replication, backup, security, and high availability.',
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

export default function PostgreSQLDBALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
