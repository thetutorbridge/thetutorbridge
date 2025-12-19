import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 8 Science Study Resources",
  description: "Complete Class 8 science study resources including all chapters. Complete Science study materials including all chapters covering physics, chemistry, and biology concepts. Free notes, explanations, and practice questions.",
  keywords: "science notes, physics chemistry biology, study materials class 8",
  openGraph: {
    title: "Class 8 Science Study Resources",
    description: "Complete Class 8 science study resources including all chapters. Complete Science study materials including all chapters covering physics, chemistry, and biology concepts. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 8 Science Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 8 Science Study Resources",
    description: "Complete Class 8 science study resources including all chapters. Complete Science study materials including all chapters covering physics, chemistry, and biology concepts. Free notes, explanations, and practice questions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-8/science",
  },
};

export default function Class8ScienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
