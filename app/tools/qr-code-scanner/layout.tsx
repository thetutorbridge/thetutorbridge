import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code Scanner - Scan QR Codes Free Online',
  description: 'Free QR code scanner. Scan and decode QR codes from images. Perfect for reading QR codes quickly and easily.',
  keywords: ['qr scanner', 'scan qr code', 'decode qr code'],
  openGraph: {
    title: 'Free QR Code Scanner',
    description: 'Scan QR codes from images.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/qr-code-scanner',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Scanner',
    description: 'Scan QR codes.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/qr-code-scanner',
  },
};

export default function QrCodeScannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
