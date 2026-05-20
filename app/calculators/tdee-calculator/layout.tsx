import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TDEE Calculator - Free Total Daily Energy Expenditure Calculator | The Tutor Bridge',
  description: 'Free TDEE Calculator to calculate your Total Daily Energy Expenditure. Find out how many calories you burn daily based on age, weight, height, and activity level. Instant results with BMR.',
  keywords: [
    'tdee calculator',
    'total daily energy expenditure calculator',
    'tdee',
    'calorie calculator',
    'how many calories do i burn',
    'daily calorie burn calculator',
    'energy expenditure calculator',
    'tdee calc',
    'maintenance calories calculator',
    'calorie needs calculator',
    'bmr and tdee calculator',
    'activity level calculator',
    'metabolic rate calculator',
    'calories burned per day',
    'weight loss calorie calculator',
    'bulking calorie calculator',
    'cutting calorie calculator',
    'fitness calorie calculator',
    'workout calorie calculator',
    'tdee for weight loss',
    'tdee for muscle gain',
    'sedentary tdee',
    'active tdee calculator',
    'mifflin st jeor calculator',
    'harris benedict calculator',
    'katch mcardle calculator',
    'daily energy needs',
    'calorie expenditure',
    'how to calculate tdee',
    'what is my tdee',
    'tdee formula',
    'accurate tdee calculator',
    'free tdee calculator',
    'online tdee calculator',
    'best tdee calculator',
    'tdee weight loss',
    'tdee bulking',
    'tdee cutting',
    'calorie deficit calculator',
    'calorie surplus calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/tdee-calculator',
  },
  openGraph: {
    title: 'TDEE Calculator - Total Daily Energy Expenditure | The Tutor Bridge',
    description: 'Calculate your TDEE and find out how many calories you burn daily. Free calculator with BMR, activity multipliers, and weight management goals.',
    url: 'https://www.thetutorbridge.com/calculators/tdee-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'TDEE Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDEE Calculator - Free Total Daily Energy Expenditure Tool',
    description: 'Calculate how many calories you burn daily with our free TDEE calculator.',
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

export default function TDEECalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
