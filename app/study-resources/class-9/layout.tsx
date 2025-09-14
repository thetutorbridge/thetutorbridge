import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class 9 Study Resources & Materials",
  description: "Comprehensive study resources for Class 9 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
  keywords: "class 9 study resources, grade 9 materials, class 9 science, class 9 math, 9th grade study guide, secondary education resources",
  openGraph: {
    title: "Class 9 Study Resources & Materials",
    description: "Comprehensive study resources for Class 9 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 9 Study Resources & Materials",
    description: "Comprehensive study resources for Class 9 students including science, mathematics, and other subjects.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-9",
  },
}

export default function Class9Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
