import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 8 Maths Study Resources",
  description: "Complete Class 8 maths study resources including all chapters. Complete Maths study materials including all chapters covering algebra, geometry, arithmetic, and statistics concepts. Free notes, explanations, and practice questions.",
  keywords: "mathematics, math notes, algebra geometry arithmetic, study materials class 8",
  openGraph: {
    title: "Class 8 Maths Study Resources",
    description: "Complete Class 8 maths study resources including all chapters. Complete Maths study materials including all chapters covering algebra, geometry, arithmetic, and statistics concepts. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 8 Maths Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 8 Maths Study Resources",
    description: "Complete Class 8 maths study resources including all chapters. Complete Maths study materials including all chapters covering algebra, geometry, arithmetic, and statistics concepts. Free notes, explanations, and practice questions.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-8/maths",
  },
};

export default function Class8MathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
