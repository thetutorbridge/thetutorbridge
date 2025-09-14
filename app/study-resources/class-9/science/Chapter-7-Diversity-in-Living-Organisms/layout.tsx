import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 7: Diversity in Living Organisms - Class 9",
  description: "Learn about diversity in living organisms with Class 9 Science Chapter 7. Understand classification systems, kingdoms, and biodiversity.",
  keywords: "class 9 science chapter 7, diversity living organisms, classification systems, kingdoms, biodiversity, biology class 9",
  openGraph: {
    title: "Chapter 7: Diversity in Living Organisms - Class 9",
    description: "Learn about diversity in living organisms with Class 9 Science Chapter 7. Understand classification systems, kingdoms, and biodiversity.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Science Chapter 7 - Diversity in Living Organisms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 7: Diversity in Living Organisms - Class 9",
    description: "Learn about diversity in living organisms with Class 9 Science Chapter 7.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-9/science/Chapter-7-Diversity-in-Living-Organisms",
  },
}

export default function Chapter7Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
