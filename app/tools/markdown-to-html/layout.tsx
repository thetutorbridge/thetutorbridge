import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter - Convert MD to HTML Free',
  description: 'Free Markdown to HTML converter. Convert Markdown syntax to HTML code instantly. Perfect for developers, bloggers, and content creators.',
  keywords: [
    'markdown to html',
    'md to html',
    'markdown converter',
    'convert markdown',
  ],
  openGraph: {
    title: 'Free Markdown to HTML Converter',
    description: 'Convert Markdown to HTML.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/markdown-to-html',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Markdown to HTML',
    description: 'Convert Markdown.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/markdown-to-html',
  },
};

export default function MarkdownToHtmlLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
