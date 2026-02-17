import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blockchain Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master blockchain development with our comprehensive 2026 roadmap. Learn Solidity, smart contracts, DeFi, Web3, Ethereum & more. Step-by-step guide from beginner to professional blockchain developer with salary insights and project ideas.',
  keywords: [
    'blockchain developer roadmap',
    'blockchain developer roadmap 2026',
    'how to become a blockchain developer',
    'blockchain developer learning path',
    'blockchain developer skills',
    'solidity roadmap',
    'smart contract developer roadmap',
    'blockchain developer career path',
    'web3 developer roadmap',
    'ethereum developer roadmap',
    'blockchain developer salary',
    'blockchain developer jobs',
    'blockchain developer portfolio',
    'blockchain developer projects',
    'learn blockchain development',
    'blockchain developer course',
    'blockchain developer tutorial',
    'defi developer',
    'nft developer',
    'crypto developer',
    'smart contracts',
    'blockchain for beginners',
    'blockchain developer certification',
    'blockchain developer interview',
    'blockchain developer resume',
    'hardhat truffle',
    'blockchain developer technologies',
    'blockchain developer tools',
    'ethers.js web3.js',
    'dapp development',
    'dao development',
    'layer 2 scaling',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/blockchain',
  },
  openGraph: {
    title: 'Blockchain Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master blockchain development with our comprehensive 2026 roadmap. Step-by-step guide covering Solidity, smart contracts, DeFi, Web3, and Ethereum.',
    url: 'https://www.thetutorbridge.com/roadmap/blockchain',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blockchain Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blockchain Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master blockchain development with our comprehensive 2026 roadmap. Solidity, smart contracts, DeFi & Web3.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
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

export default function BlockchainRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
