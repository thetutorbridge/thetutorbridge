import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 6 English Study Resources",
  description: "Complete Class 6 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
  keywords: "english literature, grammar, writing skills, study materials class 6",
  openGraph: {
    title: "Class 6 English Study Resources",
    description: "Complete Class 6 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 6 English Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 6 English Study Resources",
    description: "Complete Class 6 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-6/english",
  },
};

export default function Class6EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
