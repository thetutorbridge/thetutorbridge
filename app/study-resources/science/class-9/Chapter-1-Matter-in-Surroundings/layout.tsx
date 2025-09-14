import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 1: Matter in Our Surroundings - Class 9 Science",
  description: "Learn about matter in our surroundings with Class 9 Science Chapter 1. Understand states of matter, physical and chemical properties, and changes in matter.",
  keywords: "class 9 science chapter 1, matter in surroundings, states of matter, physical properties, chemical properties, chemistry class 9",
  openGraph: {
    title: "Chapter 1: Matter in Our Surroundings - Class 9 Science",
    description: "Learn about matter in our surroundings with Class 9 Science Chapter 1. Understand states of matter, physical and chemical properties, and changes in matter.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Science Chapter 1 - Matter in Our Surroundings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 1: Matter in Our Surroundings - Class 9 Science",
    description: "Learn about matter in our surroundings with Class 9 Science Chapter 1.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/science/class-9/Chapter-1-Matter-in-Surroundings",
  },
}

export default function Chapter1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
