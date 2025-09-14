import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class 8 Study Resources & Materials",
  description: "Comprehensive study resources for Class 8 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
  keywords: "class 8 study resources, grade 8 materials, class 8 science, class 8 math, 8th grade study guide, secondary education resources",
  openGraph: {
    title: "Class 8 Study Resources & Materials",
    description: "Comprehensive study resources for Class 8 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 8 Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 8 Study Resources & Materials",
    description: "Comprehensive study resources for Class 8 students including science, mathematics, and other subjects.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources/class-8",
  },
}

export default function Class8Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
