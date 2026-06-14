import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher Salary Statistics 2026: Pay by State, Country & Subject Area",
  description:
    "Complete teacher salary data for 2026: Average pay by state ($46K-$101K), international comparisons, salary trends, and teacher shortage statistics. NEA & OECD data.",
  keywords: [
    "teacher salary by state",
    "teacher pay 2026",
    "average teacher salary",
    "teacher salary comparison",
    "highest paying states for teachers",
    "teacher salary by country",
    "education salary statistics",
    "teacher shortage statistics",
    "NEA teacher salary report",
    "OECD teacher salaries",
  ],
  openGraph: {
    title: "Teacher Salary Statistics 2026: Complete Pay Comparison",
    description:
      "Compare teacher salaries across all 50 US states and 40+ countries. Latest data on pay, benefits, and the teacher shortage crisis.",
    url: "https://www.thetutorbridge.com/teacher-salary-statistics",
    type: "article",
    images: [
      {
        url: "https://www.thetutorbridge.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Teacher Salary Statistics 2026 - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teacher Salary Statistics 2026: Pay by State & Country",
    description:
      "Teacher salaries range from $46K to $101K by state. See full comparison data.",
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/teacher-salary-statistics",
  },
};

export default function TeacherSalaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
