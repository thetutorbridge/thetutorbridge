import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWordProblemBySlug, getAllWordProblemSlugs } from '@/lib/word-problems-data';
import WordProblemPageContent from '@/components/word-problem-page-content';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllWordProblemSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = getWordProblemBySlug(params.slug);

  if (!data) {
    return {
      title: 'Word Problems | The Tutor Bridge',
    };
  }

  const title = `${data.title} - Step-by-Step Solution`;
  const description = `${data.problem} Learn how to solve this ${data.category.replace('-', ' ')} with detailed steps, explanations, and tips. ${data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)} level for ${data.gradeLevel}.`;

  return {
    title,
    description,
    keywords: [
      'word problems',
      data.category.replace('-', ' '),
      data.subcategory.replace('-', ' '),
      `${data.difficulty} word problems`,
      data.gradeLevel,
      ...data.tags,
    ],
    alternates: {
      canonical: `https://www.thetutorbridge.com/word-problems/${params.slug}`,
    },
    openGraph: {
      title,
      description: data.problem,
      url: `https://www.thetutorbridge.com/word-problems/${params.slug}`,
      siteName: 'The Tutor Bridge',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: `Answer: ${data.answerFormatted}`,
    },
  };
}

export default function WordProblemPage({ params }: PageProps) {
  const data = getWordProblemBySlug(params.slug);

  if (!data) {
    notFound();
  }

  return <WordProblemPageContent data={data} />;
}
