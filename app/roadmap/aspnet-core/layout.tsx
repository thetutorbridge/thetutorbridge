import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ASP.NET Core Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master ASP.NET Core with our comprehensive 2026 roadmap. Learn C#, .NET fundamentals, Web APIs, Entity Framework, authentication, and cloud deployment. Step-by-step guide from beginner to professional .NET developer with salary insights.',
  keywords: [
    'asp.net core roadmap',
    'asp.net core roadmap 2026',
    'how to become a .net developer',
    '.net developer learning path',
    'asp.net core skills',
    'c# roadmap',
    '.net developer roadmap',
    'asp.net core career',
    '.net developer guide',
    '.net developer salary',
    '.net developer jobs',
    '.net developer portfolio',
    '.net developer projects',
    'learn asp.net core',
    '.net developer course',
    'asp.net core tutorial',
    'c#',
    '.net 8',
    'entity framework',
    'web api',
    'blazor',
    'azure',
    'asp.net for beginners',
    '.net developer certification',
    '.net developer interview',
    '.net developer resume',
    'minimal api',
    '.net developer technologies',
    '.net developer tools',
    'sql server',
    'identity',
    'microservices',
    'signalr',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/aspnet-core',
  },
  openGraph: {
    title: 'ASP.NET Core Roadmap 2026 - Complete Learning Path',
    description: 'Master ASP.NET Core with our comprehensive 2026 roadmap. C#, Web APIs, Entity Framework, and Azure deployment.',
    url: 'https://www.thetutorbridge.com/roadmap/aspnet-core',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-aspnet-core-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'ASP.NET Core Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASP.NET Core Roadmap 2026 - Complete Learning Path',
    description: 'Master ASP.NET Core with our comprehensive 2026 roadmap. C#, Web APIs & Entity Framework.',
    images: ['https://www.thetutorbridge.com/og-aspnet-core-roadmap.png'],
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

export default function AspNetCoreRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
