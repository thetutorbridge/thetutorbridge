import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tip Calculator - Calculate Restaurant Tips & Split Bills Free',
  description: 'Free online tip calculator. Calculate tips for restaurants, delivery, and services. Split bills between multiple people. Easy tip percentage selection with customizable options.',
  keywords: [
    'tip calculator',
    'calculate tip',
    'restaurant tip calculator',
    'tip calculator app',
    'how much to tip',
    'gratuity calculator',
    'bill split calculator',
    'split bill',
    'tip percentage',
    'tipping calculator',
  ],
  openGraph: {
    title: 'Free Tip Calculator - Calculate Tips & Split Bills',
    description: 'Calculate restaurant tips and split bills easily. Quick tip percentages and custom options.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/tip-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tip Calculator',
    description: 'Calculate tips and split bills instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/tip-calculator',
  },
};

export default function TipCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
