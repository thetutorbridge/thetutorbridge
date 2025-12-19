import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class 7 Study Resources & Materials",
  description: "Comprehensive study resources for Class 7 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
  keywords: "class 7 study resources, grade 7 materials, class 7 science, class 7 math, 7th grade study guide, secondary education resources",
  openGraph: {
    title: "Class 7 Study Resources & Materials",
    description: "Comprehensive study resources for Class 7 students including science, mathematics, and other subjects. Free notes, study guides, and educational materials for academic excellence.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 7 Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Class 7 Study Resources & Materials",
    description: "Comprehensive study resources for Class 7 students including science, mathematics, and other subjects.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-7",
  },
}

export default function Class7Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
