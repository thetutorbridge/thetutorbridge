import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost of Education by Country 2026: Tuition Fees, Living Costs & ROI Comparison",
  description:
    "Compare education costs across 50+ countries: tuition fees, living expenses, and ROI. Data for USA, UK, Canada, Australia, Germany & more. Updated for 2026.",
  keywords: [
    "cost of education by country",
    "tuition fees comparison",
    "international student costs",
    "study abroad costs 2026",
    "university fees by country",
    "cheapest countries to study",
    "most expensive universities",
    "education ROI by country",
    "college costs worldwide",
    "student living costs",
  ],
  openGraph: {
    title: "Cost of Education by Country 2026: Complete Global Comparison",
    description:
      "Compare tuition fees, living costs, and education ROI across 50+ countries. Find the best value for your education investment.",
    url: "https://www.thetutorbridge.com/cost-of-education-by-country",
    type: "article",
    images: [
      {
        url: "https://www.thetutorbridge.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cost of Education by Country 2026 - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cost of Education by Country 2026: Global Comparison",
    description:
      "Tuition fees, living costs & ROI across 50+ countries. Find where to study for best value.",
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/cost-of-education-by-country",
  },
};

export default function CostOfEducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
