import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 6: Materials Around Us - Class 6",
  description: "Explore materials around us with Class 6 Science Chapter 6. Learn about different types of materials, their properties, and everyday applications.",
  keywords: "class 6 science chapter 6, materials around us, material properties, types of materials, chemistry class 6",
  openGraph: {
    title: "Chapter 6: Materials Around Us - Class 6",
    description: "Explore materials around us with Class 6 Science Chapter 6. Learn about different types of materials, their properties, and everyday applications.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 6 Science Chapter 6 - Materials Around Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 6: Materials Around Us - Class 6",
    description: "Explore materials around us with Class 6 Science Chapter 6.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources/class-6/science/chapter-6-materials-around-us",
  },
}

export default function Chapter6Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
