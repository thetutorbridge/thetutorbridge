import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 8: Motion - Class 9",
  description: "Learn about motion with Class 9 Science Chapter 8. Understand distance, displacement, speed, velocity, and acceleration concepts.",
  keywords: "class 9 science chapter 8, motion, distance displacement, speed velocity, acceleration, physics class 9",
  openGraph: {
    title: "Chapter 8: Motion - Class 9",
    description: "Learn about motion with Class 9 Science Chapter 8. Understand distance, displacement, speed, velocity, and acceleration concepts.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Science Chapter 8 - Motion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 8: Motion - Class 9",
    description: "Learn about motion with Class 9 Science Chapter 8.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-9/science/Chapter-8-Motions",
  },
}

export default function Chapter8Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
