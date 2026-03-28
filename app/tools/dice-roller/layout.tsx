import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dice Roller - Roll Virtual Dice Free Online',
  description: 'Free dice roller. Roll virtual dice with custom sides and quantities. Perfect for games, D&D, and decision making.',
  keywords: ['dice roller', 'roll dice', 'virtual dice'],
  openGraph: {
    title: 'Free Dice Roller',
    description: 'Roll virtual dice.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/dice-roller',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dice Roller',
    description: 'Roll dice online.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/dice-roller',
  },
};

export default function DiceRollerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
