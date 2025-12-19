import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 4: Exploring Magnets - Class 6",
  description: "Discover the fascinating world of magnets with Class 6 Science Chapter 4. Learn about magnetic properties, poles, and practical applications of magnets.",
  keywords: "class 6 science chapter 4, exploring magnets, magnetic properties, magnetic poles, magnets physics class 6",
  openGraph: {
    title: "Chapter 4: Exploring Magnets - Class 6",
    description: "Discover the fascinating world of magnets with Class 6 Science Chapter 4. Learn about magnetic properties, poles, and practical applications of magnets.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 6 Science Chapter 4 - Exploring Magnets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 4: Exploring Magnets - Class 6",
    description: "Discover the fascinating world of magnets with Class 6 Science Chapter 4.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-6/science/chapter-4-exploring-magnets",
  },
}

export default function Chapter4Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
