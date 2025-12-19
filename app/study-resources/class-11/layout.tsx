import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class 11 Study Resources & Materials",
  description: "Comprehensive study resources for Class 11 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
  keywords: "class 11 study resources, grade 11 materials, class 11 science, class 11 math, 11th grade study guide, higher secondary education resources",
  openGraph: {
    title: "Class 11 Study Resources & Materials",
    description: "Comprehensive study resources for Class 11 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 11 Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 11 Study Resources & Materials",
    description: "Comprehensive study resources for Class 11 students including science, mathematics, and other subjects.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-11",
  },
}

export default function Class11Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
