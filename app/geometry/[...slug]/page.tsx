import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGeometryBySlug, getAllGeometrySlugs } from '@/lib/geometry-data';
import GeometryPageContent from '@/components/geometry-page-content';

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const slugs = getAllGeometrySlugs();
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slugPath = params.slug.join('/');
  const data = getGeometryBySlug(slugPath);

  if (!data) {
    return {
      title: 'Geometry Calculator | The Tutor Bridge',
    };
  }

  const paramDesc = Object.entries(data.parameters)
    .map(([key, val]) => `${key} ${val}`)
    .join(', ');

  const title = `${data.formulaName}: ${paramDesc} - Calculate ${data.shape} ${data.category}`;
  const description = `Calculate ${data.formulaName.toLowerCase()} with ${paramDesc}. Result: ${data.resultFormatted} ${data.unit}. Step-by-step solution with formula ${data.formula} and real-world examples.`;

  return {
    title,
    description,
    keywords: [
      data.formulaName.toLowerCase(),
      `${data.shape} ${data.category}`,
      `calculate ${data.shape} ${data.category}`,
      `${data.formulaType}`,
      'geometry calculator',
      `${data.shape} formula`,
    ],
    alternates: {
      canonical: `https://www.thetutorbridge.com/geometry/${slugPath}`,
    },
    openGraph: {
      title: `${data.formulaName}: ${paramDesc}`,
      description: `Result: ${data.resultFormatted} ${data.unit}. Learn the formula and calculation steps.`,
      url: `https://www.thetutorbridge.com/geometry/${slugPath}`,
      siteName: 'The Tutor Bridge',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.formulaName}`,
      description: `${paramDesc} = ${data.resultFormatted} ${data.unit}`,
    },
  };
}

export default function GeometryPage({ params }: PageProps) {
  const slugPath = params.slug.join('/');
  const data = getGeometryBySlug(slugPath);

  if (!data) {
    notFound();
  }

  return <GeometryPageContent data={data} />;
}
