import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Online Calculators - GPA, Finance, Math & More",
  description: "Free online calculators for students and professionals. Calculate GPA, grades, SIP returns, EMI, percentages, time conversions, and more educational tools.",
  keywords: "online calculators, GPA calculator, grade calculator, SIP calculator, EMI calculator, percentage calculator, math calculators, educational tools",
  openGraph: {
    title: "Free Online Calculators - GPA, Finance, Math & More",
    description: "Free online calculators for students and professionals. Calculate GPA, grades, SIP returns, EMI, percentages, time conversions, and more educational tools.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Online Calculators - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Calculators - GPA, Finance, Math & More",
    description: "Free online calculators for students and professionals. GPA, grades, finance, math and more.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators",
  },
};

// Structured data for the calculators collection
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Free Online Calculators",
  "description": "100+ free online calculators for students and professionals. Academic, financial, math, and conversion tools.",
  "url": "https://www.thetutorbridge.com/calculators",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Calculator Tools",
    "numberOfItems": 100,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "GPA Calculator", "url": "https://www.thetutorbridge.com/calculators/gpa-calculator" },
      { "@type": "ListItem", "position": 2, "name": "Percentage Calculator", "url": "https://www.thetutorbridge.com/calculators/percentage-calculator" },
      { "@type": "ListItem", "position": 3, "name": "BMI Calculator", "url": "https://www.thetutorbridge.com/calculators/bmi-calculator" },
      { "@type": "ListItem", "position": 4, "name": "EMI Calculator", "url": "https://www.thetutorbridge.com/calculators/emi-calculator" },
      { "@type": "ListItem", "position": 5, "name": "Age Calculator", "url": "https://www.thetutorbridge.com/calculators/age-calculator" },
      { "@type": "ListItem", "position": 6, "name": "SIP Calculator", "url": "https://www.thetutorbridge.com/calculators/sip-calculator" },
      { "@type": "ListItem", "position": 7, "name": "Compound Interest Calculator", "url": "https://www.thetutorbridge.com/calculators/compound-interest-calculator" },
      { "@type": "ListItem", "position": 8, "name": "Grade Calculator", "url": "https://www.thetutorbridge.com/calculators/grade-calculator" },
    ]
  },
  "provider": {
    "@type": "Organization",
    "name": "The Tutor Bridge",
    "url": "https://www.thetutorbridge.com"
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.thetutorbridge.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Calculators",
      "item": "https://www.thetutorbridge.com/calculators"
    }
  ]
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
