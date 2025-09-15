import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 11 Physics Study Resources",
  description: "Complete Class 11 physics study resources including all chapters. Complete Physics study materials including all chapters covering mechanics, thermodynamics, optics, and modern physics. Free notes, explanations, and practice questions.",
  keywords: "physics notes, mechanics thermodynamics optics, study materials class 11",
  openGraph: {
    title: "Class 11 Physics Study Resources",
    description: "Complete Class 11 physics study resources including all chapters. Complete Physics study materials including all chapters covering mechanics, thermodynamics, optics, and modern physics. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 11 Physics Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 11 Physics Study Resources",
    description: "Complete Class 11 physics study resources including all chapters. Complete Physics study materials including all chapters covering mechanics, thermodynamics, optics, and modern physics. Free notes, explanations, and practice questions.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-11/physics",
  },
};

export default function Class11PhysicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
