import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code Generator - Create QR Codes Free Online',
  description: 'Free QR code generator. Create QR codes for URLs, text, contact info, WiFi, and more. Download in multiple sizes. Perfect for marketing and business.',
  keywords: [
    'qr code generator',
    'create qr code',
    'qr code maker',
    'generate qr code',
    'free qr code',
    'qr code creator',
    'barcode generator',
  ],
  openGraph: {
    title: 'Free QR Code Generator',
    description: 'Create QR codes instantly for free.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/qr-code-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator',
    description: 'Create QR codes instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/qr-code-generator',
  },
};

export default function QrCodeGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
