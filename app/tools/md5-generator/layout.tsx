import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MD5 Hash Generator - Generate MD5 & SHA-256 Hashes Free',
  description: 'Free online MD5 and SHA-256 hash generator. Generate cryptographic hashes from any text instantly. 100% secure - all hashing done locally in your browser. Perfect for checksums and verification.',
  keywords: [
    'md5 generator',
    'md5 hash',
    'generate md5',
    'md5 checksum',
    'sha256 generator',
    'hash generator',
    'online md5',
    'md5 tool',
    'hash calculator',
    'checksum generator',
  ],
  openGraph: {
    title: 'Free MD5 & SHA-256 Hash Generator',
    description: 'Generate cryptographic hashes instantly. 100% secure and private.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/md5-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Hash Generator',
    description: 'Generate MD5 and SHA-256 hashes instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/md5-generator',
  },
};

export default function MD5GeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
