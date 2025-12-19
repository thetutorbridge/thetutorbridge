import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calorie Deficit Calculator - Free Weight Loss Calculator | The Tutor Bridge',
  description: 'Free calorie deficit calculator to find how many calories to eat for weight loss. Calculate BMR, TDEE, and daily calorie intake to reach your target weight by your goal date.',
  keywords: [
    'calorie deficit calculator',
    'calorie deficit',
    'weight loss calculator',
    'how many calories to lose weight',
    'calorie calculator for weight loss',
    'deficit calculator',
    'BMR calculator',
    'TDEE calculator',
    'daily calorie intake',
    'calories to lose 1 pound',
    'calories to lose weight',
    'weight loss calorie calculator',
    'calorie intake calculator',
    'how to calculate calorie deficit',
    'calorie deficit to lose weight',
    '500 calorie deficit',
    '1000 calorie deficit',
    'safe calorie deficit',
    'calorie deficit for weight loss',
    'lose weight calculator',
    'weight loss goal calculator',
    'target weight calculator',
    'calories per day to lose weight',
    'basal metabolic rate',
    'total daily energy expenditure',
    'Mifflin-St Jeor',
    'activity level calories',
    'sedentary calorie needs',
    'active calorie needs',
    'weight loss plan',
    'calorie counting',
    'diet calculator',
    'fat loss calculator',
    'pounds per week weight loss',
    'healthy weight loss',
    'calorie deficit formula',
    'free calorie deficit calculator',
    'online weight loss calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/calorie-deficit-calculator',
  },
  openGraph: {
    title: 'Calorie Deficit Calculator - Plan Your Weight Loss',
    description: 'Calculate your calorie deficit for weight loss. Find BMR, TDEE, and daily calories needed to reach your target weight.',
    url: 'https://www.thetutorbridge.com/calculators/calorie-deficit-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Calorie Deficit Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calorie Deficit Calculator - Free Tool',
    description: 'Calculate calorie deficit for weight loss. Find your BMR, TDEE, and daily calorie target.',
    images: ['https://www.thetutorbridge.com/og-calculator.png'],
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

export default function CalorieDeficitCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
