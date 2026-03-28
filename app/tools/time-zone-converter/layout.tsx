import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Zone Converter - Convert Time Between Time Zones Free',
  description: 'Free time zone converter. Convert time between different time zones worldwide. Perfect for international meetings, travel planning, and global coordination.',
  keywords: [
    'time zone converter',
    'timezone converter',
    'convert time zones',
    'time conversion',
    'world time converter',
    'international time converter',
    'timezone calculator',
  ],
  openGraph: {
    title: 'Free Time Zone Converter',
    description: 'Convert time between different time zones instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/time-zone-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Time Zone Converter',
    description: 'Convert time between time zones.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/time-zone-converter',
  },
};

export default function TimeZoneConverterLayout({ children }: { children: React.ReactNode}) {
  return <>{children}</>;
}
