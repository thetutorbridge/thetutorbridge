import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grade 8 Math Worksheets | Free Printable PDFs with Answer Keys',
  description: 'Download 98+ free Grade 8 math worksheets with answer keys. Linear equations, functions, Pythagorean theorem, transformations & more. Step-by-step solutions included.',
  keywords: [
    'grade 8 math worksheets',
    '8th grade math worksheets',
    'grade 8 algebra worksheets',
    'grade 8 linear equations',
    'pythagorean theorem worksheets',
    'grade 8 functions worksheets',
    'free math worksheets grade 8',
    'printable 8th grade worksheets',
    'pre-algebra worksheets'
  ],
  openGraph: {
    title: 'Grade 8 Math Worksheets | Free with Answer Keys',
    description: '98+ free printable Grade 8 math worksheets. Linear equations, functions, geometry & more with step-by-step solutions.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/worksheets/grade-8'
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/worksheets/grade-8'
  }
};

export default function Grade8Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
