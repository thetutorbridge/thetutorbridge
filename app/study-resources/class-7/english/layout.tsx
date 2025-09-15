import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 7 English Study Resources",
  description: "Complete Class 7 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
  keywords: "english literature, grammar, writing skills, study materials class 7",
  openGraph: {
    title: "Class 7 English Study Resources",
    description: "Complete Class 7 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 7 English Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 7 English Study Resources",
    description: "Complete Class 7 english study resources including all chapters. Complete English study materials including literature, grammar, writing skills, and comprehension. Free notes, explanations, and practice questions.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-7/english",
  },
};

export default function Class7EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
