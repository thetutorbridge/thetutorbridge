import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ask Doubt - Get Expert Answers",
  description: "Ask your academic doubts and get expert answers from qualified tutors. Submit questions on any subject and receive detailed explanations to improve your understanding.",
  keywords: "ask doubt, expert answers, academic questions, subject doubts, tutor help, detailed explanations, study support",
  openGraph: {
    title: "Ask Doubt - Get Expert Answers",
    description: "Ask your academic doubts and get expert answers from qualified tutors. Submit questions on any subject and receive detailed explanations to improve your understanding.",
    type: "website",
    siteName: "The Tutor Bridge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ask Doubt - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask Doubt - Get Expert Answers",
    description: "Ask your academic doubts and get expert answers from qualified tutors.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thetutorbridge.com/doubt-solving/ask-doubt",
  },
}

export default function AskDoubtLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
