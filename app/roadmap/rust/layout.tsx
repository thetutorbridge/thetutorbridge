import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rust Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Rust with our comprehensive 2026 roadmap. Learn ownership, borrowing, lifetimes, async programming, WebAssembly, and systems programming. Start your Rust career today!',
  keywords: [
    'rust developer roadmap',
    'rust developer roadmap 2026',
    'rust learning path',
    'rust programming',
    'rust ownership',
    'rust borrowing',
    'rust lifetimes',
    'rust async',
    'rust webassembly',
    'rust wasm',
    'rust systems programming',
    'rust cargo',
    'rust traits',
    'rust concurrency',
    'rust memory safety',
    'rust tokio',
    'rust actix',
    'rust career',
    'rust jobs',
    'rust developer',
    'rust vs go',
    'rust vs c++',
    'rust for beginners',
    'rust tutorial',
    'rust certification',
    'rust interview',
    'rust skills',
    'rust embedded',
    'rust cli',
    'rust backend'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/rust',
  },
  openGraph: {
    title: 'Rust Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Rust with our comprehensive 2026 roadmap. Learn ownership, borrowing, lifetimes, async programming, WebAssembly, and systems programming.',
    url: 'https://www.thetutorbridge.com/roadmap/rust',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rust Developer Roadmap 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rust Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Rust with our comprehensive 2026 roadmap. Learn ownership, borrowing, lifetimes, async programming, WebAssembly, and systems programming.',
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

export default function RustRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
