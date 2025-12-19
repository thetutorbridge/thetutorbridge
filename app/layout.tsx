import type React from "react"
import type { Metadata } from "next"
import { Poppins, Merriweather } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-heading" })
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-body" })

export const metadata: Metadata = {
  title: {
    default: "Online Homework Help & Tutoring for Grades 6-12 | Math, Science, English | The Tutor Bridge",
  },
  description:
    "Expert homework help and 1-on-1 online tutoring for middle & high school students. Math, Science, English. U.S.-certified tutors. Free consultation. Get help today!",
  keywords: [
    "homework help",
    "online tutoring",
    "math tutor",
    "science tutor",
    "english tutor",
    "homework help online",
    "tutoring for high school",
    "middle school tutoring",
    "algebra help",
    "chemistry tutor",
    "essay help",
    "one on one tutoring",
    "grades 6-12",
  ],
  authors: [{ name: "The Tutor Bridge" }],
  creator: "The Tutor Bridge",
  publisher: "The Tutor Bridge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.thetutorbridge.com",
    siteName: "The Tutor Bridge",
    title: "Online Homework Help & Tutoring for Grades 6-12",
    description:
      "Expert homework help and 1-on-1 online tutoring. Math, Science, English. U.S.-certified tutors.",
    images: [
      {
        url: "https://www.thetutorbridge.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Tutor Bridge - Online Homework Help & Tutoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Homework Help & Tutoring | The Tutor Bridge",
    description:
      "Expert homework help and 1-on-1 online tutoring for grades 6-12. Math, Science, English. U.S.-certified tutors.",
    images: ["https://www.thetutorbridge.com/og-image.png"],
  },
  verification: {
    google: "KpkvQp8VxFV7-obKHHmwexGdICgx5vhXw8nLHEKPvog",
  },
  alternates: {
    canonical: "https://www.thetutorbridge.com",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://zkphbzcomixukygigpka.supabase.co" />
        <link rel="dns-prefetch" href="https://zkphbzcomixukygigpka.supabase.co" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        {/* Note: viewport meta is handled by Next.js automatically */}
        <meta name="theme-color" content="#1A3D7C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "The Tutor Bridge",
              description: "Expert homework help and online tutoring for grades 6-12 in Math, Science, and English",
              url: "https://www.thetutorbridge.com",
              logo: "https://www.thetutorbridge.com/TheTutorBridge Logo New.png",
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@thetutorbridge.com",
                contactType: "customer service",
                availableLanguage: ["English"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              areaServed: "US",
              serviceType: ["Homework Help", "Online Tutoring", "Academic Support"],
              sameAs: [
                "https://www.linkedin.com/company/thetutorbridge",
              ],
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} ${merriweather.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2600923553967122"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
