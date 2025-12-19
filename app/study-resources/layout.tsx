import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Study Resources & Educational Materials",
  description: "Access comprehensive study resources for classes 6-12 including science, mathematics, and other subjects. Free educational materials, notes, and study guides for academic success.",
  keywords: "study resources, educational materials, class 6 to 12, science notes, math resources, study guides, academic materials, free education",
  openGraph: {
    title: "Study Resources & Educational Materials",
    description: "Access comprehensive study resources for classes 6-12 including science, mathematics, and other subjects. Free educational materials, notes, and study guides for academic success.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Resources & Educational Materials",
    description: "Access comprehensive study resources for classes 6-12 including science, mathematics, and other subjects.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources",
  },
}

export default function StudyResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
