import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Temperature Converter - Convert Celsius, Fahrenheit, Kelvin Free',
  description: 'Free online temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly. Includes common temperature references and conversion formulas. Perfect for cooking, science, and travel.',
  keywords: [
    'temperature converter',
    'celsius to fahrenheit',
    'fahrenheit to celsius',
    'celsius to kelvin',
    'kelvin to celsius',
    'temperature conversion',
    'convert temperature',
    'temp converter',
    'c to f',
    'f to c',
  ],
  openGraph: {
    title: 'Free Temperature Converter - Celsius, Fahrenheit, Kelvin',
    description: 'Convert between temperature scales instantly. Includes formulas and common temperatures.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/temperature-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Temperature Converter',
    description: 'Convert Celsius, Fahrenheit, Kelvin instantly.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/temperature-converter',
  },
};

export default function TemperatureConverterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
