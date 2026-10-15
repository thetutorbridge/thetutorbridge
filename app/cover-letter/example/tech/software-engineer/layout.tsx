import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Engineer Cover Letter Example (2026) | Free Template',
  description: 'Professional Software Engineer cover letter example with free template. Learn how to write an SWE cover letter that highlights your technical skills, coding expertise, and impactful projects.',
  keywords: [
    'software engineer cover letter',
    'software engineer cover letter example',
    'SWE cover letter sample',
    'software engineer application',
    'developer cover letter',
    'coding cover letter',
    'tech cover letter example',
    'junior software engineer cover letter',
    'senior software engineer cover letter',
    'FAANG cover letter',
    'Google software engineer cover letter',
    'Amazon software engineer cover letter',
    'Microsoft software engineer cover letter',
    'Meta software engineer cover letter'
  ],
  openGraph: {
    title: 'Software Engineer Cover Letter Example (2026)',
    description: 'Professional SWE cover letter template with expert tips. Stand out in your software engineer job application with this proven example.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/cover-letter/example/tech/software-engineer',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Engineer Cover Letter Example',
    description: 'Professional SWE cover letter template with expert tips for 2026.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/cover-letter/example/tech/software-engineer'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function SoftwareEngineerCoverLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
