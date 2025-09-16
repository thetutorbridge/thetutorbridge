import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 10 Notes – Living Creatures: Exploring their Characteristics (MRS GREN + D, Germination & Plant Growth)',
  description: 'Get Class 6 Science Chapter 10 notes – Living Creatures: Exploring their Characteristics. Covers MRS GREN + D life processes, germination conditions, plant growth and movement, phototropism, geotropism, and practical activities with daily life examples.',
  keywords: 'class 6 science chapter 10, living creatures, MRS GREN, life processes, germination, plant growth, phototropism, geotropism, living vs non-living, class 6 science notes',
  openGraph: {
    title: 'Class 6 Science Chapter 10 Notes – Living Creatures: Exploring their Characteristics',
    description: 'Get Class 6 Science Chapter 10 notes – Living Creatures: Exploring their Characteristics. Covers MRS GREN + D life processes, germination conditions, plant growth and movement, phototropism, geotropism, and practical activities with daily life examples.',
    type: 'website',
    siteName: 'The Tutor Bridge',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Class 6 Science Chapter 10 - Living Creatures: Exploring their Characteristics - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 6 Science Chapter 10 Notes – Living Creatures: Exploring their Characteristics',
    description: 'Get Class 6 Science Chapter 10 notes – Living Creatures: Exploring their Characteristics. Covers MRS GREN + D life processes, germination conditions, plant growth and movement, phototropism, geotropism, and practical activities with daily life examples.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/study-resources/class-6/science/chapter-10-living-creatures-exploring-their-characteristics',
  },
};

export default function Chapter10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
