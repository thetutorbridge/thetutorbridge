import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Roadmaps 2026 - Complete Learning Paths | The Tutor Bridge',
  description: 'Explore comprehensive career roadmaps for software development, data science, DevOps, and more. Step-by-step guides with skills, salaries, and project ideas to launch your tech career.',
  keywords: [
    'career roadmap',
    'developer roadmap',
    'full stack developer roadmap',
    'frontend developer roadmap',
    'backend developer roadmap',
    'data scientist roadmap',
    'devops engineer roadmap',
    'software engineer career path',
    'tech career guide',
    'learning path',
    'skill development',
    'programming roadmap',
    'web developer guide',
    'tech career roadmap 2026',
  ],
  authors: [{ name: 'The Tutor Bridge' }],
  creator: 'The Tutor Bridge',
  publisher: 'The Tutor Bridge',
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap',
  },
  openGraph: {
    title: 'Career Roadmaps 2026 - Complete Learning Paths',
    description: 'Explore comprehensive career roadmaps for tech roles. Step-by-step guides with skills, salaries, and project ideas.',
    url: 'https://www.thetutorbridge.com/roadmap',
    siteName: 'The Tutor Bridge',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Roadmaps 2026 - Complete Learning Paths',
    description: 'Explore comprehensive career roadmaps for tech roles.',
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

// Structured data for roadmaps collection
const roadmapCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Career Roadmaps 2026",
  "description": "50+ comprehensive career roadmaps for software development, data science, DevOps, and more tech roles.",
  "url": "https://www.thetutorbridge.com/roadmap",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Career Roadmaps",
    "numberOfItems": 50,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Frontend Developer Roadmap", "url": "https://www.thetutorbridge.com/roadmap/frontend-developer" },
      { "@type": "ListItem", "position": 2, "name": "Backend Developer Roadmap", "url": "https://www.thetutorbridge.com/roadmap/backend-developer" },
      { "@type": "ListItem", "position": 3, "name": "Full Stack Developer Roadmap", "url": "https://www.thetutorbridge.com/roadmap/full-stack-developer" },
      { "@type": "ListItem", "position": 4, "name": "Data Scientist Roadmap", "url": "https://www.thetutorbridge.com/roadmap/data-scientist" },
      { "@type": "ListItem", "position": 5, "name": "DevOps Engineer Roadmap", "url": "https://www.thetutorbridge.com/roadmap/devops" },
      { "@type": "ListItem", "position": 6, "name": "AI Engineer Roadmap", "url": "https://www.thetutorbridge.com/roadmap/ai-engineer" },
      { "@type": "ListItem", "position": 7, "name": "React Developer Roadmap", "url": "https://www.thetutorbridge.com/roadmap/react" },
      { "@type": "ListItem", "position": 8, "name": "Python Developer Roadmap", "url": "https://www.thetutorbridge.com/roadmap/python-developer" },
    ]
  },
  "provider": {
    "@type": "Organization",
    "name": "The Tutor Bridge",
    "url": "https://www.thetutorbridge.com"
  }
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.thetutorbridge.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Career Roadmaps",
      "item": "https://www.thetutorbridge.com/roadmap"
    }
  ]
};

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roadmapCollectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
