import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Educational Blog & Study Tips | The Tutor Bridge",
  description: "Expert study tips, career guidance & academic advice for students. STEM education, college prep & learning strategies.",
  keywords: "study tips, educational blog, exam preparation, academic guidance, learning strategies, student success",
  openGraph: {
    title: "Educational Blog & Study Tips | The Tutor Bridge",
    description: "Expert study tips, career guidance & academic advice for students. STEM education, college prep & learning strategies.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Tutor Bridge Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Educational Blog & Study Tips | The Tutor Bridge",
    description: "Expert study tips, career guidance & academic advice for students. College prep & learning strategies.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/blog",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
