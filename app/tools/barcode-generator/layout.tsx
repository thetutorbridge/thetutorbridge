import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barcode Generator - Create Barcodes Free Online',
  description: 'Free barcode generator. Create EAN, UPC, and Code 128 barcodes instantly. Perfect for products and inventory.',
  keywords: ['barcode generator', 'create barcode', 'ean barcode'],
  openGraph: {
    title: 'Free Barcode Generator',
    description: 'Generate barcodes instantly.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/barcode-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barcode Generator',
    description: 'Create barcodes.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/barcode-generator',
  },
};

export default function BarcodeGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
