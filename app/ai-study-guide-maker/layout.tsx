import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Study Guide Maker - Create Smart Study Guides with AI Free | TheTutorBridge',
  description: 'Transform your topics into comprehensive, research-based study guides with AI. Free AI study guide maker supports Hindi & English. Create detailed study materials in seconds for better exam preparation.',
  keywords: 'AI study guide maker, free study guide generator, AI study tools, exam preparation, personalized learning, Hindi English study guides',
  openGraph: {
    title: 'AI Study Guide Maker - Create Smart Study Guides with AI Free',
    description: 'Transform your topics into comprehensive, research-based study guides with AI. Supports Hindi & English. Perfect for students and educators.',
    type: 'website',
    siteName: 'The Tutor Bridge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Study Guide Maker - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Study Guide Maker - Create Smart Study Guides with AI Free',
    description: 'Transform your topics into comprehensive, research-based study guides with AI. Supports Hindi & English.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/ai-study-guide-maker',
  },
};

export default function AIStudyGuideMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
