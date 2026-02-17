import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Time Calculator - Estimate File Download Duration | Free Online Tool',
  description: 'Free download time calculator to estimate how long a file download will take. Enter file size (MB, GB, TB) and internet speed (Mbps, Gbps) to calculate download duration instantly.',
  keywords: [
    // Primary Keywords
    'download time calculator',
    'file download calculator',
    'download speed calculator',
    'how long to download',
    'download duration calculator',

    // Question Keywords
    'how long does it take to download',
    'how long to download 1 gb',
    'how long to download 10 gb',
    'how long to download a movie',
    'how long to download a game',
    'calculate download time',

    // Feature Keywords
    'file size calculator',
    'internet speed calculator',
    'bandwidth calculator',
    'data transfer calculator',
    'download estimator',

    // Unit Keywords
    'mbps download time',
    'gbps download time',
    'mb to download time',
    'gb download time calculator',
    'tb download time',

    // Connection Type Keywords
    'broadband download time',
    'fiber download time',
    '4g download time',
    '5g download time',
    'wifi download speed',

    // Use Case Keywords
    'game download time calculator',
    'movie download time',
    'software download time',
    'update download time',
    'backup download time',

    // Speed Keywords
    '100 mbps download time',
    '50 mbps download time',
    '1 gbps download time',
    '10 mbps download time',
    'slow internet download time',

    // Long-tail Keywords
    'estimate file download time',
    'calculate how long download takes',
    'file transfer time calculator',
    'download time estimator online',
    'free download time calculator',

    // India-Specific
    'download time calculator india',
    'jio download speed calculator',
    'airtel download time',
    'broadband speed calculator india',

    // Technical Keywords
    'bits per second calculator',
    'mbps vs mbps calculator',
    'byte to bit converter',
    'data rate calculator',
    'throughput calculator',

    // Related Terms
    'upload time calculator',
    'transfer speed calculator',
    'internet bandwidth calculator',
    'network speed calculator',
    'connection speed calculator',

    // Comparison Keywords
    'download time comparison',
    'internet speed comparison',
    'how fast is my download',
    'download speed test time',

    // File Type Keywords
    'video download time',
    'music download time',
    'iso download time',
    'zip file download time',
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
    canonical: 'https://www.thetutorbridge.com/calculators/download-time-calculator',
  },
  openGraph: {
    title: 'Free Download Time Calculator - Estimate File Download Duration',
    description: 'Calculate how long it takes to download files based on file size and internet speed. Works with MB, GB, TB and Mbps, Gbps. Includes speed comparison tables.',
    url: 'https://www.thetutorbridge.com/calculators/download-time-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Download Time Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Download Time Calculator',
    description: 'Calculate download time for any file size and internet speed. Estimate how long games, movies, and updates will take to download.',
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

export default function DownloadTimeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
