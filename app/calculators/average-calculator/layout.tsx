import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Average Calculator - Calculate Mean, Median, Mode & Range | Free Online Tool',
  description: 'Free average calculator to find mean, median, mode, and range of any set of numbers. Enter values separated by spaces or commas for instant statistical results. Perfect for students and data analysis.',
  keywords: [
    // Primary Keywords
    'average calculator',
    'mean calculator',
    'calculate average',
    'find average',
    'average finder',

    // Statistical Terms
    'arithmetic mean calculator',
    'median calculator',
    'mode calculator',
    'range calculator',
    'central tendency calculator',

    // Question Keywords
    'how to calculate average',
    'how to find mean',
    'how to find median',
    'how to find mode',
    'what is average',
    'average formula',

    // Feature Keywords
    'online average calculator',
    'free average calculator',
    'simple average calculator',
    'average calculator online free',
    'instant average calculator',

    // Use Case Keywords
    'grade average calculator',
    'test score average',
    'calculate average marks',
    'average percentage calculator',
    'gpa average calculator',

    // Educational Keywords
    'mean median mode calculator',
    'statistics calculator',
    'data average calculator',
    'number average calculator',
    'average of numbers calculator',

    // Long-tail Keywords
    'calculate average of multiple numbers',
    'find mean of numbers online',
    'average calculator with steps',
    'sum and average calculator',
    'arithmetic average calculator',

    // India-Specific
    'average calculator india',
    'average marks calculator',
    'percentage average calculator india',

    // Related Terms
    'variance calculator',
    'standard deviation calculator',
    'weighted average calculator',
    'sum calculator',
    'count calculator',

    // Additional Keywords
    'math average calculator',
    'average number finder',
    'calculate mean online',
    'average value calculator',
    'numerical average calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/average-calculator',
  },
  openGraph: {
    title: 'Free Average Calculator - Mean, Median, Mode & Range',
    description: 'Calculate average (mean), median, mode, and range of any numbers instantly. Enter values separated by spaces or commas. Free online statistics tool.',
    url: 'https://www.thetutorbridge.com/calculators/average-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Average Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Average Calculator - Mean, Median, Mode & Range',
    description: 'Calculate average (mean), median, mode, and range of any numbers. Instant results with variance and standard deviation.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
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

export default function AverageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
