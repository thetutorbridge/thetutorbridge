import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPercentageBySlug, getAllPercentageSlugs } from '@/lib/percentage-data';
import PercentagePageContent from '@/components/percentage-page-content';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPercentageSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = getPercentageBySlug(params.slug);

  if (!data) {
    return {
      title: 'Percentage Calculator | The Tutor Bridge',
    };
  }

  const title = `What is ${data.percent}% of ${data.of}? Calculate ${data.percent} Percent of ${data.of}`;
  const description = `What is ${data.percent}% of ${data.of}? The answer is ${data.resultFormatted}. Learn how to calculate ${data.percent} percent of ${data.of} with step-by-step solutions.`;

  return {
    title,
    description,
    keywords: [
      `${data.percent}% of ${data.of}`,
      `what is ${data.percent}% of ${data.of}`,
      `${data.percent} percent of ${data.of}`,
      'percentage calculator',
      'percent calculation',
      'percentage math',
      'how to calculate percentage',
    ],
    alternates: {
      canonical: `https://www.thetutorbridge.com/percentage/${data.slug}`,
    },
    openGraph: {
      title: `What is ${data.percent}% of ${data.of}?`,
      description: `The answer is ${data.resultFormatted}. Learn how to calculate ${data.percent} percent of ${data.of} with step-by-step solutions.`,
      url: `https://www.thetutorbridge.com/percentage/${data.slug}`,
      siteName: 'The Tutor Bridge',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `What is ${data.percent}% of ${data.of}?`,
      description: `The answer is ${data.resultFormatted}. Step-by-step percentage calculation guide.`,
    },
  };
}

export default function PercentagePage({ params }: PageProps) {
  const data = getPercentageBySlug(params.slug);

  if (!data) {
    notFound();
  }

  return <PercentagePageContent data={data} />;
}
