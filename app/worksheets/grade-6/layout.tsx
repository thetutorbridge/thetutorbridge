import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grade 6 Math Worksheets | Free Printable PDFs with Answer Keys',
  description: 'Download 85+ free Grade 6 math worksheets with answer keys. Fractions, decimals, ratios, basic algebra, geometry & more. Step-by-step solutions included.',
  keywords: [
    'grade 6 math worksheets',
    '6th grade math worksheets',
    'grade 6 fractions worksheets',
    'grade 6 decimals worksheets',
    'grade 6 algebra worksheets',
    'grade 6 geometry worksheets',
    'free math worksheets grade 6',
    'printable 6th grade worksheets'
  ],
  openGraph: {
    title: 'Grade 6 Math Worksheets | Free with Answer Keys',
    description: '85+ free printable Grade 6 math worksheets. Fractions, decimals, ratios, algebra & geometry with step-by-step solutions.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/worksheets/grade-6'
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/worksheets/grade-6'
  }
};

export default function Grade6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
