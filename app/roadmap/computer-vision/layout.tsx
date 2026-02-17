import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Vision Engineer Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master computer vision with our comprehensive 2026 roadmap. Learn OpenCV, deep learning, CNNs, object detection, image segmentation, and visual AI. Start your computer vision career today!',
  keywords: [
    'computer vision roadmap',
    'computer vision engineer roadmap',
    'computer vision roadmap 2026',
    'cv engineer learning path',
    'opencv tutorial',
    'deep learning vision',
    'cnn image classification',
    'object detection yolo',
    'image segmentation',
    'pytorch computer vision',
    'tensorflow vision',
    'image processing',
    'computer vision salary',
    'computer vision jobs',
    'vision engineer interview',
    'autonomous vehicles vision',
    'medical imaging ai',
    'face recognition',
    'pose estimation',
    'ocr development',
    'video analytics',
    'edge ai vision',
    'computer vision projects',
    'vision transformers',
    'sam segment anything',
    'diffusion models',
    'generative ai vision',
    'real time detection',
    'camera calibration',
    '3d computer vision'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/computer-vision',
  },
  openGraph: {
    title: 'Computer Vision Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master computer vision with our comprehensive 2026 roadmap. Learn OpenCV, deep learning, CNNs, object detection, and visual AI.',
    url: 'https://www.thetutorbridge.com/roadmap/computer-vision',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [{ url: 'https://www.thetutorbridge.com/og-image.png', width: 1200, height: 630, alt: 'Computer Vision Engineer Roadmap 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Computer Vision Engineer Roadmap 2026 - Complete Learning Path',
    description: 'Master computer vision with our comprehensive 2026 roadmap. Learn OpenCV, deep learning, CNNs, object detection, and visual AI.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function ComputerVisionRoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
