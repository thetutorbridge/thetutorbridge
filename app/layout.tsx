import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "The Tutor Bridge - #1 Online Tutoring Platform for Grades 6-12 | Math, Science, English",
    template: "%s | The Tutor Bridge",
  },
  description:
    "India's leading online tutoring platform offering personalized 1-on-1 sessions, instant doubt solving, career guidance & study resources for grades 6-12. 95% success rate. Book free trial today!",
  keywords: [
    "online tutoring",
    "one on one tutoring",
    "doubt solving",
    "career guidance",
    "study materials",
    "math tutor",
    "science tutor",
    "english tutor",
    "grades 6-12",
    "JEE preparation",
    "NEET preparation",
    "board exam preparation",
    "homework help",
    "instant doubt clearing",
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
    locale: "en_IN",
    url: "https://thetutorbridge.com",
    siteName: "The Tutor Bridge",
    title: "The Tutor Bridge - #1 Online Tutoring Platform for Grades 6-12",
    description:
      "India's leading online tutoring platform with 95% success rate. Get personalized tutoring, instant doubt solving & career guidance. Book free trial!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Tutor Bridge - Online Tutoring Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tutor Bridge - #1 Online Tutoring Platform",
    description:
      "India's leading online tutoring platform with 95% success rate. Get personalized tutoring, instant doubt solving & career guidance.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "KpkvQp8VxFV7-obKHHmwexGdICgx5vhXw8nLHEKPvog",
  },
  alternates: {
    canonical: "https://thetutorbridge.com",
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF6B35" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "The Tutor Bridge",
              description: "India's leading online tutoring platform offering personalized education for grades 6-12",
              url: "https://thetutorbridge.com",
              logo: "https://thetutorbridge.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-98765-43210",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.linkedin.com/company/thetutorbridge",
              ],
            }),
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2600923553967122"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
