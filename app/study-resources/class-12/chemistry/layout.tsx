import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 12 Chemistry Study Resources",
  description: "Complete Class 12 chemistry study resources including all chapters. Complete Chemistry study materials including all chapters covering organic, inorganic, and physical chemistry. Free notes, explanations, and practice questions.",
  keywords: "chemistry notes, organic inorganic physical chemistry, study materials class 12",
  openGraph: {
    title: "Class 12 Chemistry Study Resources",
    description: "Complete Class 12 chemistry study resources including all chapters. Complete Chemistry study materials including all chapters covering organic, inorganic, and physical chemistry. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 12 Chemistry Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 12 Chemistry Study Resources",
    description: "Complete Class 12 chemistry study resources including all chapters. Complete Chemistry study materials including all chapters covering organic, inorganic, and physical chemistry. Free notes, explanations, and practice questions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-12/chemistry",
  },
};

export default function Class12ChemistryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
