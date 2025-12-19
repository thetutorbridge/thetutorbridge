import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maintenance Calorie Calculator - Free TDEE Calculator | The Tutor Bridge',
  description: 'Free maintenance calorie calculator to find how many calories you need to maintain your current weight. Calculate TDEE with BMR using Mifflin-St Jeor formula and activity levels.',
  keywords: [
    'maintenance calorie calculator',
    'maintenance calories',
    'TDEE calculator',
    'total daily energy expenditure',
    'how many calories to maintain weight',
    'calories to maintain weight',
    'daily calorie needs',
    'calorie maintenance calculator',
    'BMR calculator',
    'basal metabolic rate',
    'Mifflin-St Jeor calculator',
    'calorie calculator',
    'daily calorie calculator',
    'energy expenditure calculator',
    'metabolism calculator',
    'how many calories do I need',
    'calorie needs calculator',
    'maintenance calorie intake',
    'TDEE formula',
    'BMR formula',
    'activity level calories',
    'sedentary calorie needs',
    'active calorie needs',
    'calorie intake calculator',
    'weight maintenance calories',
    'maintain body weight',
    'caloric needs',
    'daily energy needs',
    'resting metabolic rate',
    'RMR calculator',
    'calorie burn calculator',
    'calorie requirement calculator',
    'daily calorie requirement',
    'maintenance diet calories',
    'how many calories should I eat',
    'calories per day calculator',
    'daily calorie intake',
    'energy needs calculator',
    'physical activity level',
    'PAL calculator',
    'macronutrient calculator',
    'ideal weight calculator',
    'free calorie calculator',
    'online TDEE calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/maintenance-calorie-calculator',
  },
  openGraph: {
    title: 'Maintenance Calorie Calculator - Find Your Daily Calorie Needs',
    description: 'Free maintenance calorie calculator to find how many calories you need daily. Calculate BMR and TDEE using the Mifflin-St Jeor formula.',
    url: 'https://www.thetutorbridge.com/calculators/maintenance-calorie-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Maintenance Calorie Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maintenance Calorie Calculator - Free TDEE Tool',
    description: 'Calculate how many calories you need to maintain your weight based on BMR, age, sex, and activity level.',
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

export default function MaintenanceCalorieCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
