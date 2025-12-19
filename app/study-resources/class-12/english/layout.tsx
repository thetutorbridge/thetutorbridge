import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 12 English Study Resources",
  description: "Complete Class 12 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
  keywords: "english literature, grammar, writing skills, study materials class 12",
  openGraph: {
    title: "Class 12 English Study Resources",
    description: "Complete Class 12 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 12 English Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 12 English Study Resources",
    description: "Complete Class 12 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-12/english",
  },
};

export default function Class12EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
