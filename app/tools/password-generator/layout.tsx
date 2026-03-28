import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator - Create Strong & Secure Random Passwords Free',
  description: 'Free online password generator. Create strong, secure, random passwords instantly. Customize length (4-64 characters) and character types. 100% secure - generated locally in your browser.',
  keywords: [
    'password generator',
    'random password generator',
    'strong password generator',
    'secure password generator',
    'free password generator',
    'generate password online',
    'password creator',
    'password maker',
    'random password',
    'strong password',
    'secure password',
    'password strength',
  ],
  openGraph: {
    title: 'Free Strong Password Generator - Create Secure Random Passwords',
    description: 'Generate strong, secure passwords with customizable length and character types. 100% secure and private.',
    type: 'website',
    url: 'https://www.thetutorbridge.com/tools/password-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Secure Password Generator',
    description: 'Create strong passwords instantly with our free online tool.',
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/tools/password-generator',
  },
};

export default function PasswordGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
