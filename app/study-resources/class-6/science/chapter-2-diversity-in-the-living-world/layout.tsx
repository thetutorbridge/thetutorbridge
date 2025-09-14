import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 2: Diversity in the Living World - Class 6",
  description: "Explore diversity in the living world with Class 6 Science Chapter 2 study materials. Learn about different living organisms, their characteristics, and classification.",
  keywords: "class 6 science chapter 2, diversity living world, living organisms, classification, biology class 6",
  openGraph: {
    title: "Chapter 2: Diversity in the Living World - Class 6",
    description: "Explore diversity in the living world with Class 6 Science Chapter 2 study materials. Learn about different living organisms, their characteristics, and classification.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 6 Science Chapter 2 - Diversity in the Living World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 2: Diversity in the Living World - Class 6",
    description: "Explore diversity in the living world with Class 6 Science Chapter 2 study materials.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources/class-6/science/chapter-2-diversity-in-the-living-world",
  },
}

export default function Chapter2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
