import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'World Clock - See Current Time in Major Cities Worldwide Free',
  description: 'Free world clock showing current time in major cities. See time in New York, London, Tokyo, Sydney, and more. Perfect for international business and travel planning.',
  keywords: [
    'world clock',
    'time in different countries',
    'current time worldwide',
    'international time',
    'time zones',
    'global time',
    'world time',
    'timezone clock',
    'international clock',
  ],
  openGraph: {
    title: 'Free World Clock - Current Time in Major Cities',
    description: 'See current time in cities worldwide. Perfect for international coordination.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/world-clock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free World Clock',
    description: 'Current time in major cities worldwide.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/world-clock',
  },
};

export default function WorldClockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
