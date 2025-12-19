import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Demo Class - Free Trial Session",
  description: "Book a free demo class and experience our teaching methodology. Get a personalized trial session to understand how we can help you achieve academic excellence.",
  keywords: "book demo class, free trial session, teaching methodology, personalized trial, academic excellence, demo lesson",
  openGraph: {
    title: "Book Demo Class - Free Trial Session",
    description: "Book a free demo class and experience our teaching methodology. Get a personalized trial session to understand how we can help you achieve academic excellence.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Book Demo Class - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Demo Class - Free Trial Session",
    description: "Book a free demo class and experience our teaching methodology.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/book-demo-class",
  },
}

export default function BookDemoClassLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
