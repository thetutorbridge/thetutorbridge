import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Steps to Calories Calculator - Convert Walking Steps to Calories Burned | Free Online Tool',
  description: 'Free steps to calories calculator to convert walking steps into calories burned. Enter your weight, height, and steps to find out how many calories you burn walking.',
  keywords: [
    // Primary Keywords
    'steps to calories calculator',
    'steps to calories burned',
    'walking calories calculator',
    'how many calories burned walking',
    'calories burned per step',

    // Steps Keywords
    'calories burned 10000 steps',
    'how many calories does 10000 steps burn',
    'calories burned walking 5000 steps',
    '10000 steps calories',
    '5000 steps calories burned',
    '7500 steps calories',
    '15000 steps calories',

    // Question Keywords
    'how many calories do I burn walking',
    'how many steps to burn 100 calories',
    'how many steps to burn 500 calories',
    'steps needed to burn calories',
    'walking steps calorie counter',

    // Walking Keywords
    'walking calorie calculator',
    'walk calories burned',
    'calories burned walking calculator',
    'walking exercise calories',
    'walking for weight loss calculator',

    // Distance Keywords
    'calories burned walking 1 mile',
    'calories burned walking 1 km',
    'steps to distance calculator',
    'walking distance calories',
    'miles walked calories',

    // Speed Keywords
    'slow walk calories burned',
    'brisk walk calories burned',
    'fast walking calories',
    'walking speed calories calculator',
    'pace calories burned',

    // Weight Loss Keywords
    'steps for weight loss',
    'walking weight loss calculator',
    'how many steps to lose weight',
    'daily steps calories',
    'step count weight loss',

    // Fitness Keywords
    'step counter calories',
    'pedometer calories',
    'fitness steps calculator',
    'daily walking calories',
    'step tracker calories',

    // Feature Keywords
    'free steps calories calculator',
    'online walking calculator',
    'instant step calorie calculator',
    'accurate calories from steps',
    'step calorie converter',

    // MET Keywords
    'MET walking calculator',
    'metabolic equivalent walking',
    'exercise intensity calories',
    'walking MET value',

    // Health Keywords
    'healthy walking calculator',
    'daily step goal calories',
    '10k steps health benefits',
    'walking fitness calculator',
    'cardiovascular walking calories',

    // Long-tail Keywords
    'convert steps to calories burned',
    'calculate calories from step count',
    'steps walked to calories calculator',
    'how many calories per step walking',
    'walking steps energy expenditure',

    // Specific Queries
    'how many calories burned in 1000 steps',
    'calories burned 3000 steps',
    'how much walking to burn 200 calories',
    'steps equivalent to calories',

    // India-Specific
    'steps to calories calculator india',
    'walking calories india',
    'step counter app calories',

    // Related Terms
    'stride length calories',
    'walking workout calories',
    'step exercise calories',
    'daily walk calorie burn',
    'hiking calories calculator',
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
    canonical: 'https://www.thetutorbridge.com/calculators/steps-to-calories-calculator',
  },
  openGraph: {
    title: 'Free Steps to Calories Calculator - Walking Calorie Counter',
    description: 'Calculate how many calories you burn walking based on your steps, weight, height, and walking speed. Perfect for tracking your fitness goals.',
    url: 'https://www.thetutorbridge.com/calculators/steps-to-calories-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: '/TheTutorBridge Logo New.png',
        width: 1200,
        height: 630,
        alt: 'Steps to Calories Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Steps to Calories Calculator',
    description: 'Convert your daily steps into calories burned. Find out how many calories 10,000 steps burns based on your personal metrics.',
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

export default function StepsToCaloriesCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
