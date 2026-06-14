import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Mental Health Statistics 2026: Anxiety, Depression & Stress Data",
  description:
    "Comprehensive student mental health data for 2026: anxiety rates, depression statistics, academic stress, burnout, and treatment gaps. High school & college data with sources.",
  keywords: [
    "student mental health statistics",
    "college student anxiety statistics",
    "teen depression statistics 2026",
    "academic stress statistics",
    "student burnout statistics",
    "mental health crisis students",
    "youth mental health data",
    "high school mental health",
    "university student wellbeing",
    "student suicide statistics",
  ],
  openGraph: {
    title: "Student Mental Health Statistics 2026: The Complete Data",
    description:
      "Comprehensive mental health statistics for students: anxiety, depression, stress, and burnout rates with treatment gap analysis.",
    url: "https://www.thetutorbridge.com/student-mental-health-statistics",
    type: "article",
    images: [
      {
        url: "https://www.thetutorbridge.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Student Mental Health Statistics 2026 - The Tutor Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Mental Health Statistics 2026",
    description:
      "The latest data on student anxiety, depression, stress, and mental health support gaps.",
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com/student-mental-health-statistics",
  },
};

export default function StudentMentalHealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
