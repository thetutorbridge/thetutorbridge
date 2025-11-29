import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minecraft Circle Generator - Free Pixel Circle Maker | The Tutor Bridge',
  description: 'Free Minecraft circle generator to create perfect pixel circles for your builds. Generate circles and ovals of any diameter with customizable thickness. Visual block grid included.',
  keywords: [
    'minecraft circle generator',
    'minecraft circle',
    'pixel circle generator',
    'minecraft oval generator',
    'minecraft circle chart',
    'minecraft circle template',
    'minecraft circle maker',
    'pixel circle maker',
    'minecraft building tool',
    'minecraft dome generator',
    'minecraft tower circle',
    'block circle generator',
    'minecraft pixel art',
    'minecraft circle guide',
    'how to make circles in minecraft',
    'minecraft circle blueprint',
    'minecraft round building',
    'minecraft sphere generator',
    'voxel circle',
    'minecraft circle sizes',
    'minecraft circle diameter',
    'minecraft architecture',
    'minecraft building helper',
    'minecraft circle calculator',
    'pixel perfect circle',
    'minecraft construction',
    'minecraft circle pattern',
    'minecraft hollow circle',
    'minecraft filled circle',
    'free minecraft circle generator',
    'online circle generator',
  ],
  authors: [{ name: 'The Tutor Bridge' }],
  creator: 'The Tutor Bridge',
  publisher: 'The Tutor Bridge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/calculators/minecraft-circle-generator',
  },
  openGraph: {
    title: 'Minecraft Circle Generator - Pixel Circle Maker',
    description: 'Generate perfect pixel circles for Minecraft builds. Customize diameter and thickness with visual block grid.',
    url: 'https://thetutorbridge.com/calculators/minecraft-circle-generator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Minecraft Circle Generator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minecraft Circle Generator - Free Tool',
    description: 'Create perfect pixel circles for Minecraft. Free circle generator with visual grid.',
    images: ['https://thetutorbridge.com/og-calculator.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function MinecraftCircleGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
