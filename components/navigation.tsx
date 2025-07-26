"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const services = [
    // {
    //   name: "One-on-One Tutoring",
    //   href: "/tutoring",
    //   description: "Personalized sessions with expert tutors",
    // },
    {
      name: "Instant Doubt Solving",
      href: "/doubt-solving",
      description: "Get answers within 30-60 minutes",
    },
    {
      name: "Career Guidance",
      href: "/career-guidance",
      description: "Expert mentorship for your future",
    },
    // {
    //   name: "Motivational Sessions",
    //   href: "/motivational-sessions",
    //   description: "Inspiring webinars and success stories",
    // },
    {
      name: "Study Resources",
      href: "/study-resources",
      description: "Premium notes and practice materials",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" width={40} height={40} alt="The Tutor Bridge Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
              TheTutorBridge
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors">
            Home
          </Link>

<div className="relative">
  <button
    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors"
    onClick={() =>
      setActiveDropdown(activeDropdown === "services" ? null : "services")
    }
    type="button"
  >
    Services
    <ChevronDown className="h-4 w-4" />
  </button>

  {activeDropdown === "services" && (
    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
      <div className="grid gap-3">
        {services.map((service) => (
          <Link
            key={service.name}
            href={service.href}
            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setActiveDropdown(null)}
          >
            <div className="font-medium text-gray-900">{service.name}</div>
            <div className="text-sm text-gray-600">{service.description}</div>
          </Link>
        ))}
      </div>
    </div>
  )}
</div>

          {/* <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors">
            Pricing
          </Link>  */}
          <a
            href="https://blog.thetutorbridge.com"
            target="_blank"
  rel="noopener noreferrer"
            className="text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors"
          >
            Blog
          </a>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex text-gray-700">
            Sign In
          </Button>
          {/* <Button className="bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-orange-dark hover:to-brand-red-dark">
            Book Free Trial
          </Button> */}

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b shadow-lg md:hidden">
            <div className="container py-4 space-y-4">
              <Link href="/" className="block py-2 text-gray-700">
                Home
              </Link>
              <div className="space-y-2">
                <div className="font-medium text-gray-900">Services</div>
                {services.map((service) => (
                  <Link key={service.name} href={service.href} className="block py-2 pl-4 text-gray-600">
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link href="/pricing" className="block py-2 text-gray-700">
                Pricing
              </Link>
              <Link href="https://thetutorbridge.com/blog" className="block py-2 text-gray-700">
                Blog
              </Link>
              <Link href="/about" className="block py-2 text-gray-700">
                About
              </Link>
              <Link href="/contact" className="block py-2 text-gray-700">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
