import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Motivational Sessions for Student Success",
  description: "Join our motivational sessions designed to boost student confidence, improve study habits, and achieve academic excellence. Expert guidance for better learning outcomes.",
  keywords: "motivational sessions, student motivation, academic success, study motivation, student confidence, learning mindset, educational coaching",
  openGraph: {
    title: "Motivational Sessions for Student Success",
    description: "Join our motivational sessions designed to boost student confidence, improve study habits, and achieve academic excellence. Expert guidance for better learning outcomes.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Motivational Sessions - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motivational Sessions for Student Success",
    description: "Join our motivational sessions designed to boost student confidence, improve study habits, and achieve academic excellence.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/motivational-sessions",
  },
}

export default function MotivationalSessionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
