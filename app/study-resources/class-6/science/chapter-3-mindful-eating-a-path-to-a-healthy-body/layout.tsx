import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chapter 3: Mindful Eating - A Path to a Healthy Body - Class 6",
  description: "Learn about mindful eating and healthy body practices with Class 6 Science Chapter 3. Understand nutrition, healthy eating habits, and maintaining good health.",
  keywords: "class 6 science chapter 3, mindful eating, healthy body, nutrition, healthy eating habits, health class 6",
  openGraph: {
    title: "Chapter 3: Mindful Eating - A Path to a Healthy Body - Class 6",
    description: "Learn about mindful eating and healthy body practices with Class 6 Science Chapter 3. Understand nutrition, healthy eating habits, and maintaining good health.",
    type: "article",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Class 6 Science Chapter 3 - Mindful Eating A Path to a Healthy Body",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter 3: Mindful Eating - A Path to a Healthy Body - Class 6",
    description: "Learn about mindful eating and healthy body practices with Class 6 Science Chapter 3.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/study-resources/class-6/science/chapter-3-mindful-eating-a-path-to-a-healthy-body",
  },
}

export default function Chapter3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
