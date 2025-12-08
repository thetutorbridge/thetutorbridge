import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Firmware Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master firmware development with our comprehensive 2026 roadmap. Learn embedded C, microcontrollers, bootloaders, device drivers, and hardware debugging. Start your firmware engineering career today!',
  keywords: [
    'firmware engineer roadmap',
    'firmware developer roadmap',
    'firmware engineer roadmap 2026',
    'firmware programming',
    'embedded firmware',
    'bootloader development',
    'device driver development',
    'low level programming',
    'microcontroller firmware',
    'firmware debugging',
    'jtag debugging',
    'bare metal programming',
    'firmware update',
    'ota firmware',
    'firmware security',
    'firmware engineer salary',
    'firmware engineer jobs',
    'firmware engineer interview',
    'firmware vs embedded',
    'hardware abstraction layer',
    'bsp development',
    'firmware testing',
    'flash programming',
    'memory management firmware',
    'interrupt handling',
    'dma programming',
    'firmware optimization',
    'firmware architecture',
    'firmware certification',
    'automotive firmware'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/firmware-engineer',
  },
  openGraph: {
    title: 'Firmware Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master firmware development with our comprehensive 2026 roadmap. Learn embedded C, microcontrollers, bootloaders, and device drivers.',
    url: 'https://www.thetutorbridge.com/roadmap/firmware-engineer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Firmware Engineer Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Firmware Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master firmware development with our comprehensive 2026 roadmap. Learn embedded C, microcontrollers, bootloaders, and device drivers.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function FirmwareEngineerRoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
