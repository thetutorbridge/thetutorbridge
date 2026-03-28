import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regex Tester - Test Regular Expressions Free Online',
  description: 'Free regex tester and debugger. Test regular expressions with real-time matching. Perfect for developers and pattern matching.',
  keywords: ['regex tester', 'regular expression', 'pattern matching'],
  openGraph: {
    title: 'Free Regex Tester',
    description: 'Test regular expressions.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/regex-tester',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regex Tester',
    description: 'Test regex patterns.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/regex-tester',
  },
};

export default function RegexTesterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
