import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Math & Science Worksheets for Grades 6-12 | With Answer Keys',
  description: 'Download 500+ free printable worksheets for grades 6-12. Math, Science, English worksheets with answer keys, step-by-step solutions, and online practice. No signup required.',
  keywords: [
    'free math worksheets',
    'printable worksheets',
    'worksheets with answers',
    'grade 6 worksheets',
    'grade 7 worksheets',
    'grade 8 worksheets',
    'algebra worksheets',
    'geometry worksheets',
    'science worksheets',
    'practice problems',
    'homework help worksheets'
  ],
  openGraph: {
    title: 'Free Math & Science Worksheets for Grades 6-12 | The Tutor Bridge',
    description: 'Download 500+ free printable worksheets with answer keys. Math, Science, English for grades 6-12. Step-by-step solutions included.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/worksheets',
    images: [
      {
        url: '/og-worksheets.png',
        width: 1200,
        height: 630,
        alt: 'Free Worksheets for Grades 6-12'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Math & Science Worksheets | Grades 6-12',
    description: '500+ free printable worksheets with answer keys. No signup required.'
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/worksheets'
  }
};

export default function WorksheetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
