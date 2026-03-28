import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getConversionBySlug, getAllConversionSlugs } from '@/lib/conversions-data';
import ConversionPageContent from '@/components/conversion-page-content';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllConversionSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = getConversionBySlug(params.slug);

  if (!data) {
    return {
      title: 'Unit Conversion | The Tutor Bridge',
    };
  }

  const title = `${data.value} ${data.fromUnitFull} to ${data.toUnitFull} - Convert ${data.fromUnit} to ${data.toUnit}`;
  const description = `Convert ${data.value} ${data.fromUnitFull} to ${data.toUnitFull}. ${data.value} ${data.fromUnit} = ${data.resultFormatted} ${data.toUnit}. Learn the conversion formula and see step-by-step calculations with real-world examples.`;

  return {
    title,
    description,
    keywords: [
      `${data.value} ${data.fromUnit} to ${data.toUnit}`,
      `${data.fromUnit} to ${data.toUnit}`,
      `convert ${data.fromUnit} to ${data.toUnit}`,
      `${data.fromUnitFull} to ${data.toUnitFull}`,
      `${data.category} conversion`,
      'unit converter',
      'conversion calculator',
    ],
    alternates: {
      canonical: `https://www.thetutorbridge.com/convert/${data.slug}`,
    },
    openGraph: {
      title: `${data.value} ${data.fromUnit} to ${data.toUnit} Conversion`,
      description: `${data.value} ${data.fromUnitFull} equals ${data.resultFormatted} ${data.toUnitFull}. Step-by-step conversion guide.`,
      url: `https://www.thetutorbridge.com/convert/${data.slug}`,
      siteName: 'The Tutor Bridge',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.value} ${data.fromUnit} = ${data.resultFormatted} ${data.toUnit}`,
      description: `Convert ${data.fromUnitFull} to ${data.toUnitFull} with step-by-step explanation.`,
    },
  };
}

export default function ConversionPage({ params }: PageProps) {
  const data = getConversionBySlug(params.slug);

  if (!data) {
    notFound();
  }

  return <ConversionPageContent data={data} />;
}
