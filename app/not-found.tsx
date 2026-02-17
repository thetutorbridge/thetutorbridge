import Link from "next/link"
import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Home, Search, BookOpen, Calculator, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found - The Tutor Bridge",
  description: "The page you're looking for doesn't exist. Find homework help, tutoring services, calculators, and study resources at The Tutor Bridge.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  const popularLinks = [
    { href: "/homework-help", label: "Homework Help", icon: HelpCircle, description: "Get expert help with your assignments" },
    { href: "/tutoring", label: "Online Tutoring", icon: BookOpen, description: "1-on-1 sessions with certified tutors" },
    { href: "/calculators", label: "Free Calculators", icon: Calculator, description: "Math, science & conversion tools" },
    { href: "/roadmap", label: "Learning Roadmaps", icon: Search, description: "Study guides for any subject" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1A3D7C]/5 via-white to-[#2BAE66]/5">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-8xl font-bold text-[#1A3D7C]/20">404</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-[#1A3D7C] mb-4">
            Page Not Found
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or never existed.
          </p>

          <Link href="/">
            <Button className="bg-[#2BAE66] hover:bg-[#2BAE66]/90 text-white px-8 py-6 text-lg">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-xl font-poppins font-semibold text-[#1A3D7C] mb-6">
              Popular Resources
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {popularLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#2BAE66] hover:shadow-md transition-all text-left"
                >
                  <div className="w-10 h-10 bg-[#1A3D7C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <link.icon className="w-5 h-5 text-[#1A3D7C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{link.label}</h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>
              Need help finding something?{" "}
              <Link href="/contact" className="text-[#1A3D7C] hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
