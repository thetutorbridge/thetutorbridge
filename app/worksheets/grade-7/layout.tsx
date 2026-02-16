import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grade 7 Math Worksheets | Free Printable PDFs with Answer Keys',
  description: 'Download 92+ free Grade 7 math worksheets with answer keys. Pre-algebra, proportional relationships, geometry, statistics & probability. Step-by-step solutions included.',
  keywords: [
    'grade 7 math worksheets',
    '7th grade math worksheets',
    'grade 7 algebra worksheets',
    'grade 7 geometry worksheets',
    'grade 7 ratios worksheets',
    'grade 7 equations worksheets',
    'free math worksheets grade 7',
    'printable 7th grade worksheets'
  ],
  openGraph: {
    title: 'Grade 7 Math Worksheets | Free with Answer Keys',
    description: '92+ free printable Grade 7 math worksheets. Pre-algebra, ratios, geometry & statistics with step-by-step solutions.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/worksheets/grade-7'
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/worksheets/grade-7'
  }
};

export default function Grade7Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
