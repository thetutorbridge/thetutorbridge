import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown Table Generator - Create Markdown Tables Free',
  description: 'Free markdown table generator. Create markdown tables with custom rows and columns. Perfect for GitHub, documentation, and README files.',
  keywords: ['markdown table', 'table generator', 'markdown'],
  openGraph: {
    title: 'Free Markdown Table Generator',
    description: 'Generate markdown tables.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/markdown-table-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Table Generator',
    description: 'Create markdown tables.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/markdown-table-generator',
  },
};

export default function MarkdownTableGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
