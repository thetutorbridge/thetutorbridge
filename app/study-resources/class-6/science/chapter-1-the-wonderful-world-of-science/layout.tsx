import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 1: The Wonderful World of Science - Class 6",
  description: "Learn about the wonderful world of science with comprehensive study materials for Class 6 Chapter 1. Understand scientific concepts, observations, and the scientific method.",
  keywords: "class 6 science chapter 1, wonderful world of science, scientific method, science observations, grade 6 science",
  openGraph: {
    title: "Chapter 1: The Wonderful World of Science - Class 6",
    description: "Learn about the wonderful world of science with comprehensive study materials for Class 6 Chapter 1. Understand scientific concepts, observations, and the scientific method.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 6 Science Chapter 1 - The Wonderful World of Science",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 1: The Wonderful World of Science - Class 6",
    description: "Learn about the wonderful world of science with comprehensive study materials for Class 6 Chapter 1.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-6/science/chapter-1-the-wonderful-world-of-science",
  },
}

export default function Chapter1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
