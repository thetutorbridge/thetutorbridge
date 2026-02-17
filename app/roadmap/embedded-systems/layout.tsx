import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Embedded Systems Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master embedded systems with our comprehensive 2026 roadmap. Learn microcontrollers, RTOS, C/C++, hardware interfaces, IoT, and embedded Linux. Start your embedded systems career today!',
  keywords: [
    'embedded systems roadmap',
    'embedded systems engineer roadmap',
    'embedded systems roadmap 2026',
    'embedded programming',
    'microcontroller programming',
    'rtos development',
    'embedded c programming',
    'arm microcontroller',
    'stm32 tutorial',
    'arduino to professional',
    'embedded linux',
    'iot development',
    'hardware programming',
    'embedded software engineer',
    'embedded systems salary',
    'embedded systems jobs',
    'embedded systems career',
    'real time systems',
    'bare metal programming',
    'peripheral interfaces',
    'spi i2c uart',
    'embedded debugging',
    'pcb design basics',
    'signal processing embedded',
    'automotive embedded',
    'medical devices embedded',
    'embedded systems interview',
    'embedded systems certification',
    'firmware vs embedded',
    'embedded systems projects'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/embedded-systems',
  },
  openGraph: {
    title: 'Embedded Systems Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master embedded systems with our comprehensive 2026 roadmap. Learn microcontrollers, RTOS, C/C++, and embedded Linux.',
    url: 'https://www.thetutorbridge.com/roadmap/embedded-systems',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: 'https://www.thetutorbridge.com/og-image.png', width: 1200, height: 630, alt: 'Embedded Systems Engineer Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Embedded Systems Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master embedded systems with our comprehensive 2026 roadmap. Learn microcontrollers, RTOS, C/C++, and embedded Linux.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function EmbeddedSystemsRoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
