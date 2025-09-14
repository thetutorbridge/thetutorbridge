import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class 12 Study Resources & Materials",
  description: "Comprehensive study resources for Class 12 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
  keywords: "class 12 study resources, grade 12 materials, class 12 science, class 12 math, 12th grade study guide, higher secondary education resources",
  openGraph: {
    title: "Class 12 Study Resources & Materials",
    description: "Comprehensive study resources for Class 12 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 12 Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 12 Study Resources & Materials",
    description: "Comprehensive study resources for Class 12 students including science, mathematics, and other subjects.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources/class-12",
  },
}

export default function Class12Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
