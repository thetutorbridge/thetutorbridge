import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class 6 Study Resources & Materials",
  description: "Comprehensive study resources for Class 6 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
  keywords: "class 6 study resources, grade 6 materials, class 6 science, class 6 math, 6th grade study guide, primary education resources",
  openGraph: {
    title: "Class 6 Study Resources & Materials",
    description: "Comprehensive study resources for Class 6 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 6 Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 6 Study Resources & Materials",
    description: "Comprehensive study resources for Class 6 students including science, mathematics, and other subjects.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-6",
  },
}

export default function Class6Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
