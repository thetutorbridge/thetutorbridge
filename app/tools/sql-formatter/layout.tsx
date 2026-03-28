import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL Formatter - Format SQL Queries Free Online',
  description: 'Free SQL formatter. Format and beautify SQL queries for better readability. Perfect for database developers and SQL learners.',
  keywords: ['sql formatter', 'format sql', 'sql beautifier'],
  openGraph: {
    title: 'Free SQL Formatter',
    description: 'Format SQL queries.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/sql-formatter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SQL Formatter',
    description: 'Format SQL.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/sql-formatter',
  },
};

export default function SqlFormatterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
