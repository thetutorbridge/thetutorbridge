import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 5: The Fundamental Unit of Life - Class 9",
  description: "Learn about cells as the fundamental unit of life with Class 9 Science Chapter 5. Understand cell structure, organelles, and cellular processes.",
  keywords: "class 9 science chapter 5, fundamental unit of life, cell structure, organelles, cellular processes, biology class 9",
  openGraph: {
    title: "Chapter 5: The Fundamental Unit of Life - Class 9",
    description: "Learn about cells as the fundamental unit of life with Class 9 Science Chapter 5. Understand cell structure, organelles, and cellular processes.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Science Chapter 5 - The Fundamental Unit of Life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 5: The Fundamental Unit of Life - Class 9",
    description: "Learn about cells as the fundamental unit of life with Class 9 Science Chapter 5.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-9/science/Chapter-5-The-Fundamental-Unit-of-Life",
  },
}

export default function Chapter5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
