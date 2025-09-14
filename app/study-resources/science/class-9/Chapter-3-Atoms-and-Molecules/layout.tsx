import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 3: Atoms and Molecules - Class 9 Science",
  description: "Learn about atoms and molecules with Class 9 Science Chapter 3. Understand atomic structure, molecular formulas, and chemical bonding concepts.",
  keywords: "class 9 science chapter 3, atoms and molecules, atomic structure, molecular formulas, chemical bonding, chemistry class 9",
  openGraph: {
    title: "Chapter 3: Atoms and Molecules - Class 9 Science",
    description: "Learn about atoms and molecules with Class 9 Science Chapter 3. Understand atomic structure, molecular formulas, and chemical bonding concepts.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Science Chapter 3 - Atoms and Molecules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 3: Atoms and Molecules - Class 9 Science",
    description: "Learn about atoms and molecules with Class 9 Science Chapter 3.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/study-resources/science/class-9/Chapter-3-Atoms-and-Molecules",
  },
}

export default function Chapter3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
