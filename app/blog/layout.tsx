import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Educational Blog & Study Tips",
  description: "Discover expert study tips, educational insights, and academic guidance on The Tutor Bridge blog. Learn effective study techniques, exam strategies, and subject-specific tutorials.",
  keywords: "study tips, educational blog, exam preparation, academic guidance, learning strategies, student success",
  openGraph: {
    title: "Educational Blog & Study Tips",
    description: "Discover expert study tips, educational insights, and academic guidance on The Tutor Bridge blog. Learn effective study techniques, exam strategies, and subject-specific tutorials.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Tutor Bridge Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Educational Blog & Study Tips",
    description: "Discover expert study tips, educational insights, and academic guidance on The Tutor Bridge blog.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/blog",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
