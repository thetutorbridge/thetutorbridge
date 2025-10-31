import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hours Calculator — Calculate Time Between Two Times with Breaks',
  description: 'Free hours calculator to calculate time difference between two times. Get results in hours:minutes format, decimal hours, and total minutes. Perfect for work hours, shift calculations, and time tracking.',
  keywords: "hours calculator, time calculator, work hours calculator, calculate hours between times, time difference calculator, hours and minutes calculator, shift calculator, timesheet calculator",
  openGraph: {
    title: "Hours Calculator — Calculate Time Difference & Work Hours",
    description: "Calculate hours and minutes between two times. Free online time calculator with break deductions and multiple format outputs.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [{url: "/og-image.jpg", width: 1200, height: 630, alt: "Hours Calculator"}],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/calculators/hours-calculator",
  },
};

export default function HoursCalculatorLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
