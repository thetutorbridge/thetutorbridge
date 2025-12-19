import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About The Tutor Bridge - Educational Excellence",
  description: "Learn about The Tutor Bridge's mission to provide quality education and academic support. Discover our teaching philosophy, expert team, and commitment to student success.",
  keywords: "about the tutor bridge, educational mission, teaching philosophy, academic support, student success, quality education",
  openGraph: {
    title: "About The Tutor Bridge - Educational Excellence",
    description: "Learn about The Tutor Bridge's mission to provide quality education and academic support. Discover our teaching philosophy, expert team, and commitment to student success.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About The Tutor Bridge - Educational Excellence",
    description: "Learn about The Tutor Bridge's mission to provide quality education and academic support.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/about",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
