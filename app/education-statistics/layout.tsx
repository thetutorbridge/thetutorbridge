import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Statistics 2026: 100+ Facts on Learning, Screen Time & Study Habits",
  description:
    "Comprehensive education statistics for 2026: Global study habits, online vs classroom learning data, screen time impact, AI in education, tutoring market trends, and more. Updated with latest research.",
  keywords: [
    "education statistics 2026",
    "student study habits statistics",
    "online learning statistics",
    "screen time academic performance",
    "e-learning market size",
    "AI in education statistics",
    "global literacy rates",
    "homework statistics by country",
    "tutoring industry statistics",
    "student learning data",
    "education trends 2026",
    "classroom vs online learning",
  ],
  openGraph: {
    title: "Education Statistics 2026: 100+ Facts on Learning, Screen Time & Study Habits",
    description:
      "Comprehensive education statistics for 2026 covering global study habits, online learning effectiveness, screen time impact on grades, AI adoption in schools, and more.",
    url: "https://www.thetutorbridge.com/education-statistics",
    type: "article",
    images: [
      {
        url: "https://www.thetutorbridge.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Education Statistics 2026 - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Statistics 2026: 100+ Facts & Data",
    description:
      "Latest education statistics: study habits, online learning trends, screen time impact, AI in education, and more.",
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/education-statistics",
  },
};

export default function EducationStatisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
