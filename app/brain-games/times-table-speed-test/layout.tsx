import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Times Tables Speed Test - Free Multiplication Practice Game',
  description: 'Free multiplication speed test game for kids. Practice times tables 1-12 with 2-minute challenges, track scores, and improve math skills. Perfect for 3rd grade students.',
  keywords: [
    'times tables',
    'multiplication practice',
    'math game',
    'speed test',
    'times tables test',
    'multiplication quiz',
    'math for kids',
    '3rd grade math',
    'free math game',
    'multiplication facts',
    'times tables quiz',
    'multiplication speed test for 3rd grade',
    'multiplication practice game',
  ],
  openGraph: {
    title: 'Times Tables Speed Test - Multiplication Practice',
    description: 'Practice multiplication with fun 2-minute speed tests. Track your progress and master times tables!',
    type: 'website',
    url: 'https://www.thetutorbridge.com/brain-games/times-table-speed-test',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Times Tables Speed Test',
    description: 'Fun multiplication practice game for kids - Free times tables speed test with leaderboards!',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/brain-games/times-table-speed-test',
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
