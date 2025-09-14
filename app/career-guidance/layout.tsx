import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Career Guidance & Professional Development",
  description: "Get expert career guidance and professional development support. Discover career paths, skill development, and educational opportunities for your future success.",
  keywords: "career guidance, professional development, career counseling, skill development, educational opportunities, career planning",
  openGraph: {
    title: "Career Guidance & Professional Development",
    description: "Get expert career guidance and professional development support. Discover career paths, skill development, and educational opportunities for your future success.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Career Guidance - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Guidance & Professional Development",
    description: "Get expert career guidance and professional development support.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/career-guidance",
  },
}

export default function CareerGuidanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
