import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Guides & Tools | The Tutor Bridge',
  description: 'Comprehensive sales guides including CRM software, sales automation tools, prospecting strategies, and tips to close more deals and grow revenue.',
  keywords: [
    'sales guides',
    'crm software',
    'sales tools',
    'sales automation',
    'prospecting tools',
    'sales resources'
  ],
  openGraph: {
    title: 'Sales Guides & Tools | The Tutor Bridge',
    description: 'Comprehensive sales guides to help you close more deals and grow revenue.',
    type: 'website',
    url: 'https://thetutorbridge.com/sales',
    siteName: 'The Tutor Bridge',
  },
  alternates: {
    canonical: 'https://thetutorbridge.com/sales'
  }
};

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
