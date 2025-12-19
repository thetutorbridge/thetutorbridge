import { Metadata } from 'next';

// FAQ data for schema
const faqData = [
  {
    question: "What is a percentage?",
    answer: "A percentage is a number or ratio expressed as a fraction of 100. It is denoted using the percent sign '%'. For example, 45% is equal to 45/100, or 0.45. Percentages are used to express how large or small one quantity is relative to another quantity."
  },
  {
    question: "How do you calculate a percentage of a number?",
    answer: "To calculate a percentage of a number, convert the percentage to a decimal by dividing by 100, then multiply by the number. For example, to find 20% of 150: (20 ÷ 100) × 150 = 0.20 × 150 = 30."
  },
  {
    question: "How do you convert a decimal to a percentage?",
    answer: "To convert a decimal to a percentage, multiply the decimal by 100 and add the percent sign. For example, 0.75 as a percentage is 0.75 × 100 = 75%. You can think of it as moving the decimal point two places to the right."
  },
  {
    question: "How do you convert a fraction to a percentage?",
    answer: "To convert a fraction to a percentage, divide the numerator by the denominator, then multiply by 100. For example, 3/4 as a percentage: (3 ÷ 4) × 100 = 0.75 × 100 = 75%."
  },
  {
    question: "Can a percentage be greater than 100%?",
    answer: "Yes! Percentages can be greater than 100%. This occurs when a value is larger than the reference value. For example, if sales increased from 50 to 150 units, the growth is 200%."
  },
  {
    question: "How do you calculate percentage increase or decrease?",
    answer: "To calculate percentage change: ((New Value - Old Value) / Old Value) × 100. If positive, it's an increase; if negative, it's a decrease. For example, if a price goes from $100 to $120: ((120 - 100) / 100) × 100 = 20% increase."
  }
];

export const metadata: Metadata = {
  title: 'Percentage Calculator - Free % Calculator with Quick Solutions | The Tutor Bridge',
  description: 'Free percentage calculator with 3 quick solutions. Calculate what is X% of Y, X is what % of Y, and X is Y% of what. Perfect for students, business, and everyday calculations with step-by-step solutions.',
  keywords: [
    'percentage calculator',
    'percent calculator',
    'calculate percentage',
    'percentage calculation',
    'percent calculation',
    'how to calculate percentage',
    'percentage formula',
    'percentage calculator online',
    'free percentage calculator',
    'percentage solver',
    'what is percentage of',
    'what percent of',
    'percent of what',
    'percentage increase calculator',
    'percentage decrease calculator',
    'percentage difference calculator',
    'calculate percent',
    'find percentage',
    'percentage math',
    'percentage tool',
    'quick percentage calculator',
    'simple percentage calculator',
    'percentage calculator with steps',
    'percentage calculator free',
    'online percent calculator',
    'calculate % of number',
    'find percent of number',
    'what is x percent of y',
    'x is what percent of y',
    'x is y percent of what',
    'percentage word problems',
    'percentage examples',
    'percentage help',
    'business percentage calculator',
    'student percentage calculator',
    'math percentage calculator',
    'percentage calculator for students',
    'percentage calculator for business',
    'educational percentage calculator',
    'percentage problem solver',
    'percentage equation solver',
    'percentage conversion calculator',
    'convert to percentage',
    'percentage to decimal',
    'decimal to percentage',
    'fraction to percentage',
    'percentage of total',
    'percentage calculator step by step',
    'how to find percentage',
    'percentage tricks',
    'percentage shortcuts',
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
    canonical: 'https://www.thetutorbridge.com/calculators/percentage-calculator',
  },
  openGraph: {
    title: 'Percentage Calculator - Free % Calculator with Quick Solutions',
    description: 'Free percentage calculator with 3 quick solutions. Calculate percentages instantly with step-by-step explanations. Perfect for students and business.',
    url: 'https://www.thetutorbridge.com/calculators/percentage-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Percentage Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator - Free Tool with Quick Solutions',
    description: 'Calculate percentages instantly with 3 quick solutions and step-by-step explanations.',
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

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // WebApplication schema for the calculator
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Percentage Calculator",
    "description": "Free percentage calculator with 3 quick solutions. Calculate what is X% of Y, X is what % of Y, and X is Y% of what. Step-by-step solutions included.",
    "url": "https://www.thetutorbridge.com/calculators/percentage-calculator",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "The Tutor Bridge",
      "url": "https://www.thetutorbridge.com"
    },
    "featureList": [
      "What is X% of Y calculation",
      "X is what % of Y calculation",
      "X is Y% of what calculation",
      "Step-by-step solutions",
      "Instant results",
      "Free to use"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {children}
    </>
  );
}
