import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 9 English Study Resources",
  description: "Complete Class 9 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
  keywords: "english literature, grammar, writing skills, study materials class 9",
  openGraph: {
    title: "Class 9 English Study Resources",
    description: "Complete Class 9 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 9 English Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 9 English Study Resources",
    description: "Complete Class 9 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-9/english",
  },
};

export default function Class9EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
