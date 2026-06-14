import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Acceptance Rates 2026: Top 100 Universities Data & Statistics",
  description:
    "Comprehensive college acceptance rates database for 2026: Ivy League, top 100 universities, SAT scores, tuition costs, and admission statistics. Updated data with historical trends.",
  keywords: [
    "college acceptance rates 2026",
    "university acceptance rates",
    "Ivy League acceptance rates",
    "Harvard acceptance rate",
    "MIT acceptance rate",
    "Stanford acceptance rate",
    "college admission statistics",
    "SAT scores by college",
    "college tuition costs",
    "early decision acceptance rates",
  ],
  openGraph: {
    title: "College Acceptance Rates 2026: Complete University Database",
    description:
      "Compare acceptance rates, SAT scores, and costs for 100+ top universities. Ivy League to public flagships - all the data you need.",
    url: "https://www.thetutorbridge.com/college-acceptance-rates",
    type: "article",
    images: [
      {
        url: "https://www.thetutorbridge.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "College Acceptance Rates 2026 - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Acceptance Rates 2026: Top 100 Universities",
    description:
      "Ivy League acceptance rates under 5%. Compare 100+ universities with SAT scores, costs, and admission trends.",
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/college-acceptance-rates",
  },
};

export default function CollegeAcceptanceRatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
