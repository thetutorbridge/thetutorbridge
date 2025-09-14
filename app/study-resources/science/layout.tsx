import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Science Study Resources & Materials",
  description: "Comprehensive science study resources for all classes. Free science notes, experiments, and study guides covering physics, chemistry, biology, and more.",
  keywords: "science study resources, physics chemistry biology, science notes, science experiments, science study guide",
  openGraph: {
    title: "Science Study Resources & Materials",
    description: "Comprehensive science study resources for all classes. Free science notes, experiments, and study guides covering physics, chemistry, biology, and more.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Science Study Resources - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Science Study Resources & Materials",
    description: "Comprehensive science study resources for all classes. Free science notes, experiments, and study guides.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources/science",
  },
}

export default function ScienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
