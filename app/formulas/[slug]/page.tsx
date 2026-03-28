import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFormulaBySlug, getAllFormulaSlugs } from '@/lib/formulas-data';
import FormulaPageContent from '@/components/formula-page-content';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllFormulaSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = getFormulaBySlug(params.slug);

  if (!data) {
    return {
      title: 'Math Formulas | The Tutor Bridge',
    };
  }

  const title = `${data.name} Formula - ${data.formula}`;
  const description = `${data.description}. Learn ${data.name.toLowerCase()} with examples, practice problems, and real-world applications. Free step-by-step explanations for ${data.category}.`;

  return {
    title,
    description,
    keywords: [
      data.name.toLowerCase(),
      `${data.name} formula`,
      `${data.category} formula`,
      `${data.subcategory}`,
      'math formulas',
      'formula calculator',
      ...data.tags,
    ],
    alternates: {
      canonical: `https://www.thetutorbridge.com/formulas/${params.slug}`,
    },
    openGraph: {
      title: `${data.name} - ${data.formula}`,
      description: data.description,
      url: `https://www.thetutorbridge.com/formulas/${params.slug}`,
      siteName: 'The Tutor Bridge',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.name,
      description: `${data.formula} - ${data.description}`,
    },
  };
}

export default function FormulaPage({ params }: PageProps) {
  const data = getFormulaBySlug(params.slug);

  if (!data) {
    notFound();
  }

  return <FormulaPageContent data={data} />;
}
