import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEquationBySlug, getAllEquationSlugs } from '@/lib/equations-data';
import { EquationPageContent } from '@/components/equation-page-content';

interface PageProps {
  params: {
    equation: string;
  };
}

// Generate static params for all equations
export async function generateStaticParams() {
  const slugs = getAllEquationSlugs();
  return slugs.map((slug) => ({
    equation: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const equationData = getEquationBySlug(params.equation);

  if (!equationData) {
    return {
      title: 'Equation Not Found',
    };
  }

  const title = `Solve ${equationData.equationPlain} (Step-by-Step Solution)`;
  const description = `Learn how to solve ${equationData.equationPlain} with our step-by-step guide. Get the solution ${equationData.solution} with detailed explanations, verification, and similar practice problems.`;

  return {
    title,
    description,
    keywords: [
      `solve ${equationData.equationPlain}`,
      `${equationData.equationPlain} solution`,
      'algebra equation solver',
      'step by step math solutions',
      'linear equations',
      'equation calculator',
      'math help',
      'algebra help',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.thetutorbridge.com/solve/${params.equation}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://www.thetutorbridge.com/solve/${params.equation}`,
    },
  };
}

export default function EquationSolverPage({ params }: PageProps) {
  const equationData = getEquationBySlug(params.equation);

  if (!equationData) {
    notFound();
  }

  return <EquationPageContent equationData={equationData} equationSlug={params.equation} />;
}
