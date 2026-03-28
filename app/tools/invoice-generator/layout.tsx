import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice Generator - Create Free Invoices Online',
  description: 'Free invoice generator. Create professional invoices instantly. Perfect for freelancers, small businesses, and contractors.',
  keywords: ['invoice generator', 'create invoice', 'free invoice'],
  openGraph: {
    title: 'Free Invoice Generator',
    description: 'Create professional invoices.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/invoice-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Invoice Generator',
    description: 'Generate invoices.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/invoice-generator',
  },
};

export default function InvoiceGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
