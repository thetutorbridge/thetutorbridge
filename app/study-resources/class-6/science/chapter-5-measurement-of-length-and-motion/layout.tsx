import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 5: Measurement of Length and Motion - Class 6",
  description: "Learn about measurement of length and motion with Class 6 Science Chapter 5. Understand units of measurement, tools, and basic concepts of motion.",
  keywords: "class 6 science chapter 5, measurement length motion, units of measurement, measuring tools, motion physics class 6",
  openGraph: {
    title: "Chapter 5: Measurement of Length and Motion - Class 6",
    description: "Learn about measurement of length and motion with Class 6 Science Chapter 5. Understand units of measurement, tools, and basic concepts of motion.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 6 Science Chapter 5 - Measurement of Length and Motion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 5: Measurement of Length and Motion - Class 6",
    description: "Learn about measurement of length and motion with Class 6 Science Chapter 5.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-6/science/chapter-5-measurement-of-length-and-motion",
  },
}

export default function Chapter5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
