"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/TheTutorBridge Logo New.png" width={40} height={40} alt="The Tutor Bridge Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
              TheTutorBridge
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
            Home
          </Link>

          <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/book-demo-class" className="hidden md:flex">
            <Button className="bg-brand-blue text-white hover:shadow-md hover:shadow-brand-teal/30">
              Start Your Journey
            </Button>
          </Link>

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
              <Link href="/blog" className="block py-2 text-gray-700">
                Blog
              </Link>
              <Link href="/about" className="block py-2 text-gray-700">
                About
              </Link>
              <Link href="/contact" className="block py-2 text-gray-700">
                Contact
              </Link>
              <Link href="/book-demo-class" className="block py-2 text-gray-700">
                Start Your Journey
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
