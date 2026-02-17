import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Big Data Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master big data engineering with our comprehensive 2026 roadmap. Learn Apache Spark, Kafka, Hadoop, data lakes, ETL, and distributed systems. Start your big data career today!',
  keywords: [
    'big data engineer roadmap',
    'big data roadmap 2026',
    'big data learning path',
    'apache spark tutorial',
    'kafka tutorial',
    'hadoop developer',
    'data lake architecture',
    'etl pipeline',
    'distributed systems',
    'data engineering big data',
    'pyspark tutorial',
    'hive presto',
    'big data salary',
    'big data jobs',
    'big data interview',
    'databricks',
    'snowflake',
    'data warehouse',
    'batch processing',
    'stream processing',
    'flink tutorial',
    'airflow big data',
    'delta lake',
    'iceberg',
    'data mesh',
    'big data architecture',
    'big data tools',
    'big data projects',
    'big data certification',
    'big data career'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/big-data-engineer',
  },
  openGraph: {
    title: 'Big Data Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master big data engineering with our comprehensive 2026 roadmap. Learn Apache Spark, Kafka, Hadoop, and distributed systems.',
    url: 'https://www.thetutorbridge.com/roadmap/big-data-engineer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: 'https://www.thetutorbridge.com/og-image.png', width: 1200, height: 630, alt: 'Big Data Engineer Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big Data Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master big data engineering with our comprehensive 2026 roadmap. Learn Apache Spark, Kafka, Hadoop, and distributed systems.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function BigDataEngineerRoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
