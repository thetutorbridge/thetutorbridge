import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact The Tutor Bridge - Get In Touch",
  description: "Contact The Tutor Bridge for educational support, career guidance, and academic assistance. Reach out to our expert team for personalized learning solutions.",
  keywords: "contact the tutor bridge, educational support, career guidance, academic assistance, personalized learning, expert tutoring",
  openGraph: {
    title: "Contact The Tutor Bridge - Get In Touch",
    description: "Contact The Tutor Bridge for educational support, career guidance, and academic assistance. Reach out to our expert team for personalized learning solutions.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact The Tutor Bridge - Get In Touch",
    description: "Contact The Tutor Bridge for educational support, career guidance, and academic assistance.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
