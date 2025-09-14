import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mathematics Study Resources & Materials",
  description: "Comprehensive mathematics study resources for all classes. Free math notes, practice problems, and study guides covering algebra, geometry, calculus, and more.",
  keywords: "mathematics study resources, math notes, algebra geometry, calculus, math practice problems, math study guide",
  openGraph: {
    title: "Mathematics Study Resources & Materials",
    description: "Comprehensive mathematics study resources for all classes. Free math notes, practice problems, and study guides covering algebra, geometry, calculus, and more.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mathematics Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathematics Study Resources & Materials",
    description: "Comprehensive mathematics study resources for all classes. Free math notes, practice problems, and study guides.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources/math",
  },
}

export default function MathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
