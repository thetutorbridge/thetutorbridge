import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 4: Structure of the Atom - Class 9",
  description: "Explore the structure of the atom with Class 9 Science Chapter 4. Learn about protons, neutrons, electrons, and atomic models.",
  keywords: "class 9 science chapter 4, structure of atom, protons neutrons electrons, atomic models, chemistry class 9",
  openGraph: {
    title: "Chapter 4: Structure of the Atom - Class 9",
    description: "Explore the structure of the atom with Class 9 Science Chapter 4. Learn about protons, neutrons, electrons, and atomic models.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Class 9 Science Chapter 4 - Structure of the Atom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 4: Structure of the Atom - Class 9",
    description: "Explore the structure of the atom with Class 9 Science Chapter 4.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-9/science/Chapter-4-Structure-of-the-Atom",
  },
}

export default function Chapter4Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
