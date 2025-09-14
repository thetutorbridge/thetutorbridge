import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class 10 Study Resources & Materials",
  description: "Comprehensive study resources for Class 10 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
  keywords: "class 10 study resources, grade 10 materials, class 10 science, class 10 math, 10th grade study guide, secondary education resources",
  openGraph: {
    title: "Class 10 Study Resources & Materials",
    description: "Comprehensive study resources for Class 10 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 10 Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 10 Study Resources & Materials",
    description: "Comprehensive study resources for Class 10 students including science, mathematics, and other subjects.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources/class-10",
  },
}

export default function Class10Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
