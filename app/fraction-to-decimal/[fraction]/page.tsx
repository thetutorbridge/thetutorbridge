import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFractionBySlug, getAllFractionSlugs } from '@/lib/fractions-data';
import { FractionPageContent } from '@/components/fraction-page-content';

interface PageProps {
  params: {
    fraction: string;
  };
}

// Generate static params for all fractions
export async function generateStaticParams() {
  const slugs = getAllFractionSlugs();
  return slugs.map((slug) => ({
    fraction: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const fractionData = getFractionBySlug(params.fraction);

  if (!fractionData) {
    return {
      title: 'Fraction Not Found',
    };
  }

  const title = `${fractionData.fraction} as a Decimal - Conversion, Steps & Examples`;
  const description = `Convert ${fractionData.fraction} to decimal form. ${fractionData.fraction} as a decimal is ${fractionData.decimal} (${fractionData.percentage}). Learn the step-by-step conversion process with detailed explanations, equivalent fractions, and practical applications.`;

  return {
    title,
    description,
    keywords: [
      `${fractionData.fraction} as decimal`,
      `${fractionData.fraction} to decimal`,
      `${fractionData.fraction} decimal`,
      `convert ${fractionData.fraction} to decimal`,
      `${fractionData.fraction} equals`,
      'fraction to decimal converter',
      'fraction calculator',
      'decimal conversion',
      'math help',
      'fraction help',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.thetutorbridge.com/fraction-to-decimal/${params.fraction}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://www.thetutorbridge.com/fraction-to-decimal/${params.fraction}`,
    },
  };
}

export default function FractionConverterPage({ params }: PageProps) {
  const fractionData = getFractionBySlug(params.fraction);

  if (!fractionData) {
    notFound();
  }

  return <FractionPageContent fractionData={fractionData} fractionSlug={params.fraction} />;
}
