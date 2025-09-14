import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class 6 Science Study Resources",
  description: "Complete Class 6 Science study materials including all chapters covering physics, chemistry, and biology concepts. Free notes, explanations, and practice questions.",
  keywords: "class 6 science, grade 6 science, 6th grade science notes, science study materials, physics chemistry biology class 6",
  openGraph: {
    title: "Class 6 Science Study Resources",
    description: "Complete Class 6 Science study materials including all chapters covering physics, chemistry, and biology concepts. Free notes, explanations, and practice questions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 6 Science - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 6 Science Study Resources",
    description: "Complete Class 6 Science study materials including all chapters covering physics, chemistry, and biology concepts.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-6/science",
  },
}

export default function Class6ScienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
