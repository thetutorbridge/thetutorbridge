import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AR/VR Developer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master AR/VR development with our comprehensive 2026 roadmap. Learn Unity, Unreal Engine, Meta Quest, Apple Vision Pro, 3D development, and spatial computing. Start your XR career today!',
  keywords: [
    'ar vr developer roadmap',
    'ar developer roadmap',
    'vr developer roadmap',
    'xr developer roadmap 2026',
    'augmented reality development',
    'virtual reality development',
    'unity xr tutorial',
    'unreal engine vr',
    'meta quest development',
    'apple vision pro development',
    'mixed reality',
    'spatial computing',
    '3d development',
    'arvr skills',
    'ar vr salary',
    'ar vr jobs',
    'metaverse development',
    'vr game development',
    'ar app development',
    'openxr',
    'webxr',
    'hand tracking',
    'spatial audio',
    'vr optimization',
    'ar sdk',
    'arkit arcore',
    'vr ux design',
    'immersive technology',
    'arvr interview',
    'extended reality'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/ar-vr-developer',
  },
  openGraph: {
    title: 'AR/VR Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master AR/VR development with our comprehensive 2026 roadmap. Learn Unity, Unreal Engine, Meta Quest, and spatial computing.',
    url: 'https://www.thetutorbridge.com/roadmap/ar-vr-developer',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: 'https://www.thetutorbridge.com/og-image.png', width: 1200, height: 630, alt: 'AR/VR Developer Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AR/VR Developer Roadmap 2026 - Complete Learning Path',
    description: 'Master AR/VR development with our comprehensive 2026 roadmap. Learn Unity, Unreal Engine, Meta Quest, and spatial computing.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function ARVRDeveloperRoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
