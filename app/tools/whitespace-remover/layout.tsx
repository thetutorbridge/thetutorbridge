import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Whitespace Remover - Free Online Tool',
  description: 'Free whitespace-remover. Remove extra whitespace. Perfect for developers and text processing.',
  keywords: ['whitespace-remover', 'Whitespace Remover'],
  openGraph: { title: 'Whitespace Remover', description: 'Remove extra whitespace', type: 'website', url: 'https://www.thetutorbridge.com/tools/whitespace-remover' },
  twitter: { card: 'summary_large_image', title: 'Whitespace Remover', description: 'Remove extra whitespace' },
  alternates: { canonical: 'https://www.thetutorbridge.com/tools/whitespace-remover' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
