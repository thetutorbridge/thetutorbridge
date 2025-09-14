import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 7: Temperature and Its Measurement - Class 6",
  description: "Learn about temperature and its measurement with Class 6 Science Chapter 7. Understand thermometers, temperature scales, and heat concepts.",
  keywords: "class 6 science chapter 7, temperature measurement, thermometers, temperature scales, heat concepts, physics class 6",
  openGraph: {
    title: "Chapter 7: Temperature and Its Measurement - Class 6",
    description: "Learn about temperature and its measurement with Class 6 Science Chapter 7. Understand thermometers, temperature scales, and heat concepts.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 6 Science Chapter 7 - Temperature and Its Measurement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 7: Temperature and Its Measurement - Class 6",
    description: "Learn about temperature and its measurement with Class 6 Science Chapter 7.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-6/science/chapter-7-temperature-and-its-measurement",
  },
}

export default function Chapter7Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
