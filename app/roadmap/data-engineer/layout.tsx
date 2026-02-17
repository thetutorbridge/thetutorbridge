import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master data engineering with our comprehensive 2026 roadmap. Learn SQL, Python, ETL pipelines, data warehousing, Spark, Airflow, and cloud platforms. Step-by-step guide to becoming a data engineer.',
  keywords: [
    'data engineer roadmap',
    'data engineer roadmap 2026',
    'how to become a data engineer',
    'data engineering learning path',
    'data engineering skills',
    'etl pipeline',
    'data warehouse',
    'apache spark',
    'apache airflow',
    'data engineering tutorial',
    'data engineering for beginners',
    'data engineering course',
    'data engineering salary',
    'data engineering jobs',
    'sql for data engineers',
    'python for data engineers',
    'big data',
    'data lake',
    'snowflake',
    'databricks',
    'aws data engineering',
    'data pipeline',
    'kafka',
    'dbt',
    'data modeling',
    'data engineering interview',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/data-engineer',
  },
  openGraph: {
    title: 'Data Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master data engineering with SQL, Python, Spark, and cloud platforms. Your complete guide to becoming a data engineer.',
    url: 'https://www.thetutorbridge.com/roadmap/data-engineer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Data Engineer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master data engineering with SQL, Python, Spark, and cloud platforms.',
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

export default function DataEngineerRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
