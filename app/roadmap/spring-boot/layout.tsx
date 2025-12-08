import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spring Boot Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master Spring Boot with our comprehensive 2026 roadmap. Learn Java, Spring Framework, REST APIs, JPA, security, microservices, and cloud deployment. Step-by-step guide from beginner to professional Spring developer with salary insights.',
  keywords: [
    'spring boot roadmap',
    'spring boot roadmap 2026',
    'how to become a spring developer',
    'spring boot learning path',
    'spring boot skills',
    'java spring roadmap',
    'spring boot career',
    'spring boot guide',
    'spring boot salary',
    'spring developer jobs',
    'spring boot portfolio',
    'spring boot projects',
    'learn spring boot',
    'spring boot course',
    'spring boot tutorial',
    'spring framework',
    'spring data jpa',
    'spring security',
    'microservices spring',
    'spring cloud',
    'hibernate',
    'spring boot for beginners',
    'spring certification',
    'spring boot interview',
    'spring developer resume',
    'rest api spring',
    'spring boot technologies',
    'spring boot tools',
    'maven gradle',
    'spring webflux',
    'enterprise java',
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
    canonical: 'https://www.thetutorbridge.com/roadmap/spring-boot',
  },
  openGraph: {
    title: 'Spring Boot Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Spring Boot with our comprehensive 2026 roadmap. REST APIs, JPA, security, and microservices.',
    url: 'https://www.thetutorbridge.com/roadmap/spring-boot',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-spring-boot-roadmap.png',
        width: 1200,
        height: 630,
        alt: 'Spring Boot Developer Roadmap 2026 - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spring Boot Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master Spring Boot with our comprehensive 2026 roadmap. REST APIs, JPA & microservices.',
    images: ['https://www.thetutorbridge.com/og-spring-boot-roadmap.png'],
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

export default function SpringBootRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
