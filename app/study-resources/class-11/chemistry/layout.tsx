import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 11 Chemistry Study Resources",
  description: "Complete Class 11 chemistry study resources including all chapters. Complete Chemistry study materials including all chapters covering organic, inorganic, and physical chemistry. Free notes, explanations, and practice questions.",
  keywords: "chemistry notes, organic inorganic physical chemistry, study materials class 11",
  openGraph: {
    title: "Class 11 Chemistry Study Resources",
    description: "Complete Class 11 chemistry study resources including all chapters. Complete Chemistry study materials including all chapters covering organic, inorganic, and physical chemistry. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 11 Chemistry Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 11 Chemistry Study Resources",
    description: "Complete Class 11 chemistry study resources including all chapters. Complete Chemistry study materials including all chapters covering organic, inorganic, and physical chemistry. Free notes, explanations, and practice questions.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-11/chemistry",
  },
};

export default function Class11ChemistryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
