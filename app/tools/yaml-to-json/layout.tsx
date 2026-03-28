import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YAML to JSON Converter - Convert YAML to JSON Free Online',
  description: 'Free YAML to JSON converter. Convert YAML data to JSON format instantly. Perfect for developers and data conversion.',
  keywords: ['yaml to json', 'convert yaml', 'yaml converter'],
  openGraph: {
    title: 'Free YAML to JSON Converter',
    description: 'Convert YAML to JSON.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/yaml-to-json',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YAML to JSON Converter',
    description: 'Convert YAML.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/yaml-to-json',
  },
};

export default function YamlToJsonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
