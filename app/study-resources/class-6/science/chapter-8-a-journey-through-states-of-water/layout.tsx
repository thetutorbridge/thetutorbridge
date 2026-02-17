import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Class 6 Science Chapter 8 Notes – A Journey Through States of Water (Evaporation, Condensation & Water Cycle)',
  description: 'Get Class 6 Science Chapter 8 notes – A Journey Through States of Water. Clear explanations of states (solid, liquid, gas), evaporation, condensation, melting/freezing, factors affecting drying, cooling by evaporation, cloud formation, and the water cycle—plus activities and HOTS questions.',
  keywords: 'class 6 science chapter 8, states of water, evaporation, condensation, water cycle, melting freezing, class 6 science notes, water states, science study materials',
  openGraph: {
    title: 'Class 6 Science Chapter 8 Notes – A Journey Through States of Water',
    description: 'Get Class 6 Science Chapter 8 notes – A Journey Through States of Water. Clear explanations of states (solid, liquid, gas), evaporation, condensation, melting/freezing, factors affecting drying, cooling by evaporation, cloud formation, and the water cycle—plus activities and HOTS questions.',
    type: 'website',
    siteName: 'The Tutor Bridge',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Class 6 Science Chapter 8 - A Journey Through States of Water - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 6 Science Chapter 8 Notes – A Journey Through States of Water',
    description: 'Get Class 6 Science Chapter 8 notes – A Journey Through States of Water. Clear explanations of states (solid, liquid, gas), evaporation, condensation, melting/freezing, factors affecting drying, cooling by evaporation, cloud formation, and the water cycle—plus activities and HOTS questions.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/study-resources/class-6/science/chapter-8-a-journey-through-states-of-water',
  },
};

export default function Chapter8Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
