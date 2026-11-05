import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GTMLessonContent from '@/components/gtm-lesson-content';
import {
  getTermBySlug,
  getAllSlugs,
  getCategoryInfo,
  GTM_TERMS
} from '@/lib/learning-gtm-data';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all 100 terms
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each term page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    return {
      title: 'Term Not Found | Learning GTM',
    };
  }

  const categoryInfo = getCategoryInfo(term.category);
  const termTitle = term.abbreviation
    ? `${term.abbreviation} (${term.term})`
    : term.term;

  const title = `What is ${termTitle}? | GTM Terms Explained`;
  const description = `${term.meaning} Learn about ${term.term} with real-world examples, key points, and related GTM concepts.`;

  return {
    title,
    description,
    keywords: [
      term.term,
      term.abbreviation || '',
      'GTM',
      'go-to-market',
      'GTM terms',
      'GTM glossary',
      categoryInfo?.name || '',
      'B2B SaaS',
      'sales terminology',
      'marketing terms',
      ...term.keyPoints.slice(0, 3).map(p => p.split(' ').slice(0, 4).join(' '))
    ].filter(Boolean),
    openGraph: {
      title: `What is ${termTitle}? - GTM Term Explained`,
      description: term.meaning,
      type: 'article',
      url: `https://thetutorbridge.com/learning-gtm/${term.slug}`,
      siteName: 'The Tutor Bridge',
    },
    twitter: {
      card: 'summary_large_image',
      title: `What is ${termTitle}?`,
      description: term.meaning,
    },
    alternates: {
      canonical: `https://thetutorbridge.com/learning-gtm/${term.slug}`,
    },
    other: {
      'article:section': categoryInfo?.name || 'GTM Terms',
      'article:tag': term.term,
    },
  };
}

export default async function GTMTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) {
    notFound();
  }

  return <GTMLessonContent term={term} />;
}
