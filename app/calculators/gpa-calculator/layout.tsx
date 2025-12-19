import { Metadata } from 'next';

// FAQ data for schema
const faqData = [
  {
    question: "What is considered a good GPA?",
    answer: "A 'good' GPA depends on your goals. Generally: 3.5-4.0 is excellent and competitive for top graduate programs; 3.0-3.49 is good and meets most scholarship requirements; 2.5-2.99 is average; below 2.0 is typically below satisfactory."
  },
  {
    question: "What is the difference between weighted and unweighted GPA?",
    answer: "Unweighted GPA uses the standard 4.0 scale where all courses are treated equally. Weighted GPA gives extra points for advanced courses (AP, IB, Honors) - typically on a 5.0 scale. For example, an A in an AP course might be worth 5.0 instead of 4.0."
  },
  {
    question: "How do I calculate cumulative GPA?",
    answer: "To calculate cumulative GPA: (1) Multiply your previous GPA by previous total credits to get previous quality points. (2) Add your new semester's quality points. (3) Divide total quality points by total credits."
  },
  {
    question: "Can I raise a low GPA?",
    answer: "Yes, but it becomes harder as you complete more credits. Early in your academic career (first 1-2 years), you can significantly improve your GPA with strong performance. Focus on consistent improvement rather than drastic overnight changes."
  },
  {
    question: "Do Pass/Fail courses affect my GPA?",
    answer: "Pass/Fail (P/F) courses typically do not affect your GPA - they don't contribute quality points or count in total credits for GPA calculation. However, taking too many P/F courses can impact financial aid and academic progress."
  },
  {
    question: "What GPA do I need for graduate school?",
    answer: "Graduate school requirements vary: 3.0 is typically the minimum for admission consideration; 3.5+ is competitive for most programs; 3.7+ is competitive for top-tier programs. However, test scores, research experience, and recommendations also matter."
  }
];

export const metadata: Metadata = {
  title: 'GPA Calculator - Free Grade Point Average Calculator | The Tutor Bridge',
  description: 'Free GPA calculator to calculate your grade point average. Supports 4.0 scale, weighted GPA, cumulative GPA, semester GPA, and multiple grading systems. Calculate high school and college GPA instantly.',
  keywords: [
    // Primary keywords
    'gpa calculator',
    'grade point average calculator',
    'calculate gpa',
    'gpa calc',
    'grade calculator',

    // GPA types
    'cumulative gpa calculator',
    'semester gpa calculator',
    'weighted gpa calculator',
    'unweighted gpa calculator',
    'high school gpa calculator',
    'college gpa calculator',
    'university gpa calculator',

    // Scale-specific
    '4.0 gpa calculator',
    '4.0 scale calculator',
    '5.0 gpa calculator',
    'weighted 5.0 scale',
    '10 point gpa calculator',
    'percentage to gpa',
    'gpa to percentage',

    // Actions
    'how to calculate gpa',
    'calculate my gpa',
    'find my gpa',
    'check gpa',
    'gpa checker',
    'what is my gpa',

    // Grade conversions
    'letter grade to gpa',
    'grade to gpa converter',
    'gpa converter',
    'a to gpa',
    'b+ to gpa',
    'grade points',

    // Academic terms
    'credit hours calculator',
    'quality points',
    'academic gpa',
    'overall gpa',
    'term gpa',
    'final gpa calculator',

    // Specific scenarios
    'gpa calculator with credits',
    'gpa calculator online',
    'free gpa calculator',
    'simple gpa calculator',
    'easy gpa calculator',
    'accurate gpa calculator',

    // Long-tail keywords
    'how to calculate cumulative gpa',
    'how to calculate weighted gpa',
    'gpa calculator for college students',
    'gpa calculator for high school students',
    'calculate gpa from grades',
    'calculate gpa with credit hours',
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
    canonical: 'https://www.thetutorbridge.com/calculators/gpa-calculator',
  },
  openGraph: {
    title: 'GPA Calculator - Calculate Your Grade Point Average Free',
    description: 'Free GPA calculator supporting 4.0 scale, weighted/unweighted GPA, cumulative and semester calculations. Perfect for high school and college students.',
    url: 'https://www.thetutorbridge.com/calculators/gpa-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'GPA Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPA Calculator - Free Grade Point Average Calculator',
    description: 'Calculate your GPA instantly. Supports 4.0 scale, weighted GPA, cumulative GPA for high school and college.',
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

export default function GPACalculatorLayout({
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
    "name": "GPA Calculator",
    "description": "Free GPA calculator to calculate your grade point average. Supports 4.0 scale, weighted GPA, cumulative GPA, semester GPA, and multiple grading systems.",
    "url": "https://www.thetutorbridge.com/calculators/gpa-calculator",
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
      "4.0 Scale GPA Calculation",
      "Weighted 5.0 Scale for Honors/AP",
      "Cumulative GPA Calculation",
      "Semester GPA Calculation",
      "Credit Hours Support",
      "Multiple Grading Systems"
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
