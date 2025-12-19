import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 9 Notes – Methods of Separation in Everyday Life (Handpicking, Sieving, Filtration & More)',
  description: 'Get Class 6 Science Chapter 9 notes – Methods of Separation in Everyday Life. Covers handpicking, threshing, winnowing, sieving, sedimentation, decantation, filtration, evaporation, churning, magnetic separation, and practical applications with daily life examples.',
  keywords: 'class 6 science chapter 9, methods of separation, handpicking, sieving, filtration, evaporation, winnowing, threshing, magnetic separation, class 6 science notes, separation techniques',
  openGraph: {
    title: 'Class 6 Science Chapter 9 Notes – Methods of Separation in Everyday Life',
    description: 'Get Class 6 Science Chapter 9 notes – Methods of Separation in Everyday Life. Covers handpicking, threshing, winnowing, sieving, sedimentation, decantation, filtration, evaporation, churning, magnetic separation, and practical applications with daily life examples.',
    type: 'website',
    siteName: 'The Tutor Bridge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Class 6 Science Chapter 9 - Methods of Separation in Everyday Life - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 6 Science Chapter 9 Notes – Methods of Separation in Everyday Life',
    description: 'Get Class 6 Science Chapter 9 notes – Methods of Separation in Everyday Life. Covers handpicking, threshing, winnowing, sieving, sedimentation, decantation, filtration, evaporation, churning, magnetic separation, and practical applications with daily life examples.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/study-resources/class-6/science/chapter-9-methods-of-separation-in-everyday-life',
  },
};

export default function Chapter9Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
