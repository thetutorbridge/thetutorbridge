import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 6: Tissues - Class 9",
  description: "Explore tissues with Class 9 Science Chapter 6. Learn about plant and animal tissues, their types, structure, and functions.",
  keywords: "class 9 science chapter 6, tissues, plant tissues, animal tissues, tissue structure, biology class 9",
  openGraph: {
    title: "Chapter 6: Tissues - Class 9",
    description: "Explore tissues with Class 9 Science Chapter 6. Learn about plant and animal tissues, their types, structure, and functions.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Science Chapter 6 - Tissues",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 6: Tissues - Class 9",
    description: "Explore tissues with Class 9 Science Chapter 6.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-9/science/Chapter-6-Tissues",
  },
}

export default function Chapter6Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
