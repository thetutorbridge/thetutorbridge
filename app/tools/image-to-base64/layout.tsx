import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image to Base64 - Convert Images to Base64 Strings Free',
  description: 'Free image to Base64 converter. Convert images to Base64 encoded strings. Perfect for embedding images in CSS, HTML, or JSON.',
  keywords: ['image to base64', 'base64 converter', 'encode image'],
  openGraph: {
    title: 'Free Image to Base64 Converter',
    description: 'Convert images to Base64.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/image-to-base64',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to Base64',
    description: 'Convert images.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/image-to-base64',
  },
};

export default function ImageToBase64Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
