import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calories Burned Walking Calculator - Steps, Distance, Time | Free Online Tool',
  description: 'Free walking calorie calculator to estimate calories burned by steps, distance, or time. Works for treadmill and outdoor walking with slope adjustment.',
  keywords: [
    // Primary Keywords
    'calories burned walking calculator',
    'walking calorie calculator',
    'calories burned walking',
    'walking calories calculator',
    'calorie burn walking',

    // Steps Keywords
    'calories burned 10000 steps',
    'steps to calories calculator',
    'how many calories 10000 steps',
    'calories per step',
    'step calorie calculator',

    // Distance Keywords
    'calories burned walking 1 mile',
    'calories burned walking 1 km',
    'walking distance calories',
    'calories per mile walking',
    'calories per km walking',

    // Time Keywords
    'calories burned walking 1 hour',
    'calories burned walking 30 minutes',
    'walking time calories',
    'hourly walking calories',
    'calories per minute walking',

    // Speed Keywords
    'brisk walking calories',
    'fast walking calorie burn',
    'slow walking calories',
    'walking speed calories',
    'pace calorie calculator',

    // Treadmill Keywords
    'treadmill calories burned',
    'treadmill walking calculator',
    'incline walking calories',
    'treadmill calorie calculator',
    'walking on treadmill calories',

    // Slope Keywords
    'uphill walking calories',
    'downhill walking calories',
    'incline calories burned',
    'walking incline calculator',
    'hill walking calories',

    // Question Keywords
    'how many calories does walking burn',
    'calories burned walking calculator',
    'how to calculate walking calories',
    'does walking burn calories',
    'walking for weight loss calories',

    // Weight Keywords
    'walking weight loss calculator',
    'walking calorie burn by weight',
    'how much weight walking burns',
    'weight loss from walking',
    'walking fat burn calculator',

    // Activity Keywords
    'outdoor walking calories',
    'daily walking calories',
    'exercise walking calculator',
    'walking workout calories',
    'walking exercise calorie burn',

    // MET Keywords
    'walking MET value',
    'metabolic equivalent walking',
    'MET calorie calculator',
    'walking energy expenditure',
    'walking metabolism',

    // Feature Keywords
    'free walking calculator',
    'online calorie calculator walking',
    'instant walking calorie count',
    'accurate walking calories',
    'walking calorie estimator',

    // Long-tail Keywords
    'how many calories burned walking 5 miles',
    'calories burned walking for 45 minutes',
    'walking 10000 steps calorie burn',
    'calculate calories from walking distance',
    'treadmill incline calorie calculator',

    // Health Keywords
    'walking health benefits calories',
    'heart rate walking calories',
    'fitness walking calculator',
    'cardio walking calorie burn',
    'walking cardiovascular exercise',

    // Specific Searches
    'calories walking 3 mph',
    'calories walking 4 mph',
    'calories walking 5 km',
    'calories 5000 steps',
    'calories 15000 steps',

    // Comparison Keywords
    'walking vs running calories',
    'calories walking vs jogging',
    'walking calorie comparison',
    'exercise calorie calculator',
    'activity calorie burn',

    // Goal Keywords
    'walking for weight loss',
    'steps for calorie deficit',
    'daily walking goal calories',
    'walking to lose weight',
    'step goal weight loss',
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
    canonical: 'https://www.thetutorbridge.com/calculators/calories-burned-walking-calculator',
  },
  openGraph: {
    title: 'Free Calories Burned Walking Calculator - Steps, Distance, Time',
    description: 'Calculate calories burned while walking by steps, distance, or time. Works for treadmill and outdoor walking with incline/decline adjustments.',
    url: 'https://www.thetutorbridge.com/calculators/calories-burned-walking-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Calories Burned Walking Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Walking Calorie Calculator',
    description: 'How many calories does walking burn? Calculate by steps, distance, or time. Includes treadmill incline and outdoor walking.',
    images: ['/TheTutorBridge Logo New.png'],
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

export default function CaloriesBurnedWalkingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
