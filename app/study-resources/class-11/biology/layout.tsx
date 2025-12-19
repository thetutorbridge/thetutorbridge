import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 11 Biology Study Resources",
  description: "Complete Class 11 biology study resources including all chapters. Complete Biology study materials including all chapters covering botany, zoology, genetics, and ecology. Free notes, explanations, and practice questions.",
  keywords: "biology notes, botany zoology genetics ecology, study materials class 11",
  openGraph: {
    title: "Class 11 Biology Study Resources",
    description: "Complete Class 11 biology study resources including all chapters. Complete Biology study materials including all chapters covering botany, zoology, genetics, and ecology. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 11 Biology Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 11 Biology Study Resources",
    description: "Complete Class 11 biology study resources including all chapters. Complete Biology study materials including all chapters covering botany, zoology, genetics, and ecology. Free notes, explanations, and practice questions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-11/biology",
  },
};

export default function Class11BiologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
