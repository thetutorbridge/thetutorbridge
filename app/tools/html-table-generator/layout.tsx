import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Table Generator - Create HTML Tables Free Online',
  description: 'Free HTML table generator. Create HTML tables with custom rows and columns. Perfect for web developers and content creators.',
  keywords: ['html table', 'table generator', 'html code'],
  openGraph: {
    title: 'Free HTML Table Generator',
    description: 'Generate HTML tables.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/html-table-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTML Table Generator',
    description: 'Create HTML tables.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/html-table-generator',
  },
};

export default function HtmlTableGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
