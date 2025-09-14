import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 2: Is Matter Around Us Pure - Class 9",
  description: "Explore purity of matter with Class 9 Science Chapter 2. Learn about mixtures, compounds, elements, and methods of separation.",
  keywords: "class 9 science chapter 2, is matter pure, mixtures compounds, elements, separation methods, chemistry class 9",
  openGraph: {
    title: "Chapter 2: Is Matter Around Us Pure - Class 9",
    description: "Explore purity of matter with Class 9 Science Chapter 2. Learn about mixtures, compounds, elements, and methods of separation.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Science Chapter 2 - Is Matter Around Us Pure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 2: Is Matter Around Us Pure - Class 9",
    description: "Explore purity of matter with Class 9 Science Chapter 2.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources/class-9/science/Chapter-2-Is-Matter-Around-Us-Pure",
  },
}

export default function Chapter2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
