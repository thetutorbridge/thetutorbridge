import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Structures & Algorithms Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master data structures and algorithms with our comprehensive 2026 roadmap. Learn arrays, linked lists, trees, graphs, sorting, searching, dynamic programming, and more. Ace coding interviews.',
  keywords: [
    'dsa roadmap',
    'data structures roadmap',
    'algorithms roadmap',
    'dsa roadmap 2026',
    'data structures and algorithms',
    'coding interview preparation',
    'leetcode preparation',
    'arrays',
    'linked lists',
    'trees',
    'graphs',
    'dynamic programming',
    'sorting algorithms',
    'searching algorithms',
    'binary search',
    'recursion',
    'dsa for beginners',
    'dsa tutorial',
    'dsa course',
    'competitive programming',
    'faang interview',
    'coding interview',
    'dsa questions',
    'dsa practice',
    'time complexity',
    'space complexity',
    'big o notation',
  ],
  authors: [{ name: 'The Tutor Bridge' }],
  creator: 'The Tutor Bridge',
  publisher: 'The Tutor Bridge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/dsa',
  },
  openGraph: {
    title: 'Data Structures & Algorithms Roadmap 2026 - Complete Learning Path',
    description: 'Master DSA with arrays, trees, graphs, and dynamic programming. Your complete guide to acing coding interviews.',
    url: 'https://www.thetutorbridge.com/roadmap/dsa',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-dsa-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Data Structures & Algorithms Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Structures & Algorithms Roadmap 2026 - Complete Learning Path',
    description: 'Master DSA with arrays, trees, graphs, and dynamic programming.',
    images: ['https://www.thetutorbridge.com/og-dsa-roadmap.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function DSARoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
