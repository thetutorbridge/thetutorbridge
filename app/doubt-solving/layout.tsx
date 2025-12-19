import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Doubt Solving & Academic Support",
  description: "Get instant doubt solving and academic support for all subjects. Ask questions, get expert answers, and improve your understanding with personalized help.",
  keywords: "doubt solving, academic support, ask questions, expert answers, personalized help, subject doubts, study assistance",
  openGraph: {
    title: "Doubt Solving & Academic Support",
    description: "Get instant doubt solving and academic support for all subjects. Ask questions, get expert answers, and improve your understanding with personalized help.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Doubt Solving - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doubt Solving & Academic Support",
    description: "Get instant doubt solving and academic support for all subjects.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/doubt-solving",
  },
}

export default function DoubtSolvingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
