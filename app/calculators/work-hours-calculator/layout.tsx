import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work Hours Calculator - Free Time Card & Timesheet Calculator with Overtime | The Tutor Bridge',
  description: 'Free work hours calculator with automatic overtime tracking, break deductions, and printable time cards. Calculate weekly hours in decimal and hh:mm format for payroll. Perfect for employees, freelancers, and time tracking.',
  keywords: [
    'work hours calculator',
    'time card calculator',
    'timesheet calculator',
    'hours calculator',
    'overtime calculator',
    'calculate work hours',
    'time clock calculator',
    'payroll hours calculator',
    'weekly hours calculator',
    'work time calculator',
    'time tracking calculator',
    'hours and minutes calculator',
    'decimal hours calculator',
    'shift hours calculator',
    'employee hours calculator',
    'labor hours calculator',
    'clock in clock out calculator',
    'punch clock calculator',
    'billable hours calculator',
    'work schedule calculator',
    'time sheet calculator',
    'calculate overtime hours',
    'break time calculator',
    'total hours worked calculator',
    'hours worked per week calculator',
  ],
  authors: [{ name: 'The Tutor Bridge' }],
  creator: 'The Tutor Bridge',
  publisher: 'The Tutor Bridge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.thetutorbridge.com/calculators/work-hours-calculator',
  },
  openGraph: {
    title: 'Work Hours Calculator - Free Time Card & Overtime Calculator',
    description: 'Calculate total work hours, breaks, and overtime automatically. Free timesheet calculator with printable time cards. Perfect for payroll and time tracking.',
    url: 'https://www.thetutorbridge.com/calculators/work-hours-calculator',
    siteName: 'The Tutor Bridge',
    type: 'website',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Work Hours Calculator - The Tutor Bridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work Hours Calculator - Free Timesheet & Overtime Calculator',
    description: 'Calculate work hours with automatic overtime tracking and break deductions. Free time card calculator for payroll.',
    images: ['https://www.thetutorbridge.com/og-calculator.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function WorkHoursCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
