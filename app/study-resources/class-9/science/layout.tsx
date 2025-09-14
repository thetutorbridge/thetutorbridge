import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class 9 Science Study Resources",
  description: "Complete Class 9 Science study materials including all chapters covering physics, chemistry, and biology concepts. Free notes, explanations, and practice questions.",
  keywords: "class 9 science, grade 9 science, 9th grade science notes, science study materials, physics chemistry biology class 9",
  openGraph: {
    title: "Class 9 Science Study Resources",
    description: "Complete Class 9 Science study materials including all chapters covering physics, chemistry, and biology concepts. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Science - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 9 Science Study Resources",
    description: "Complete Class 9 Science study materials including all chapters covering physics, chemistry, and biology concepts.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-9/science",
  },
}

export default function Class9ScienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
