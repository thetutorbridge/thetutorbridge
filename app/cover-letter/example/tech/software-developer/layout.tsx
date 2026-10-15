import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Developer Cover Letter Example (2026) | Free Template',
  description: 'Professional Software Developer cover letter example with free template. Learn how to write a developer cover letter that showcases your coding skills, project experience, and problem-solving abilities.',
  keywords: [
    'software developer cover letter',
    'software developer cover letter example',
    'developer cover letter sample',
    'software developer application',
    'web developer cover letter',
    'programmer cover letter',
    'coding cover letter example',
    'junior developer cover letter',
    'senior developer cover letter',
    'full stack developer cover letter',
    'backend developer cover letter',
    'frontend developer cover letter'
  ],
  openGraph: {
    title: 'Software Developer Cover Letter Example (2026)',
    description: 'Professional developer cover letter template with expert tips. Stand out in your software developer job application with this proven example.',
    type: 'article',
    url: 'https://www.thetutorbridge.com/cover-letter/example/tech/software-developer',
    siteName: 'The Tutor Bridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Developer Cover Letter Example',
    description: 'Professional developer cover letter template with expert tips for 2026.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/cover-letter/example/tech/software-developer'
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

export default function SoftwareDeveloperCoverLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
