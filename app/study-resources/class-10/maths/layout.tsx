import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 10 Maths Study Resources",
  description: "Complete Class 10 maths study resources including all chapters. Complete Maths study materials including all chapters covering algebra, geometry, arithmetic, and statistics concepts. Free notes, explanations, and practice questions.",
  keywords: "mathematics, math notes, algebra geometry arithmetic, study materials class 10",
  openGraph: {
    title: "Class 10 Maths Study Resources",
    description: "Complete Class 10 maths study resources including all chapters. Complete Maths study materials including all chapters covering algebra, geometry, arithmetic, and statistics concepts. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 10 Maths Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 10 Maths Study Resources",
    description: "Complete Class 10 maths study resources including all chapters. Complete Maths study materials including all chapters covering algebra, geometry, arithmetic, and statistics concepts. Free notes, explanations, and practice questions.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-10/maths",
  },
};

export default function Class10MathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
