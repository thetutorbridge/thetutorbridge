import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Builder - Create Professional Resume Free Online',
  description: 'Free resume builder. Create professional resumes instantly. Perfect for job seekers and career changers.',
  keywords: ['resume builder', 'create resume', 'free resume'],
  openGraph: {
    title: 'Free Resume Builder',
    description: 'Build professional resumes.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/resume-builder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Builder',
    description: 'Create resumes.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/resume-builder',
  },
};

export default function ResumeBuilderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
